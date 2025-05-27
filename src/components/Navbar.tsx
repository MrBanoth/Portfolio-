import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import ChatDialog from './ChatDialog';

interface NavbarProps {
  scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100; // Adding offset for better detection
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
    document.body.style.touchAction = '';
  };

  const openMenu = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  };

  const toggleMenu = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      const target = event.target as HTMLElement;
      const menu = document.querySelector('.mobile-menu');
      const menuButton = document.querySelector('.menu-button');
      
      if (isOpen && menu && !menu.contains(target) && menuButton && !menuButton.contains(target)) {
        closeMenu();
      }
    };

    // Close menu on route change
    const handleRouteChange = () => {
      if (isOpen) closeMenu();
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('popstate', handleRouteChange);
      document.body.style.overflow = 'auto';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2 bg-black/90 backdrop-blur-sm' : 'py-4 bg-black'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link
              to="home"
              spy={true}
              smooth={true}
              duration={500}
              className="flex items-center cursor-pointer"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-neutral-700 mr-2">
                  <img src="/img.jpg" alt="BSN" className="w-full h-full object-cover" />
                </div>
                <span className="text-xl font-bold tracking-wider">BSN</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  className={`${activeSection === link.to ? 'text-white font-medium' : 'text-neutral-300'} hover:text-white transition-colors cursor-pointer relative group`}
                >
                  {link.name}
                  {activeSection === link.to && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white"></span>}
                </Link>
              ))}
              <button
                onClick={() => setIsChatOpen(true)}
                className="bg-white text-black px-5 py-2 rounded-full hover:bg-neutral-200 transition-colors font-medium cursor-pointer"
              >
                Let's Talk
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white menu-button z-50" 
              onClick={toggleMenu}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/98 z-40 flex flex-col justify-center items-center pt-20"
            style={{
              top: '64px',
              height: 'calc(100vh - 64px)',
              WebkitOverflowScrolling: 'touch',
              overflowY: 'auto',
              overscrollBehavior: 'contain'
            }}
          >
            <ul className="flex flex-col space-y-8 text-center w-full px-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    className={`text-2xl ${activeSection === link.to ? 'text-white font-bold' : 'text-neutral-400 font-medium'} hover:text-white transition-colors cursor-pointer relative`}
                    onClick={closeMenu}
                  >
                    {link.name}
                    {activeSection === link.to && <span className="block h-0.5 w-8 bg-white mx-auto mt-2"></span>}
                  </Link>
                </li>
              ))}
              <li className="pt-6">
                <button
                  className="inline-block px-8 py-3 text-black bg-white rounded-full hover:bg-neutral-200 transition-colors font-medium cursor-pointer"
                  onClick={() => {
                    closeMenu();
                    setIsChatOpen(true);
                  }}
                >
                  Let's Talk
                </button>
              </li>
            </ul>
            <div className="absolute bottom-12 flex space-x-8 mt-12">
              <a href="https://github.com/MrBanoth" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white transition-colors">
                <Github size={22} />
              </a>
              <a href="https://www.linkedin.com/in/sandeep-naik-1316712a9/" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white transition-colors">
                <Linkedin size={22} />
              </a>
            </div>
          </div>
        )}
      </div>
      
      {/* Chat Dialog */}
      <ChatDialog isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default Navbar;