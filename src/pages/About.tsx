import React from 'react';
import InfoItem from '../components/InfoItem';
import { Code, Database, Layout, Palette, Server, Terminal } from 'lucide-react';

const About: React.FC = () => {

  return (
    <section className="bg-black pt-1 pb-0 md:pt-1 md:pb-0 lg:pt-1 lg:pb-0" id="about">
      <div className="container">
        <div className="max-w-3xl">
        <h2 className="text-4xl font-bold mb-6">About Me</h2>
        <p className="text-neutral-300 text-lg leading-relaxed mb-4">
          Hi, I'm Banoth Sandeep Naik, a B.Tech student in Computer Science and Engineering at IIIT Manipur, currently based in Hyderabad. 
          I'm a passionate and self-motivated Frontend Developer and UI/UX Designer with a strong focus on modern web technologies.
        </p>
        
        <div className="bg-neutral-900/50 rounded-xl p-4 border border-neutral-800 mb-4 backdrop-blur-sm">
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <h3 className="text-xl font-medium">Current Position</h3>
          </div>
          <p className="text-neutral-300 text-lg leading-relaxed">
            I'm currently working as an <span className="font-semibold text-white">Intern - Software Developer</span> at <span className="font-semibold text-white">PSS Automate Private Limited</span> for an 8-week internship.
          </p>
          <div className="mt-3">
            <a 
              href="/offerletter.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white text-black rounded-full text-sm font-medium hover:bg-neutral-200 transition-colors"
            >
              View Offer Letter
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
        <p className="text-neutral-300 text-lg leading-relaxed mb-4">
          I love creating clean, responsive, and intuitive user interfaces that offer seamless user experiences. 
          My current focus is on mastering the MERN stack and enhancing my UI/UX design skills. I believe in writing 
          maintainable, scalable code and following design principles that combine both function and aesthetic.
        </p>
        <p className="text-neutral-300 text-lg leading-relaxed">
          With a strong foundation in HTML, CSS, JavaScript, and React.js, and growing skills in backend development with 
          Node.js and MongoDB, I'm always striving to push my boundaries and deliver impactful web solutions. 
          I'm open to freelance work and collaborations that challenge me and help me grow as a developer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
        <div>
          <div className="bg-neutral-900/50 rounded-xl p-4 sm:p-5 border border-neutral-800 h-full backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <Terminal className="w-6 h-6 mr-3 text-neutral-400" />
              <h3 className="text-2xl font-medium">Currently Learning Tech Stack</h3>
            </div>
            <div className="p-6 bg-black/30 rounded-xl border border-neutral-800">
              <div className="flex items-center mb-4">
                <Code className="w-5 h-5 mr-2 text-neutral-400" />
                <h4 className="text-lg font-medium">Front-End Side</h4>
              </div>
              <div className="flex flex-wrap gap-3 mb-6">
                {['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Angular', 'Ionic', 'Express', 'CodeIgniter'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-neutral-800 rounded-full text-sm text-neutral-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="p-6 bg-black/30 rounded-xl border border-neutral-800 mt-6">
              <div className="flex items-center mb-4">
                <Server className="w-5 h-5 mr-2 text-neutral-400" />
                <h4 className="text-lg font-medium">Back-End Side</h4>
              </div>
              <div className="flex flex-wrap gap-3 mb-6">
                {['PHP', 'CodeIgniter', 'JavaScript', 'Node.js', 'Express.js', 'MySQL', 'MongoDB', 'Linux', 'Apache', 'Nginx', 'Docker', 'Git', 'REST API'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-neutral-800 rounded-full text-sm text-neutral-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 bg-black/30 rounded-xl border border-neutral-800 mt-6">
              <div className="flex items-center mb-4">
                <Palette className="w-5 h-5 mr-2 text-neutral-400" />
                <h4 className="text-lg font-medium">UI & Styling</h4>
              </div>
              <div className="flex flex-wrap gap-3 mb-6">
                {['HTML', 'CSS', 'Sass', 'jQuery', 'Bootstrap', 'Tailwind CSS', 'Material UI', 'Media queries', 'Responsive', 'Grid', 'Animations', 'GSAP', 'Anime.js'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-neutral-800 rounded-full text-sm text-neutral-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 bg-black/30 rounded-xl border border-neutral-800 mt-6">
              <div className="flex items-center mb-4">
                <Database className="w-5 h-5 mr-2 text-neutral-400" />
                <h4 className="text-lg font-medium">Database</h4>
              </div>
              <div className="flex flex-wrap gap-3 mb-6">
                {['MySQL', 'PostgreSQL', 'MongoDB', 'SQL', 'Sequelize', 'Mongoose', 'Schema design', 'indexing', 'normalization', 'Entity relationship', 'modeling (ER)', 'document based modeling'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-neutral-800 rounded-full text-sm text-neutral-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-neutral-900/50 rounded-2xl p-6 border border-neutral-800 backdrop-blur-sm">
            <h3 className="text-2xl font-medium mb-6">Personal Information</h3>
            <div className="space-y-6">
              <InfoItem label="Name" value="Banoth Sandeep Naik" />
              <InfoItem label="Nationality" value="Indian" />
              <InfoItem label="Phone" value="(+91) 9390730129" />
              <InfoItem label="Freelance" value="Available" />
              <InfoItem label="Language" value="Hindi / Telugu / English" />
            </div>
            
            <div className="mt-10">
              <a
                href="/resume_sandeep_web (1).pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-black px-6 py-3 rounded-full hover:bg-neutral-200 transition-colors"
              >
                Download Resume
              </a>
            </div>
          </div>

          <div className="bg-neutral-900/50 rounded-2xl p-8 border border-neutral-800 mt-10 backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <Layout className="w-6 h-6 mr-3 text-neutral-400" />
              <h3 className="text-2xl font-medium">RestAPI / APIs</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {['API Design', 'Documentation', 'Express.js', 'CodeIgniter', 'JWT', 'OAuth', 'Postman', 'Swagger', 'Rate Limiting', 'Validation', 'CORS', 'HTTPS', 'Third-party API integration'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-neutral-800 rounded-full text-sm text-neutral-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default About;