import React from 'react';
import './Skills.css';

// High-fidelity brand SVG icons to match the light theme perfectly
const TECH_ICONS = {
  html: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#e34f26">
      <path d="M1.5 0h21l-1.91 21.563L12 24l-8.59-2.438L1.5 0zm17 5.5H7.07l.26 3h10.92l-.52 6H12v2.85l4.73-1.35.53-6H7.35l-.26-3h11.92l-.51-3z" />
    </svg>
  ),
  js: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#f7df1e">
      <rect width="24" height="24" rx="3" fill="#f7df1e" />
      <path d="M1.5 0h21v24h-21z" fill="#f7df1e" />
      <path d="M19.9 11.2c-.6-.4-1.3-.7-2-.7-1.1 0-1.7.5-1.7 1.2 0 2 3.1 1.9 3.1 4.5 0 1.5-1.2 2.8-3.1 2.8-1.5 0-2.6-.6-3.2-1.3l1.5-1.1c.4.6 1 1 1.7 1 1 0 1.4-.4 1.4-1.1 0-2.1-3.1-2-3.1-4.6 0-1.6 1.3-2.7 3-2.7 1.3 0 2.2.5 2.8 1.1l-1.4 1.1zM11.5 13.5v5.5H9.3v-5.5h2.2zm0-4.5v1.8H9.3V9h2.2z" fill="#000" />
    </svg>
  ),
  ts: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#3178c6">
      <rect width="24" height="24" rx="3" fill="#3178c6" />
      <path d="M20.2 11.2c-.6-.4-1.3-.7-2-.7-1.1 0-1.7.5-1.7 1.2 0 2 3.1 1.9 3.1 4.5 0 1.5-1.2 2.8-3.1 2.8-1.5 0-2.6-.6-3.2-1.3l1.5-1.1c.4.6 1 1 1.7 1 1 0 1.4-.4 1.4-1.1 0-2.1-3.1-2-3.1-4.6 0-1.6 1.3-2.7 3-2.7 1.3 0 2.2.5 2.8 1.1l-1.4 1.1zM8.5 10.8H6V9h7.4v1.8H11v8.2H8.5v-8.2z" fill="#fff" />
    </svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#61dafb" strokeWidth="2">
      <circle cx="12" cy="12" r="2" fill="#61dafb" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(90 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(150 12 12)" />
    </svg>
  ),
  next: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff">
      <path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0zm5.6 18.2l-6.8-8.8v8.8H9.4V6.8h1.4l6.4 8.2V6.8h1.4v11.4z" />
    </svg>
  ),
  redux: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#764abc">
      <path d="M12 0L2.1 5.7v12.6L12 24l9.9-5.7V5.7L12 0zm6.8 16.5l-6.8 3.9-6.8-3.9V7.5l6.8-3.9 6.8 3.9v9z" />
      <path d="M12 6.5l-4.5 2.6v5.2l4.5 2.6 4.5-2.6V9.1L12 6.5zm2.2 7.1L12 14.9l-2.2-1.3V9.8L12 8.5l2.2 1.3v3.8z" />
    </svg>
  ),
  css3: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#1572b6">
      <path d="M1.5 0h21l-1.91 21.563L12 24l-8.59-2.438L1.5 0zm17 5.5H7.07l.26 3h10.92l-.52 6H12v2.85l4.73-1.35.53-6H7.35l-.26-3h11.92l-.51-3z" />
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#06b6d4">
      <path d="M12 6.002c-1.874-3.748-5.626-6.002-9.375-6.002-1.875 0-3.75.562-4.625 1.5 2.813 1.875 4.688 5.625 4.688 9.375 0 3.75-1.875 7.5-4.688 9.375.875.938 2.75 1.5 4.625 1.5 3.749 0 7.501-2.254 9.375-6.002 1.874 3.748 5.626 6.002 9.375 6.002 1.875 0 3.75-.562 4.625-1.5-2.813-1.875-4.688-5.625-4.688-9.375 0-3.75 1.875-7.5 4.688-9.375-.875-.938-2.75-1.5-4.625-1.5-3.749 0-7.501 2.254-9.375 6.002z" />
    </svg>
  ),
  bootstrap: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#7952b3">
      <path d="M22.5 0H1.5A1.5 1.5 0 0 0 0 1.5v21A1.5 1.5 0 0 0 1.5 24h21a1.5 1.5 0 0 0 1.5-1.5v-21A1.5 1.5 0 0 0 22.5 0zM15.8 13.8c0 1.4-1.1 2.5-2.5 2.5H7.4v-9h5.6c1.3 0 2.4.9 2.4 2.3 0 .8-.5 1.5-1.2 1.9.9.3 1.6 1.1 1.6 2.3z" />
      <path d="M9.8 8.8h2.8c.4 0 .7.3.7.8s-.3.8-.7.8H9.8V8.8zm0 3.8h3.2c.4 0 .8.3.8.8 0 .4-.4.8-.8.8H9.8v-2.4z" fill="#fff" />
    </svg>
  ),
  sass: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#cc6699">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 16.5c-.8.8-2.2 1.1-3.5 1.1-2.5 0-4.5-1.5-4.5-4 0-2.8 2.2-4.5 4.5-4.5 1.6 0 2.8.5 3.5 1.4l-1.5 1.1c-.4-.5-1-.7-1.5-.7-1.2 0-2 .8-2 2s.8 2 2 2c.6 0 1.1-.3 1.5-.7l1.5 1.3z" />
    </svg>
  ),
  mui: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#007fff">
      <path d="M0 2.4v19.2C0 22.9 1.1 24 2.4 24h19.2c1.3 0 2.4-1.1 2.4-2.4V2.4C24 1.1 22.9 0 21.6 0H2.4C1.1 0 0 1.1 0 2.4zm12 3.6l6 6-6 6-6-6 6-6z" />
    </svg>
  ),
  python: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#3776ab">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.8 4.2c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5zm3.6 15.6c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z" />
    </svg>
  ),
  c: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#659ad2">
      <circle cx="12" cy="12" r="12" fill="#659ad2" />
      <path d="M16 16.5c-1 1-2.5 1.5-4 1.5-3.3 0-6-2.7-6-6s2.7-6 6-6c1.5 0 3 .5 4 1.5l-1.8 1.8c-.6-.6-1.4-.8-2.2-.8-2.2 0-4 1.8-4 4s1.8 4 4 4c.8 0 1.6-.2 2.2-.8L16 16.5z" fill="#fff" />
    </svg>
  ),
  cpp: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#00599c">
      <circle cx="12" cy="12" r="12" fill="#00599c" />
      <path d="M14 16c-1 1-2.5 1.5-4 1.5-3.3 0-6-2.7-6-6s2.7-6 6-6c1.5 0 3 .5 4 1.5l-1.8 1.8c-.6-.6-1.4-.8-2.2-.8-2.2 0-4 1.8-4 4s1.8 4 4 4c.8 0 1.6-.2 2.2-.8L14 16zm4-5h1.5v1.5H18v1.5h-1.5v-1.5H15V11h1.5V9.5H18V11zm4.5 0H24v1.5h-1.5v-1.5H21V11h1.5V9.5H24V11z" fill="#fff" />
    </svg>
  ),
  node: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#339933">
      <path d="M12 0L2.3 5.6v12.8L12 24l9.7-5.6V5.6L12 0zm6.8 16.8L12 20.7l-6.8-3.9V7.2L12 3.3l6.8 3.9v9.6z" />
      <path d="M12 6.5l-4.5 2.6v5.2l4.5 2.6 4.5-2.6V9.1L12 6.5z" />
    </svg>
  ),
  express: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff">
      <rect width="24" height="24" rx="4" fill="#1c1c1f" />
      <text x="3" y="16" fill="#fff" fontSize="9" fontWeight="800" fontFamily="sans-serif">EX</text>
    </svg>
  ),
  django: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#092e20">
      <rect width="24" height="24" rx="4" fill="#092e20" />
      <text x="3" y="16" fill="#fff" fontSize="9" fontWeight="800" fontFamily="sans-serif">dj</text>
    </svg>
  ),
  mysql: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#4479a1">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm1.8 16.5V11h-3.6v5.5h3.6z" />
    </svg>
  ),
  postgres: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#4169e1">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm4.5 14c-.6.6-1.5 1-2.5 1h-4v-6h4c1 0 1.9.4 2.5 1 .6.6 1 1.4 1 2.5s-.4 1.9-1 2.5z" />
    </svg>
  ),
  mongo: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#47a248">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zM8.5 12c0-1.9 1.5-3.5 3.5-3.5s3.5 1.6 3.5 3.5-1.5 3.5-3.5 3.5S8.5 13.9 8.5 12z" />
    </svg>
  ),
  vercel: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#000">
      <path d="M12 1L24 22H0z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#000">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  git: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#f05032">
      <path d="M23.6 11.2L12.8.4c-.6-.6-1.5-.6-2.1 0L.4 10.7c-.6.6-.6 1.5 0 2.1l10.8 10.8c.6.6 1.5.6 2.1 0l10.3-10.3c.6-.6.6-1.5 0-2.1zM12 18c-1.1 0-2-.9-2-2 0-.8.4-1.4 1-1.7V11c-.6-.3-1-1-1-1.7 0-1.1.9-2 2-2s2 .9 2 2c0 .8-.4 1.4-1 1.7v3.3c.6.3 1 1 1 1.7 0 1.1-.9 2-2 2z" />
    </svg>
  ),
  figma: (
    <svg viewBox="0 0 24 24" width="20" height="20">
      <path d="M12 0H8a4 4 0 0 0-4 4v4a4 4 0 0 0 8 0V4a4 4 0 0 0-4-4z" fill="#f24e1e" />
      <path d="M4 16a4 4 0 0 0 4 4h4V12H8a4 4 0 0 0-4 4z" fill="#a259ff" />
      <path d="M16 12a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4h-4v12h4z" fill="#ff7262" />
      <path d="M12 12h4a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4h-4V12z" fill="#1abc9c" />
    </svg>
  ),
  render: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#4669F2">
      <rect width="24" height="24" rx="5" fill="#4669F2" />
      <text x="6" y="17" fill="#fff" fontSize="13" fontWeight="900" fontFamily="system-ui, sans-serif">R</text>
    </svg>
  ),
  turso: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#00D2C4">
      <rect width="24" height="24" rx="5" fill="#00D2C4" />
      <text x="6" y="17" fill="#000" fontSize="13" fontWeight="900" fontFamily="system-ui, sans-serif">T</text>
    </svg>
  ),
};

