import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import './Projects.css';

// Fallback high-fidelity local projects if GitHub API is offline or rate-limited
const STATIC_FALLBACK_PROJECTS = [
  {
    id: 1,
    title: 'Learnlogicify Landing Page',
    category: 'React & Frontend Architecture',
    description: 'A performant, modern landing page with complex layouts, custom dashboards, and micro-interactions.',
    mockupType: 'dashboard',
    htmlUrl: 'https://github.com/omkarsunilshivarkar',
    topics: ['Vite', 'Vanilla CSS', 'UX'],
    homepageUrl: 'https://github.com/omkarsunilshivarkar',
  },
  {
    id: 2,
    title: 'Winzee Web Chat application',
    category: 'Fullstack React & Socket.io',
    description: 'Real-time messaging application featuring custom state syncing, room channels, and a sleek modern chat UI.',
    mockupType: 'chat',
    htmlUrl: 'https://github.com/omkarsunilshivarkar',
    topics: ['Websockets', 'Node.js', 'State Sync'],
    homepageUrl: 'https://github.com/omkarsunilshivarkar',
  },
  {
    id: 3,
    title: 'ChatGPT Clone',
    category: 'React & AI Integration',
    description: 'Minimalist AI interface with markdown parsing, token streaming, and local chat history database caching.',
    mockupType: 'ai-chat',
    htmlUrl: 'https://github.com/omkarsunilshivarkar',
    topics: ['OpenAI', 'Markdown', 'Local Cache'],
    homepageUrl: 'https://github.com/omkarsunilshivarkar',
  },
  {
    id: 4,
    title: 'Gemini Clone',
    category: 'React & Google AI API',
    description: 'AI chat sandbox showcasing Google Gemini APIs with voice-to-text, vision prompt upload, and clean responsive columns.',
    mockupType: 'gemini',
    htmlUrl: 'https://github.com/omkarsunilshivarkar',
    topics: ['Google AI', 'Voice-to-Text', 'Vision'],
    homepageUrl: 'https://github.com/omkarsunilshivarkar',
  },
];

