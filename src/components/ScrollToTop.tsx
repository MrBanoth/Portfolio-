import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { Link } from 'react-scroll';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return isVisible ? (
    <Link
      to="home"
      spy={true}
      smooth={true}
      duration={500}
      className="fixed bottom-6 right-6 z-50 bg-white text-black w-10 h-10 rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-neutral-200 transition-all duration-300"
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-5 w-5" />
    </Link>
  ) : null;
};

export default ScrollToTop;
