import React, { useState, useRef, useEffect } from 'react';
import { X, Send, ExternalLink } from 'lucide-react';

interface ChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
  time: string;
  actions?: {
    type: 'navigate' | 'link';
    target: string;
    label: string;
  }[];
}

const ChatDialog = ({ isOpen, onClose }: ChatDialogProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Hi there! 👋 I'm Sandeep's AI assistant. How can I help you today? You can ask me about Sandeep's skills, projects, or how to get in touch for collaboration.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions: [
        { type: 'navigate', target: 'projects', label: 'View Projects' },
        { type: 'navigate', target: 'contact', label: 'Contact Info' }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      sender: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      const response = await generateAIResponse(inputValue);
      const aiMessage: Message = {
        sender: 'ai',
        text: response.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: response.actions
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMessage: Message = {
        sender: 'ai',
        text: 'Sorry, I encountered an error. Please try again later.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleNavigate = (target: string) => {
    onClose();
    setTimeout(() => {
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  const generateAIResponse = async (prompt: string): Promise<{ text: string; actions?: { type: 'navigate' | 'link'; target: string; label: string; }[] }> => {
    try {
      // Try to use the Gemini API first
      try {
        const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
        const API_KEY = 'AIzaSyA0RqJK0IuhgF-rc4o7botCY4u3N0SnKCc';
        
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are Sandeep's AI assistant on his portfolio website. Respond briefly as if you are Sandeep Naik, a Frontend Developer and UI/UX Designer.
                    
About Sandeep:
- Full Name: Banoth Sandeep Naik
- Profession: Frontend Developer and UI/UX Designer (NOT a Full Stack Developer)
- Education: B.Tech student in Computer Science and Engineering at IIIT Manipur
- Location: Currently based in Hyderabad, India
- Languages: Hindi, Telugu, and English
- Status: Available for freelance work

Technical Skills:
- Frontend: React, TypeScript, Next.js, JavaScript, HTML5, CSS3
- UI Frameworks: TailwindCSS, Material UI, Bootstrap
- UI/UX Design: Figma, Adobe XD
- Version Control: Git, GitHub

Projects (with detailed information):
1. Anonymous Chatting app
   - Description: A frontend chat application with Sara AI assistant integration
   - Technologies: React, AI Integration, Tailwind CSS
   - Live Demo: https://anon-chat-pi.vercel.app/
   - Code: https://github.com/MrBanoth/Anon-Chat

2. PopcornTV
   - Description: A Netflix-inspired streaming platform with movie browsing, trailers, and favorites list
   - Technologies: Next.js, TypeScript, Tailwind CSS, TMDB API
   - Live Demo: https://pop-corn-tv.vercel.app/browse
   - Code: https://github.com/MrBanoth/Netflix-Clone

3. Pani.Mr - Actor Portfolio
   - Description: A portfolio website for an actor showcasing their work and photos
   - Technologies: React, Modern CSS
   - Live Demo: https://1st-client-project.vercel.app/
   - Code: https://github.com/MrBanoth/1st-client-project

4. Shri Lakshmi Sai Insulation - Business Website
   - Description: A business website showcasing services, portfolio, and contact information
   - Technologies: React, Modern CSS
   - Live Demo: https://https-github-com-mr-naik-011-shri-lakshmi-sai-insulation.vercel.app/
   - Code: https://github.com/MrBanoth/shri-lakshmi-sai-insulation

Contact: sandeepnaikb0@gmail.com, WhatsApp: +91-9390730129

User question: ${prompt}`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 200,
            }
          })
        });
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0].text) {
          const generatedText = data.candidates[0].content.parts[0].text;
          
          // Process response to determine if actions should be added
          const actions: { type: 'navigate' | 'link'; target: string; label: string; }[] = [];
          const lowerPrompt = prompt.toLowerCase();
          const lowerResponse = generatedText.toLowerCase();
          
          // Check for project-related queries
          if (
            lowerPrompt.includes('project') || 
            lowerPrompt.includes('portfolio') || 
            lowerPrompt.includes('work') ||
            lowerResponse.includes('project') ||
            lowerResponse.includes('portfolio')
          ) {
            actions.push({ type: 'navigate', target: 'projects', label: 'View Projects' });
          }
          
          // Check for specific projects
          if (
            lowerPrompt.includes('anonymous') || 
            lowerPrompt.includes('chat') ||
            lowerResponse.includes('anonymous chat')
          ) {
            actions.push({ type: 'link', target: 'https://anon-chat-pi.vercel.app/', label: 'View Anonymous Chat' });
          }
          
          if (
            lowerPrompt.includes('popcorn') || 
            lowerPrompt.includes('netflix') ||
            lowerPrompt.includes('tv') ||
            lowerResponse.includes('popcorntv') ||
            lowerResponse.includes('netflix')
          ) {
            actions.push({ type: 'link', target: 'https://pop-corn-tv.vercel.app/browse', label: 'View PopcornTV' });
          }
          
          if (
            lowerPrompt.includes('pani') || 
            lowerPrompt.includes('actor') ||
            lowerResponse.includes('pani') ||
            lowerResponse.includes('actor portfolio')
          ) {
            actions.push({ type: 'link', target: 'https://1st-client-project.vercel.app/', label: 'View Actor Portfolio' });
          }
          
          if (
            lowerPrompt.includes('business') || 
            lowerPrompt.includes('insulation') ||
            lowerPrompt.includes('lakshmi') ||
            lowerPrompt.includes('sai') ||
            lowerResponse.includes('insulation') ||
            lowerResponse.includes('business')
          ) {
            actions.push({ type: 'link', target: 'https://https-github-com-mr-naik-011-shri-lakshmi-sai-insulation.vercel.app/', label: 'View Business Site' });
          }
          
          // Check for contact-related queries
          if (
            lowerPrompt.includes('contact') || 
            lowerPrompt.includes('email') || 
            lowerPrompt.includes('reach') ||
            lowerPrompt.includes('whatsapp') ||
            lowerResponse.includes('email') ||
            lowerResponse.includes('contact') ||
            lowerResponse.includes('reach out')
          ) {
            actions.push({ type: 'navigate', target: 'contact', label: 'Contact Info' });
          }
          
          // Check for about/skills-related queries
          if (
            lowerPrompt.includes('about') || 
            lowerPrompt.includes('skill') || 
            lowerPrompt.includes('experience') || 
            lowerPrompt.includes('education') ||
            lowerPrompt.includes('background') ||
            lowerResponse.includes('skills') ||
            lowerResponse.includes('about')
          ) {
            actions.push({ type: 'navigate', target: 'about', label: 'About Me' });
          }
          
          return {
            text: generatedText,
            actions: actions.length > 0 ? actions : undefined
          };
        }
      } catch (apiError) {
        console.error('API error:', apiError);
        // Fall back to predefined responses if API fails
      }
      
      // Fallback responses if API call fails
      const lowerPrompt = prompt.toLowerCase();
      let text = '';
      const actions: { type: 'navigate' | 'link'; target: string; label: string; }[] = [];
      
      // Handle common queries with predefined responses
      if (lowerPrompt.includes('project') || lowerPrompt.includes('work') || lowerPrompt.includes('portfolio')) {
        text = "I have several projects in my portfolio including an Anonymous Chatting app, PopcornTV streaming platform, Pani.Mr actor portfolio, and Shri Lakshmi Sai Insulation business website. You can check them out in my Projects section or click the button below to navigate there.";
        actions.push({ type: 'navigate', target: 'projects', label: 'View Projects' });
      } 
      else if (lowerPrompt.includes('contact') || lowerPrompt.includes('email') || lowerPrompt.includes('whatsapp') || lowerPrompt.includes('reach')) {
        text = "You can reach me via email at sandeepnaikb0@gmail.com or WhatsApp at +91-9390730129. Feel free to use the Contact section of my portfolio or click the button below.";
        actions.push({ type: 'navigate', target: 'contact', label: 'Contact Info' });
      }
      else if (lowerPrompt.includes('about') || lowerPrompt.includes('skill') || lowerPrompt.includes('experience') || lowerPrompt.includes('education')) {
        text = "I'm a Frontend Developer and UI/UX Designer with skills in React, TypeScript, Next.js, TailwindCSS, and various UI frameworks. I'm currently a B.Tech student in Computer Science at IIIT Manipur, based in Hyderabad. Click below to learn more about me.";
        actions.push({ type: 'navigate', target: 'about', label: 'About Me' });
      }
      else if (lowerPrompt.includes('anonymous') || lowerPrompt.includes('chat')) {
        text = "My Anonymous Chatting app is built with React and includes AI assistant integration. You can check it out live or view the code on GitHub using the button below.";
        actions.push({ type: 'link', target: 'https://anon-chat-pi.vercel.app/', label: 'View Anonymous Chat' });
      }
      else if (lowerPrompt.includes('popcorn') || lowerPrompt.includes('tv') || lowerPrompt.includes('netflix')) {
        text = "PopcornTV is a Netflix-inspired streaming platform built with Next.js and TypeScript. It allows users to browse movies, watch trailers, and save favorites to a personal list. Check it out using the button below.";
        actions.push({ type: 'link', target: 'https://pop-corn-tv.vercel.app/browse', label: 'View PopcornTV' });
      }
      else if (lowerPrompt.includes('pani') || lowerPrompt.includes('actor')) {
        text = "The Pani.Mr portfolio is an actor showcase website I built using React and modern CSS. You can view it live using the button below.";
        actions.push({ type: 'link', target: 'https://1st-client-project.vercel.app/', label: 'View Actor Portfolio' });
      }
      else if (lowerPrompt.includes('lakshmi') || lowerPrompt.includes('insulation') || lowerPrompt.includes('business') || lowerPrompt.includes('sai')) {
        text = "Shri Lakshmi Sai Insulation is a business website I developed featuring services, portfolio, and contact information for an insulation company. Check it out using the button below.";
        actions.push({ type: 'link', target: 'https://https-github-com-mr-naik-011-shri-lakshmi-sai-insulation.vercel.app/', label: 'View Business Site' });
      }
      else if (lowerPrompt.includes('github') || lowerPrompt.includes('code')) {
        text = "You can check out my projects on GitHub. I have repositories for all my major projects including Anonymous Chat, PopcornTV, and more.";
        actions.push({ type: 'link', target: 'https://github.com/MrBanoth', label: 'Visit GitHub' });
      }
      else if (lowerPrompt.includes('linkedin') || lowerPrompt.includes('professional')) {
        text = "You can view my professional profile on LinkedIn to see my experience, skills and education background.";
        actions.push({ type: 'link', target: 'https://www.linkedin.com/in/sandeep-naik-1316712a9/', label: 'View LinkedIn' });
      }
      else if (lowerPrompt.includes('language') || lowerPrompt.includes('speak')) {
        text = "I speak Hindi, Telugu, and English fluently.";
      }
      else if (lowerPrompt.includes('freelance') || lowerPrompt.includes('hire') || lowerPrompt.includes('available')) {
        text = "Yes, I'm currently available for freelance work! I'd be happy to discuss your project requirements. Please reach out via email at sandeepnaikb0@gmail.com or WhatsApp at +91-9390730129.";
        actions.push({ type: 'navigate', target: 'contact', label: 'Contact Me' });
      }
      else if (lowerPrompt.includes('location') || lowerPrompt.includes('based') || lowerPrompt.includes('where')) {
        text = "I'm currently based in Hyderabad, India.";
      }
      else {
        // For any other query, provide a general response
        text = `Thanks for your message about "${prompt}". I'm Banoth Sandeep Naik, a Frontend Developer and UI/UX Designer. I specialize in creating modern web applications using React, Next.js, and TypeScript. Feel free to explore my projects or contact me at sandeepnaikb0@gmail.com if you'd like to discuss a potential collaboration.`;
        
        // Add general navigation options
        actions.push({ type: 'navigate', target: 'projects', label: 'View Projects' });
        actions.push({ type: 'navigate', target: 'contact', label: 'Contact Me' });
      }
      
      return {
        text,
        actions: actions.length > 0 ? actions : undefined
      };
    } catch (error) {
      console.error('Error in generateAIResponse:', error);
      // Return a fallback response if all else fails
      return {
        text: "I'm Sandeep's AI assistant. I seem to be having trouble connecting right now. You can email Sandeep directly at sandeepnaikb0@gmail.com or explore the portfolio using the buttons below.",
        actions: [
          { type: 'navigate', target: 'projects', label: 'View Projects' },
          { type: 'navigate', target: 'contact', label: 'Contact Me' }
        ]
      };
    }
  };

  // Animation classes
  const dialogClasses = `
    fixed inset-0 z-50 flex items-center justify-center p-4 
    ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
    transition-opacity duration-300 ease-in-out
  `;
  
  const overlayClasses = `
    fixed inset-0 bg-black/60 backdrop-blur-sm 
    ${isOpen ? 'opacity-100' : 'opacity-0'}
    transition-opacity duration-300
  `;
  
  const contentClasses = `
    bg-black/90 border border-neutral-800 rounded-2xl w-full max-w-lg max-h-[80vh] flex flex-col overflow-hidden
    ${isOpen ? 'scale-100' : 'scale-95'}
    transition-transform duration-300
  `;

  return (
    <div className={dialogClasses} aria-modal="true" role="dialog">
      <div className={overlayClasses} onClick={onClose} />
      
      <div className={contentClasses}>
        {/* Header */}
        <div className="border-b border-neutral-800 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Chat with Sandeep's AI</h2>
          <button 
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors rounded-full p-1 hover:bg-neutral-800"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-xl p-3 ${
                  message.sender === 'user' 
                    ? 'bg-white text-black ml-auto' 
                    : 'bg-neutral-800 text-white'
                }`}
              >
                {message.sender === 'ai' && (
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                      <img src="/img.jpg" alt="Sandeep" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-xs font-medium text-white">Sandeep AI</div>
                  </div>
                )}
                <div className="text-sm">{message.text}</div>
                {message.actions && message.actions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.actions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        onClick={() => {
                          if (action.type === 'navigate') {
                            handleNavigate(action.target);
                          } else if (action.type === 'link') {
                            window.open(action.target, '_blank');
                          }
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-white text-black text-xs font-medium rounded-full hover:bg-neutral-100 transition-colors"
                      >
                        {action.label}
                        {action.type === 'link' && <ExternalLink size={12} />}
                      </button>
                    ))}
                  </div>
                )}
                <div className={`text-xs mt-1 ${
                  message.sender === 'user' 
                    ? 'text-neutral-600' 
                    : 'text-neutral-400'
                }`}>
                  {message.time}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-neutral-800 text-white rounded-xl p-3 flex items-center space-x-2">
                <div className="relative w-8 h-8 overflow-hidden rounded-full border-2 border-white animate-pulse">
                  <img 
                    src="/img.jpg" 
                    alt="Sandeep profile" 
                    className="w-full h-full object-cover animate-spin"
                    style={{ animationDuration: '3s' }}
                  />
                </div>
                <span className="text-xs text-neutral-400">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Form */}
        <form onSubmit={handleSubmit} className="border-t border-neutral-800 p-4">
          <div className="flex items-center bg-neutral-800 rounded-full overflow-hidden">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-transparent text-white px-4 py-2 focus:outline-none"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="text-white p-2 focus:outline-none disabled:opacity-50"
              disabled={!inputValue.trim() || isLoading}
            >
              <Send size={20} className="text-white" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatDialog;