const CACHE_KEY = 'github_projects_cache';
const CACHE_TIME_KEY = 'github_projects_cache_timestamp';
const ONE_HOUR = 60 * 60 * 1000; // 1 hour cache duration

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGitHubProjects = async () => {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
        const now = Date.now();

        // 1. Check if we have valid, fresh cache
        if (cachedData && cachedTime && (now - parseInt(cachedTime, 10)) < ONE_HOUR) {
          const parsedCache = JSON.parse(cachedData);
          console.log('GitHub API: Successfully loaded projects from LocalStorage Cache:', parsedCache);
          console.log('GitHub API Cache Details: Items check homepage urls:', parsedCache.map(p => ({ title: p.title, homepage: p.homepageUrl })));
          setProjects(parsedCache);
          setLoading(false);
          return;
        }

        console.log('GitHub API: Cache missing or expired. Requesting fresh repository data from GitHub...');
        
        // 2. Fetch fresh data from GitHub REST API (requesting larger pool to capture all projects)
        const response = await fetch('https://api.github.com/users/omkarsunilshivarkar/repos?sort=updated&per_page=100');
        if (!response.ok) {
          throw new Error(`GitHub API returned status: ${response.status}`);
        }
        
        const rawRepos = await response.json();
        console.log('GitHub API: Received raw repositories payload:', rawRepos);
        console.log('GitHub API Debug: Star counts of all public repositories:', rawRepos.map(r => ({ name: r.name, stars: r.stargazers_count })));
        if (rawRepos && rawRepos.length > 0) {
          console.log('GitHub API Debug: Full payload structure of first repository:', rawRepos[0]);
        }

        // Filter to keep only repositories with stargazers_count > 0
        const starredRepos = rawRepos.filter(repo => repo.stargazers_count > 0);
        console.log('GitHub API: Filtered starred repositories count:', starredRepos.length);

        // Fallback to all repositories if none are starred yet, then slice to show top 6 items max
        const reposToMap = (starredRepos.length > 0 ? starredRepos : rawRepos).slice(0, 6);
        console.log('GitHub API: Repositories selected to map:', reposToMap.map(r => ({ name: r.name, stars: r.stargazers_count })));

        // Map GitHub structure into our clean visual template fields
        const mappedRepos = reposToMap.map(repo => {
          // Format name nicely (hyphens to space, capitalized title words)
          const cleanTitle = repo.name
            .replace(/-/g, ' ')
            .replace(/_/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

          // Guess mockup design template based on repository keyword markers
          let mockupType = 'dashboard';
          const lowerName = repo.name.toLowerCase();
          const lowerDesc = (repo.description || '').toLowerCase();
          
          if (lowerName.includes('chat') || lowerDesc.includes('chat') || lowerName.includes('message')) {
            mockupType = 'chat';
          } else if (lowerName.includes('ai') || lowerName.includes('gpt') || lowerDesc.includes('openai')) {
            mockupType = 'ai-chat';
          } else if (lowerName.includes('gemini') || lowerDesc.includes('gemini') || lowerDesc.includes('google')) {
            mockupType = 'gemini';
          }

          // Construct official GitHub Open Graph preview card URL
          const previewUrl = `https://opengraph.githubassets.com/1/omkarsunilshivarkar/${repo.name}`;

          return {
            id: repo.id,
            title: cleanTitle,
            category: repo.language || 'Web',
            description: repo.description || 'A software repository hosted on GitHub.',
            mockupType: mockupType,
            htmlUrl: repo.html_url,
            previewUrl: previewUrl,
            topics: repo.topics ? repo.topics.slice(0, 3) : [],
            homepageUrl: repo.homepage || null
          };
        });

        console.log('GitHub API: Dynamic mapped projects array with previews:', mappedRepos);
        console.log('GitHub API Map: Freshly mapped items homepage check:', mappedRepos.map(p => ({ title: p.title, homepage: p.homepageUrl })));
        
        // Save to state and update cache
        setProjects(mappedRepos);
        localStorage.setItem(CACHE_KEY, JSON.stringify(mappedRepos));
        localStorage.setItem(CACHE_TIME_KEY, now.toString());
      } catch (err) {
        console.warn('GitHub API Error: Fetch failed. Loading static backup portfolio projects:', err.message);
        setError(true);
        
        // For static backups, map default fallback preview URLs as well
        const staticWithPreviews = STATIC_FALLBACK_PROJECTS.map(proj => ({
          ...proj,
          previewUrl: `https://opengraph.githubassets.com/1/omkarsunilshivarkar/${proj.title.toLowerCase().replace(/\s+/g, '-')}`
        }));
        setProjects(staticWithPreviews);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubProjects();
  }, []);

  console.log('Projects Component Render: Current project collection:', projects);

  return (
    <section id="projects" className="projects-container">
      <div className="projects-content">
        <div className="header-row">
          <h2 className="projects-heading">
            <span className="projects-pulse"></span>
            Impressive Works
          </h2>
          <p className="projects-subtext">
            HERE'S A SELECTION OF PROJECTS THAT SHOWCASE MY PASSION FOR DESIGN AND DEVELOPMENT, REFLECTING CREATIVITY AND INNOVATION.
          </p>
        </div>

        {loading ? (
          /* Premium Pulsing Grid Skeleton Loading State */
          <div className="projects-grid">
            {[1, 2, 3, 4].map((skeletonIdx) => (
              <div key={`skeleton-${skeletonIdx}`} className="project-card-skeleton">
                <div className="mockup-wrapper-skeleton skeleton-pulse"></div>
                <div className="card-details-skeleton">
                  <div className="title-circle-skeleton skeleton-pulse"></div>
                  <div className="title-text-skeleton skeleton-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Dynamic Render Grid */
          <div className="projects-grid">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="project-card"
              >
                {/* Mockup Container */}
                <div className="mockup-wrapper">
                  <div className="window-header">
                    <div className="window-dot"></div>
                    <div className="window-dot"></div>
                    <div className="window-dot"></div>
                  </div>
                  <div className="mockup-content-wrapper">
                    {/* Live GitHub Open Graph preview card image */}
                    <img 
                      src={project.previewUrl} 
                      alt={project.title} 
                      className="project-preview-img"
                      onError={(e) => {
                        // Safe fallback: Hide the failed image, and reveal the CSS dashboard/chat mockup
                        e.target.style.display = 'none';
                        const fallbackEl = e.target.nextSibling;
                        if (fallbackEl) fallbackEl.style.display = 'flex';
                      }}
                    />
                    
                    {/* CSS Mockup fallback container (initially hidden, shown only if img fails) */}
                    <div className="css-mockup-fallback">
                      {renderMockupContent(project.mockupType)}
                    </div>
                  </div>
                  {/* Overlay on hover */}
                  <div className="card-overlay" onClick={(e) => e.stopPropagation()}>
                    <button 
                      className="overlay-btn repo-btn"
                      onClick={() => window.open(project.htmlUrl, '_blank')}
                    >
                      <span>Code</span>
                      <ArrowUpRight size={14} />
                    </button>
                    {project.homepageUrl && (
                      <button 
                        className="overlay-btn demo-btn"
                        onClick={() => window.open(project.homepageUrl, '_blank')}
                      >
                        <span>Live</span>
                        <ArrowUpRight size={14} />
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Title / Action under the card */}
                <div className="card-details">
                  <h3 className="project-title">
                    <div 
                      className="project-arrow-circle"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.homepageUrl || project.htmlUrl, '_blank');
                      }}
                      style={{ cursor: 'pointer' }}
                      title={project.homepageUrl ? 'Open Live Demo' : 'Open GitHub Repository'}
                    >
                      <ArrowRight size={18} className="project-arrow-icon" />
                    </div>
                    <span>{project.title}</span>
                  </h3>
                  {(project.category || (project.topics && project.topics.length > 0)) && (
                    <div className="project-tags">
                      {project.category && <span className="project-tag-language">{project.category}</span>}
                      {project.topics && project.topics.map((topic, tIdx) => (
                        <span key={tIdx} className="project-tag-topic">{topic}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Explore More Button */}
        <div className="explore-container">
          <button 
            className="explore-btn"
            onClick={() => window.open('https://github.com/omkarsunilshivarkar', '_blank')}
          >
            <span className="dot-indicator"></span>
            Explore more on GitHub
          </button>
        </div>
      </div>
    </section>
  );
}

// Renders visual CSS representations of application UI
function renderMockupContent(type) {
  switch (type) {
    case 'dashboard':
      return (
        <div className="mockup-dashboard">
          <div className="mockup-sidebar"></div>
          <div className="mockup-main">
            <div className="mockup-herobar"></div>
            <div className="mockup-cardsrow">
              <div className="mockup-minicard"></div>
              <div className="mockup-minicard"></div>
              <div className="mockup-minicard"></div>
            </div>
            <div className="mockup-chartarea"></div>
          </div>
        </div>
      );
    case 'chat':
      return (
        <div className="mockup-chat">
          <div className="mockup-chat-sidebar"></div>
          <div className="mockup-chat-window">
            <div className="mockup-chat-header"></div>
            <div className="mockup-chat-messages">
              <div className="mockup-message-left"></div>
              <div className="mockup-message-right"></div>
              <div className="mockup-message-left"></div>
            </div>
            <div className="mockup-chat-input"></div>
          </div>
        </div>
      );
    case 'ai-chat':
      return (
        <div className="mockup-aichat">
          <div className="mockup-aiheader">
            <span className="mockup-ailogo">ChatGPT</span>
          </div>
          <div className="mockup-aicontent">
            <div className="mockup-aimessage-in"></div>
            <div className="mockup-aimessage-out"></div>
          </div>
          <div className="mockup-aipillinput"></div>
        </div>
      );
    case 'gemini':
      return (
        <div className="mockup-gemini">
          <div className="mockup-gemini-grid">
            <div className="mockup-gemini-col-left">
              <div className="mockup-col-title">Google Gemini API</div>
              <div className="mockup-col-card"></div>
              <div className="mockup-col-card"></div>
            </div>
            <div className="mockup-gemini-col-right">
              <div className="mockup-sparkle-header"></div>
              <div className="mockup-sparkle-output"></div>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}
