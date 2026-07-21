import React, { useEffect, useState } from 'react';
import { Home, Code, Globe, User, FileText, GitBranch, Mail } from 'lucide-react';
import './FloatingDock.css';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'projects', label: 'Projects', icon: Globe },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export default function FloatingDock() {
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredIdx, setHoveredIdx] = useState(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => {
      navItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const handleScroll = (id) => {
    if (id === 'resume') {
      window.open('#', '_blank'); // Mock resume link
      return;
    }
    if (id === 'source') {
      window.open('https://github.com/omkarsunilshivarkar', '_blank');
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <nav className="dock-container">
      <div className="dock">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const isHovered = hoveredIdx === idx;
          const isNeighbor = hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1;

          let itemClass = 'dock-item';
          if (isActive) itemClass += ' dock-item-active';
          if (isHovered) itemClass += ' dock-item-hovered';
          if (isNeighbor) itemClass += ' dock-item-neighbor';

          return (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={itemClass}
              title={item.label}
            >
              <Icon size={18} className={isActive ? "dock-icon-active" : "dock-icon"} />
              <span className="dock-tooltip">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