const skillsList = [
  {
    title: 'Front-End Development',
    description: 'Building engaging and user-friendly web interfaces using modern frameworks and technologies with expertise.',
    icons: ['html', 'js', 'redux', 'react'],
    size: 'wide',
  },
  {
    title: 'Programming Languages',
    description: 'Proficient in problem-solving and applying programming languages to implement efficient data structures and algorithms.',
    icons: ['python', 'c', 'cpp'],
    size: 'wide',
  },
  {
    title: 'Styling & Design',
    description: 'Crafting visually appealing and responsive designs with advanced styling tools and frameworks.',
    icons: ['css3', 'tailwind', 'bootstrap', 'mui'],
    size: 'normal',
  },
  {
    title: 'Back-End Development',
    description: 'Developing robust server-side logic and APIs to power dynamic and scalable web applications.',
    icons: ['node', 'express', 'django'],
    size: 'normal',
  },
  {
    title: 'Database Management',
    description: 'Designing and managing databases to ensure secure and efficient data storage and retrieval.',
    icons: ['mysql', 'postgres', 'mongo', 'turso'],
    size: 'normal',
  },
  {
    title: 'Cloud & Deployment',
    description: 'Experienced in deploying and managing applications using modern cloud platforms and tools.',
    icons: ['vercel', 'render'],
    size: 'normal',
  },
  {
    title: 'Version Control & Collaboration',
    description: 'Effectively managing code and collaborating on projects to ensure seamless teamwork.',
    icons: ['github', 'git'],
    size: 'wide',
  },
  {
    title: 'UI/UX Design',
    description: 'Designing user-centric interfaces that are intuitive, visually appealing, and easy to navigate.',
    icons: ['figma'],
    size: 'wide',
  },
];

