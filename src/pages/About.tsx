import React from 'react';

const About: React.FC = () => {

  return (
    <section className="bg-black pt-15 pb-0 md:pt-20 md:pb-0 lg:pt-24 lg:pb-0" id="about">
      <div className="container">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-4xl font-bold mb-6">About Me</h2>
            <p className="text-neutral-300 text-lg leading-relaxed mb-4">
              Hi, I'm Banoth Sandeep Naik, a B.Tech student in Computer Science and Engineering at IIIT Manipur, currently based in Hyderabad. 
              I'm a passionate and self-motivated Frontend Developer and UI/UX Designer with a strong focus on modern web technologies.
            </p>
            <p className="text-neutral-300 text-lg leading-relaxed mb-4">
              I love creating clean, responsive, and intuitive user interfaces that offer seamless user experiences. 
              My current focus is on mastering the MERN stack and enhancing my UI/UX design skills. I believe in writing 
              maintainable, scalable code and following design principles that combine both function and aesthetic.
            </p>
            <div className="lg:hidden mt-8">
              <p className="text-neutral-300 text-lg leading-relaxed">
                With a strong foundation in HTML, CSS, JavaScript, and React.js, and growing skills in backend development with 
                Node.js and MongoDB, I'm always striving to push my boundaries and deliver impactful web solutions. 
                I'm open to freelance work and collaborations that challenge me and help me grow as a developer.
              </p>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800 backdrop-blur-sm h-full">
              <div className="flex items-center mb-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                <h3 className="text-xl font-medium">Previous Experience</h3>
              </div>
              <p className="text-neutral-300 text-lg leading-relaxed mb-8">
                I've successfully completed my <span className="font-semibold text-white">Internship as a Software Developer</span> at <span className="font-semibold text-white">PSS Automate Private Limited</span>.
              </p>
              <div className="mt-8">
                <a 
                  href="/experience_letter.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-neutral-200 transition-colors"
                >
                  View Experience Letter
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:hidden mt-8">
          <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800 backdrop-blur-sm">
            <div className="flex items-center mb-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
              <h3 className="text-xl font-medium">Previous Experience</h3>
            </div>
            <p className="text-neutral-300 text-lg leading-relaxed mb-8">
              I've successfully completed my <span className="font-semibold text-white">Internship as a Software Developer</span> at <span className="font-semibold text-white">PSS Automate Private Limited</span>.
            </p>
            <div className="mt-8">
              <a 
                href="/experience_letter.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-neutral-200 transition-colors"
              >
                View Experience Letter
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:block lg:col-span-3 mt-8">
          <p className="text-neutral-300 text-lg leading-relaxed">
            With a strong foundation in HTML, CSS, JavaScript, and React.js, and growing skills in backend development with 
            Node.js and MongoDB, I'm always striving to push my boundaries and deliver impactful web solutions. 
            I'm open to freelance work and collaborations that challenge me and help me grow as a developer.
          </p>
        </div>
      </div>


    </section>
  );
};

export default About;