import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import portraitImg from '../assets/1000116575.png';
import './Hero.css';

export default function Hero() {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <header id="home" className="hero-wrapper">

      {/* Main Grey Card Frame */}
      <div className="hero-card">
        {/* Header Info inside the card */}
        <div className="top-header">
          <div className="branding">
            <span className="branding-pulse"></span>
            @ Code by Omkar Shivarkar
          </div>
          <div className="short-bio">
            Frontend Developer passionate about building scalable web applications and AI-powered products, where clean engineering meets thoughtful design to create exceptional digital experiences.          </div>
        </div>

        {/* Display Content Area */}
        <div className="display-container">
          {/* Giant White Background Text (Seamless Marquee) */}
          <div className="giant-text-container">
            <div className={`giant-text-track ${imageLoaded ? 'running' : 'paused'}`}>
              <span className="giant-text">Developer &amp; Frontend Engineer &amp; Product Builder &amp;&nbsp;</span>
              <span className="giant-text">Developer &amp; Frontend Engineer &amp; Product Builder &amp;&nbsp;</span>
            </div>
          </div>

          {/* Centered Greyscale Portrait Overlap */}
          <div className="portrait-wrapper">
            <img 
              src={portraitImg} 
              alt="Omkar Shivarkar" 
              className={`portrait-img ${imageLoaded ? 'loaded' : ''}`} 
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          {/* Floating Circle Arrow (Diagonal Arrow button next to the head) */}
          <button
            onClick={() => document.getElementById('profile')?.scrollIntoView({ behavior: 'smooth' })}
            className="floating-arrow"
            title="About Me"
          >
            <ArrowUpRight size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Sub-Hero Description / About Me section */}
      <div id="profile" className="intro-container">
        <div className="intro-content">
          <div className="intro-left">
            I'm Omkar Shivarkar, a Frontend Engineer passionate about building scalable web applications and AI-powered products. I enjoy solving complex engineering challenges, optimizing performance, and crafting fast, intuitive, and reliable digital experiences.          </div>
          <div className="intro-right">
            <p className="intro-right-text">
              I believe great software goes beyond writing code—it's about understanding users, refining the details, and creating experiences people enjoy using.            </p>
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="more-btn"
            >
              <span>More about me</span>
              <div className="more-icon-wrapper">
                <ArrowUpRight size={16} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
