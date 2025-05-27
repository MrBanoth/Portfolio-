import React, { useEffect, useState } from 'react';

interface SkillCardProps {
  title: string;
  skills: string[];
  proficiency: number;
  icon?: React.ReactNode;
}

const SkillCard: React.FC<SkillCardProps> = ({ title, skills, proficiency, icon }) => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="bg-neutral-900/70 border border-neutral-800 rounded-xl p-6 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg hover:shadow-black/20 backdrop-blur-sm">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            {icon && <div className="mr-2 text-neutral-400">{icon}</div>}
            <h3 className="text-xl font-semibold text-white">{title}</h3>
          </div>
          <span className="text-sm font-medium bg-white/10 px-2 py-1 rounded-md text-white">{proficiency}%</span>
        </div>
        <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-1500 ease-out" 
            style={{ width: loaded ? `${proficiency}%` : '0%', transitionDelay: '100ms' }}
          ></div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-neutral-800 text-neutral-300 px-3 py-1 rounded-full text-sm flex items-center gap-1"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillCard;