import React from 'react';
import ProjectCard from '../components/ProjectCard';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Anonymous Chatting',
      description: 'A frontend chat application with Sara AI assistant integration, allowing real-time anonymous conversations.',
      image: '/anonymous.png',
      tags: ['React', 'AI Integration', 'Tailwind CSS'],
      demoLink: 'https://anon-chat-pi.vercel.app/',
      codeLink: 'https://github.com/MrBanoth/Anon-Chat',
    },
    {
      title: 'PopcornTV',
      description: 'A Netflix-inspired streaming platform built with Next.js and TypeScript. Browse movies from different categories, watch trailers, and save favorites to your personal list.',
      image: '/popcorntv.png',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      demoLink: 'https://pop-corn-tv.vercel.app/browse',
      codeLink: 'https://github.com/MrBanoth/PopCorn-Tv',
    },
    {
      title: 'Pani.Mr',
      description: 'Actor portfolio website showcasing talent, performances, and professional acting work.',
      image: '/pani.png',
      tags: ['React', 'JavaScript', 'CSS'],
      demoLink: 'https://1st-client-project.vercel.app/',
      codeLink: 'https://github.com/MrBanoth/FoodBite',
    },
    {
      title: 'Shri Lakshmi Sai Insulation',
      description: 'A business website for an insulation company featuring services, portfolio, and contact information.',
      image: '/Shri Lakshmi Sai Insulation.png',
      tags: ['HTML', 'CSS', 'JavaScript'],
      demoLink: 'https://https-github-com-mr-naik-011-shri-lakshmi-sai-insulation.vercel.app/',
      codeLink: 'https://github.com/MrBanoth/https-github.com-MrNaik-011-Shri-Lakshmi-Sai-Insulation',
    },
  ];

  return (
    <section className="bg-black pt-15 pb-0 md:pt-20 md:pb-0 lg:pt-24 lg:pb-0 border-t border-neutral-900" id="projects">
      <div className="container mx-auto px-4 pt-0 pb-2 md:px-6 md:pt-0 md:pb-2 lg:px-8 lg:pt-0 lg:pb-4">
        <div className="max-w-3xl mb-4 md:mb-6">
          <h2 className="text-4xl font-bold mb-2 md:mb-4">Projects</h2>
          <p className="text-neutral-300 text-lg leading-relaxed">
            Here are some of my featured projects. Each one was built with attention to detail and focus on user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            image={project.image}
            tags={project.tags}
            demoLink={project.demoLink}
            codeLink={project.codeLink}
          />
        ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-neutral-400 mb-6">Want to see more of my work?</p>
          <a
            href="https://github.com/MrBanoth"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-neutral-900 border border-neutral-700 px-6 py-3 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;