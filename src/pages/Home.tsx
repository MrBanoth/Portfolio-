import React from 'react';
import TypedText from '../components/TypedText';
import { Github, Linkedin } from 'lucide-react';

// Responsive breakpoints:
// - sm: 640px
// - md: 768px
// - lg: 1024px
// - xl: 1280px
// - 2xl: 1536px

const Home: React.FC = () => {
  return (
    <section 
      id="home"
      className="min-h-screen flex items-center bg-black pt-16 pb-2 md:pt-20 md:pb-6 lg:pt-24 lg:pb-8 relative overflow-hidden"
    >
      {/* Blurry background image for all screen sizes */}
      <div className="absolute inset-0 opacity-20 sm:opacity-20 md:opacity-20 lg:opacity-20 xl:opacity-25 pointer-events-none">
        <img 
          src="/img.jpg" 
          alt="" 
          className="w-full h-full object-cover blur-md" 
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Content - Left Column */}
          <div className="lg:col-span-7 xl:col-span-6 order-2 lg:order-1">
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="space-y-2 sm:space-y-3">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="block">Banoth</span>
                  <span className="block">Sandeep Naik</span>
                  <div className="mt-2 text-sm sm:text-base text-neutral-500 font-normal flex items-center">
                    <span>⚡️</span>
                    <TypedText 
                      text=" Frontend Developer / UI-UX Designer" 
                      speed={70} 
                      pauseBeforeDelete={1800} 
                      pauseBeforeType={300} 
                      className="ml-1" 
                    />
                  </div>
                </h1>
              </div>
              
              <p className="text-neutral-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl">
                I'm a passionate Frontend Developer and UI/UX Designer who loves crafting user-centric websites and intuitive interfaces. 
                I focus on writing clean, maintainable code that improves user experience and supports long-term scalability.
              </p>
              
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
                <a 
                  href="#projects" 
                  className="inline-flex items-center justify-center bg-white text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium hover:bg-neutral-200 transition-colors text-sm sm:text-base whitespace-nowrap"
                >
                  View Portfolio
                </a>
                
                <a 
                  href="/resume_sandeep_web (1).pdf" 
                  download 
                  className="inline-flex items-center justify-center bg-transparent border border-neutral-700 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium hover:border-neutral-500 transition-colors text-sm sm:text-base whitespace-nowrap"
                >
                  Download CV
                </a>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center space-x-2">
                  <span className="h-2.5 w-2.5 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-sm sm:text-base text-neutral-400">Available for freelance work</span>
                </div>

                <div className="flex items-center space-x-4">
                  <a 
                    href="https://github.com/MrBanoth" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-neutral-400 hover:text-white transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/sandeep-naik-1316712a9/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-neutral-400 hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Image - Right Column */}
          <div className="lg:col-span-5 xl:col-span-6 order-1 lg:order-2 flex justify-center lg:justify-end mt-6 md:mt-0">
            <div className="relative group w-full max-w-md floating">
              <div className="relative bg-black rounded-3xl overflow-hidden border border-neutral-800 w-full transform transition-all duration-300 group-hover:scale-[1.02]">
                <img
                  src="/img.jpg"
                  alt="Sandeep Naik"
                  className="w-full aspect-square lg:aspect-[4/5] object-cover object-center"
                  width={500}
                  height={600}
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 md:p-8">
                  <div className="space-y-2 text-white">
                    <h3 className="text-xl sm:text-2xl font-bold">Banoth Sandeep Naik</h3>
                    <p className="text-neutral-300">Frontend Developer & UI/UX Designer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default Home;