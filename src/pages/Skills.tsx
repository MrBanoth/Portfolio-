import React, { useEffect, useState } from 'react';
import { Server, Palette, Wrench, Database, Monitor, Globe } from 'lucide-react';

const Skills: React.FC = () => {
  const [animatedSkills, setAnimatedSkills] = useState<number[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setAnimatedSkills(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll('.skill-bar');
    elements.forEach(el => observer.observe(el));

    return () => elements.forEach(el => observer.unobserve(el));
  }, []);
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Monitor className="h-6 w-6" />,
      skills: [
        { name: 'HTML5', logo: '⚡' },
        { name: 'CSS3', logo: '🎨' },
        { name: 'JavaScript', logo: '🟨' },
        { name: 'React.js', logo: '⚛️' },
        { name: 'Next.js', logo: '▲' },
        { name: 'TypeScript', logo: '🔷' },
        { name: 'Tailwind CSS', logo: '🌊' },
      ],
      proficiency: 85
    },
    {
      title: 'Backend Development',
      icon: <Server className="h-6 w-6" />,
      skills: [
        { name: 'Node.js', logo: '🟩' },
        { name: 'Express.js', logo: '🚂' },
        { name: 'RESTful APIs', logo: '🔄' },
        { name: 'JWT Auth', logo: '🔐' },
        { name: 'Server Architecture', logo: '🏗️' },
      ],
      proficiency: 65
    },
    {
      title: 'UI/UX Design',
      icon: <Palette className="h-6 w-6" />,
      skills: [
        { name: 'Figma', logo: '🎭' },
        { name: 'Wireframing', logo: '📝' },
        { name: 'Responsive Design', logo: '📱' },
        { name: 'User Flows', logo: '🔄' },
        { name: 'Prototyping', logo: '🧩' },
      ],
      proficiency: 75
    },
    {
      title: 'Database Management',
      icon: <Database className="h-6 w-6" />,
      skills: [
        { name: 'MongoDB', logo: '🍃' },
        { name: 'MySQL', logo: '🐬' },
        { name: 'Mongoose', logo: '🔌' },
        { name: 'Data Modeling', logo: '📊' },
        { name: 'Query Optimization', logo: '⚡' },
      ],
      proficiency: 70
    },
    {
      title: 'Development Tools',
      icon: <Wrench className="h-6 w-6" />,
      skills: [
        { name: 'Git', logo: '🌿' },
        { name: 'GitHub', logo: '🐙' },
        { name: 'VS Code', logo: '📝' },
        { name: 'Postman', logo: '📮' },
        { name: 'npm/yarn', logo: '📦' },
      ],
      proficiency: 80
    },
    {
      title: 'Web Concepts',
      icon: <Globe className="h-6 w-6" />,
      skills: [
        { name: 'PWA', logo: '📱' },
        { name: 'SEO', logo: '🔍' },
        { name: 'Web Performance', logo: '⚡' },
        { name: 'Accessibility', logo: '♿' },
        { name: 'Cross-Browser', logo: '🌐' },
      ],
      proficiency: 75
    }
  ];

  return (
    <section className="bg-black pt-15 pb-0 md:pt-20 md:pb-0 lg:pt-24 lg:pb-0 border-t border-neutral-900" id="skills">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-2 md:mb-3">
          <h2 className="text-4xl font-bold mb-2">My Skills</h2>
          <p className="text-neutral-300 text-lg leading-relaxed mb-2">
            I continuously work on expanding my skill set and keeping up with the latest technologies.
            Here's an overview of my current technical skills and proficiency levels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-neutral-900/50 rounded-xl p-3 sm:p-4 md:p-5 border border-neutral-800 h-full">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-white">{category.icon}</span>
                <h3 className="text-lg sm:text-xl font-semibold">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-5">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="bg-neutral-800 text-neutral-300 px-3 py-1 rounded-full text-xs sm:text-sm flex items-center gap-1"
                  >
                    <span className="mr-1">{skill.logo}</span> {skill.name}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <div className="flex justify-between mb-2 text-sm">
                  <span>Proficiency</span>
                  <span>{category.proficiency}%</span>
                </div>
                <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden skill-bar" data-index={index}>
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-1500 ease-out" 
                    style={{ 
                      width: animatedSkills.includes(index) ? `${category.proficiency}%` : '0%', 
                      transitionDelay: `${index * 150}ms` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 md:mt-6 flex flex-col items-center w-full">
          <h3 className="text-2xl font-semibold mb-4 text-center">Skills Overview</h3>
          <div className="space-y-3 md:space-y-4 w-full max-w-3xl">
            {skillCategories.map((category, index) => (
              <div key={`overview-${index}`} className="skill-bar" data-index={index + skillCategories.length}>
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <div className="mr-3 text-white">{category.icon}</div>
                    <span className="font-medium">{category.title}</span>
                  </div>
                  <span className="font-medium">{category.proficiency}%</span>
                </div>
                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-1500 ease-out" 
                    style={{ 
                      width: animatedSkills.includes(index + skillCategories.length) ? `${category.proficiency}%` : '0%', 
                      transitionDelay: `${(index + skillCategories.length) * 150}ms` 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;