import React from 'react';
import { Github, Linkedin, Mail, Globe } from 'lucide-react';

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ className = '', iconSize = 20 }) => {
  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <a
        href="https://github.com/samplergithubsandeep"
        target="_blank"
        rel="noopener noreferrer"
        className="text-neutral-400 hover:text-white transition-colors"
        aria-label="GitHub"
      >
        <Github size={iconSize} />
      </a>
      <a
        href="https://www.linkedin.com/in/banothsandeepnaik/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-neutral-400 hover:text-white transition-colors"
        aria-label="LinkedIn"
      >
        <Linkedin size={iconSize} />
      </a>
      <a
        href="mailto:sandeepnaikb0@gmail.com"
        className="text-neutral-400 hover:text-white transition-colors"
        aria-label="Email"
      >
        <Mail size={iconSize} />
      </a>
      {/* <a
        href="#projects"
        className="text-neutral-400 hover:text-white transition-colors"
        aria-label="Portfolio"
      >
        <Globe size={iconSize} />
      </a> */}
    </div>
  );
};

export default SocialLinks;