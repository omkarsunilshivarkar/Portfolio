import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('oss.shivarkar@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <footer id="contact" className="contact-footer">
      <div className="contact-content">
        <div className="top-content">
          <span className="sub-text">That's all for now.</span>
          <h2 className="contact-heading">Got a project in mind? <br />Let's talk</h2>
        </div>

        {/* Interactive Line with Floating Circle Button */}
        <div className="interactive-line-wrapper">
          <div className="line"></div>
          <a href="mailto:oss.shivarkar@gmail.com" className="contact-floating-circle">
            <span>Get in touch</span>
          </a>
        </div>

        {/* Bottom Info Details */}
        <div className="details-row">
          <div className="detail-block">
            <span className="detail-label">Email:</span>
            <div className="email-wrapper">
              <a href="mailto:oss.shivarkar@gmail.com" className="detail-value">
                oss.shivarkar@gmail.com
              </a>
              <button onClick={handleCopyEmail} className="copy-email-btn" title="Copy Email">
                {copied ? <Check size={14} className="copied-icon" /> : <Copy size={14} />}
                {copied && <span className="copy-tooltip">Copied!</span>}
              </button>
            </div>
          </div>
          <div className="detail-block">
            <span className="detail-label">Phone:</span>
            <a href="tel:+919324344069" className="detail-value">
              (+91) 93243 44069
            </a>
          </div>
          <div className="socials-block">
            <a
              href="https://www.linkedin.com/in/omkarsunilshivarkar/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              title="LinkedIn"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a
              href="https://github.com/omkarsunilshivarkar"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              title="GitHub"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
          </div>
        </div>

        <div className="copyright-row">
          <p className="copyright-text">&copy; 2026 Omkar Shivarkar. All rights reserved.</p>
          <p className="built-with-text">Made with ❤️</p>
        </div>
      </div>
    </footer>
  );
}