// Helper to retrieve user-friendly tool name from SVG mapping keys
function getIconFriendlyName(key) {
  const names = {
    html: 'HTML5',
    js: 'JavaScript',
    ts: 'TypeScript',
    react: 'React',
    redux: 'Redux',
    css3: 'CSS3',
    tailwind: 'Tailwind CSS',
    bootstrap: 'Bootstrap',
    mui: 'Material UI',
    python: 'Python',
    c: 'C',
    cpp: 'C++',
    node: 'Node.js',
    express: 'Express',
    django: 'Django',
    mysql: 'MySQL',
    postgres: 'PostgreSQL',
    mongo: 'MongoDB',
    vercel: 'Vercel',
    render: 'Render',
    turso: 'Turso',
    github: 'GitHub',
    git: 'Git',
    figma: 'Figma',
  };
  return names[key] || key;
}

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <h2 className="section-header">Skills that fuel my passion</h2>

      <div className="skills-bento-grid">
        {skillsList.map((category, idx) => (
          <div key={idx} className={`bento-card bento-card-${category.size}`}>
            {category.icons && category.icons.length > 0 && (
              <div className="icons-row">
                {category.icons.map((iconKey) => (
                  <div key={iconKey} className="icon-circle">
                    {TECH_ICONS[iconKey]}
                    <span className="icon-tooltip">{getIconFriendlyName(iconKey)}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="card-header">
              <h3 className="card-title">{category.title}</h3>
            </div>
            <p className="card-desc">{category.description}</p>
            {category.skills && category.skills.length > 0 && (
              <div className="badge-container">
                {category.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
