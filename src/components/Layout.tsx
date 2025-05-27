import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import SocialLinks from './SocialLinks';
import ScrollToTop from './ScrollToTop';
import WhatsAppButton from './WhatsAppButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative">
      <Navbar scrolled={scrolled} />
      <main>{children}</main>
      <ScrollToTop />
      <WhatsAppButton phoneNumber="+919390730129" />
      <footer className="bg-neutral-900 py-4 md:py-6">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm">
              © {new Date().getFullYear()} Banoth Sandeep Naik. All rights reserved.
            </p>
            <SocialLinks className="mt-4 md:mt-0" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;