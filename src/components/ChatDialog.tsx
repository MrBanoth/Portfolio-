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

// Track rate limiting state
const rateLimitInfo = {
  lastRequestTime: 0,
  requestCount: 0,
  MAX_REQUESTS_PER_MINUTE: 10, // Adjust based on your needs
  WINDOW_MS: 60000 // 1 minute
};

const ChatDialog = ({ isOpen, onClose }: ChatDialogProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "👋 Hey there! I'm Sandy, Sandeep's digital sidekick! 🦸‍♂️✨ I'm here to chat about all things Sandeep - his amazing projects, ninja coding skills, or just to say hi! What would you like to know? 😊",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions: [
        { type: 'navigate', target: 'projects', label: '🚀 See Projects' },
        { type: 'navigate', target: 'contact', label: '📱 Contact Info' },
        { type: 'link', target: 'https://github.com/MrBanoth', label: '🌟 GitHub' }
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
    // Check rate limit
    const now = Date.now();
    if (now - rateLimitInfo.lastRequestTime > rateLimitInfo.WINDOW_MS) {
      // Reset counter if window has passed
      rateLimitInfo.lastRequestTime = now;
      rateLimitInfo.requestCount = 0;
    }

    if (rateLimitInfo.requestCount >= rateLimitInfo.MAX_REQUESTS_PER_MINUTE) {
      throw new Error('Rate limit exceeded. Please try again in a moment.');
    }

    rateLimitInfo.requestCount++;

    try {
      // Try to use the Gemini API first
      try {
        const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
        // Use environment variable for API key security
        const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
        
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
                    text: `You are Sandy, Sandeep's super friendly AI assistant on his portfolio site! Your personality: upbeat, enthusiastic, cute, and helpful! Use emojis liberally to add personality. Keep responses short, fun, and engaging (max 3 sentences per paragraph). Use exclamation marks! Sound excited! Be playful but professional!

About Sandeep:
👨‍💻 Full Stack Developer & UI/UX Designer extraordinaire!
🎓 B.Tech student in Computer Science and Engineering at IIIT Manipur
📍 Based in Hyderabad, India
🌍 Fluent in English, Hindi, Telugu
💼 Actively freelancing - available for hire!
📋 Experience: 1+ years building websites and web applications

Tech Skills (talk about these with excitement!):
✨ Frontend: React, Next.js, TypeScript, JavaScript, HTML5, CSS3
🎨 UI Frameworks: TailwindCSS, Material UI, Bootstrap, Styled Components
📲 UI/UX Design: Figma, Adobe XD, responsive design principles
🛠️ Other: Git, GitHub, VS Code, REST APIs, Firebase

Amazing Projects (be enthusiastic about these!):
🚀 Anonymous Chat - AI-powered chat app with privacy features!
   Demo: anon-chat-pi.vercel.app

🍿 PopcornTV - The coolest Netflix clone with trailers and favorites!
   Demo: pop-corn-tv.vercel.app

🎭 Pani.Mr - Beautiful actor portfolio with smooth animations!
   Demo: 1st-client-project.vercel.app

🏢 Shri Lakshmi Sai Insulation - Professional business website!
   Demo: shri-lakshmi-sai-insulation.vercel.app

📱 Contact: sandeepnaikb0@gmail.com | WhatsApp: +91-9390730129

# Common Questions to Handle Well:
- "What services does Sandeep offer?" → Web development, UI/UX design, responsive websites, web apps
- "How much does Sandeep charge?" → Depends on project scope, contact for custom quote
- "How long does a project take?" → Typically 2-4 weeks depending on complexity
- "What is Sandeep's work process?" → Requirements gathering, design, development, testing, deployment
- "What makes Sandeep different?" → Attention to detail, clean code, beautiful design, responsive communication
- "What technologies does Sandeep use?" → React, Next.js, TypeScript, TailwindCSS, etc.
- "Is Sandeep available for remote work?" → Yes, works with clients worldwide
- "What kind of projects does Sandeep like?" → Challenging, creative projects with modern tech

Response style guide:
- For greetings: Be super friendly and welcoming!
- For project questions: Express excitement about Sandeep's work!
- For skill questions: Talk about Sandeep's abilities with admiration!
- For contact questions: Be helpful and encouraging!
- For personal questions: Be charming and positive!
- For pricing/timeline questions: Be helpful but not specific (suggest contacting)
- ALWAYS end with an offer to help more or a friendly sign-off!

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
          const errorData = await response.json();
          // Sanitize error data before logging
          const sanitizedError = {
            status: response.status,
            message: errorData.error?.message || 'API request failed',
            details: errorData.error?.details ? 'Error details available' : undefined
          };
          console.error('API Error:', sanitizedError);
          
          // Return user-friendly error messages
          if (response.status === 429) {
            throw new Error('Too many requests. Please try again later.');
          } else {
            throw new Error('An error occurred while processing your request. Please try again.');
          }
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
        console.error('API error:', apiError instanceof Error ? apiError.message : 'Unknown error');
        // Fall back to predefined responses if API fails
      }
      
      // Use fallback data with cute, friendly responses
      // Match common patterns to provide engaging answers
      const lowerPrompt = prompt.toLowerCase();
      let text = "I'm not totally sure about that 🤔 but I'd love to tell you about Sandeep's amazing projects or coding skills! What would you like to know? ✨";
      const actions: { type: 'navigate' | 'link'; target: string; label: string; }[] = [];
      
      if (lowerPrompt.includes('hi') || lowerPrompt.includes('hello') || lowerPrompt.includes('hey')) {
        text = "Hey there! 👋 So happy you're chatting with me! How can I brighten your day? Want to see Sandeep's cool projects or learn about his awesome skills? 😊";
        actions.push({ type: 'navigate', target: 'projects', label: '🚀 See Projects' });
      } 
      else if (lowerPrompt.includes('project') || lowerPrompt.includes('work') || lowerPrompt.includes('portfolio')) {
        text = "Ooh, great question! 🚀 Sandeep has created some super cool projects! There's PopcornTV (a Netflix-style app), an AI chat app, and beautiful websites for clients. Each one shows off his amazing frontend skills! Want to see them? 👀";
        actions.push({ type: 'navigate', target: 'projects', label: '🚀 See Projects' });
        actions.push({ type: 'link', target: 'https://pop-corn-tv.vercel.app/browse', label: '🎬 PopcornTV' });
      } 
      else if (lowerPrompt.includes('skill') || lowerPrompt.includes('tech') || lowerPrompt.includes('technology')) {
        text = "Sandeep's tech toolkit is pretty impressive! ⚡ He wields React, TypeScript, and Next.js like a pro, creates stunning designs with Figma, and crafts beautiful UIs with TailwindCSS. He's basically a frontend wizard! ✨🧙‍♂️";
        actions.push({ type: 'navigate', target: 'skills', label: '💻 View Skills' });
      } 
      else if (lowerPrompt.includes('contact') || lowerPrompt.includes('hire') || lowerPrompt.includes('email')) {
        text = "Want to reach out to Sandeep? Awesome! 📱 Drop him a line at sandeepnaikb0@gmail.com or send a WhatsApp to +91-9390730129. He's available for exciting projects and would love to hear from you! 💌";
        actions.push({ type: 'navigate', target: 'contact', label: '📱 Contact Info' });
      } 
      else if (lowerPrompt.includes('location') || lowerPrompt.includes('where') || lowerPrompt.includes('based')) {
        text = "Sandeep is currently in sunny Hyderabad, India! 🌞 But don't worry about location - he works with clients worldwide and loves connecting with people from everywhere! 🌎";
      } 
      else if (lowerPrompt.includes('education') || lowerPrompt.includes('study') || lowerPrompt.includes('degree')) {
        text = "Sandeep is earning his B.Tech in Computer Science at IIIT Manipur! 🎓 He's combining his academic knowledge with hands-on projects to become an even more amazing developer! 📚✨";
        actions.push({ type: 'navigate', target: 'about', label: '🎓 About Me' });
      } 
      else if (lowerPrompt.includes('hobby') || lowerPrompt.includes('free time') || lowerPrompt.includes('like to do')) {
        text = "When Sandeep isn't coding amazing websites, he enjoys exploring new tech, designing UI concepts, and staying updated with the latest web development trends! 🚀 He's passionate about creating beautiful digital experiences! ✨";
      } 
      else if (lowerPrompt.includes('thanks') || lowerPrompt.includes('thank you')) {
        text = "You're very welcome! 💖 It's been my pleasure chatting with you! If you need anything else, just ask - I'm here to help! ✨";
      } 
      else if (lowerPrompt.includes('bye') || lowerPrompt.includes('goodbye')) {
        text = "Bye for now! 👋 Thanks for chatting! Hope to see you again soon. Feel free to reach out anytime you want to know more about Sandeep's work! ✨";
      }
      else if (lowerPrompt.includes('popcorn') || lowerPrompt.includes('tv') || lowerPrompt.includes('netflix')) {
        text = "PopcornTV is so cool! 🎬 It's a Netflix-inspired streaming platform built with Next.js and TypeScript. You can browse movies, watch trailers, and save your favorites! Want to check it out? 🍿";
        actions.push({ type: 'link', target: 'https://pop-corn-tv.vercel.app/browse', label: '🍿 View PopcornTV' });
      }
      else if (lowerPrompt.includes('pani') || lowerPrompt.includes('actor') || lowerPrompt.includes('portfolio site')) {
        text = "The actor portfolio for Pani.Mr is one of Sandeep's favorite projects! 🎭 It showcases the actor's work in a beautiful, modern design with smooth animations. Take a peek! ✨";
        actions.push({ type: 'link', target: 'https://1st-client-project.vercel.app/', label: '🎭 Actor Portfolio' });
      }
      else if (lowerPrompt.includes('business') || lowerPrompt.includes('insulation') || lowerPrompt.includes('lakshmi')) {
        text = "The Shri Lakshmi Sai Insulation website is a perfect example of Sandeep's business website skills! 🏢 It's professional, informative, and beautifully designed to showcase their services! 💼";
        actions.push({ type: 'link', target: 'https://https-github-com-mr-naik-011-shri-lakshmi-sai-insulation.vercel.app/', label: '🏢 Business Site' });
      }
      else if (lowerPrompt.includes('github')) {
        text = "Sandeep loves open source and shares his code on GitHub! 🚀 You can explore all his awesome projects there - from websites to apps and experiments! Check it out! 🌟";
        actions.push({ type: 'link', target: 'https://github.com/MrBanoth', label: '💻 GitHub Profile' });
      }
      else if (lowerPrompt.includes('resume') || lowerPrompt.includes('cv')) {
        text = "Sandeep's resume showcases his skills, education, and projects in a clean, professional format! 📝 You can find it in the About section - just a click away! 👌";
        actions.push({ type: 'navigate', target: 'about', label: '📝 View Resume' });
      }
      // New handlers for common visitor questions
      else if (lowerPrompt.includes('service') || lowerPrompt.includes('offer') || lowerPrompt.includes('provide')) {
        text = "Sandeep offers amazing web development services! 🌐 He specializes in building responsive websites, web applications, and stunning UI/UX designs using modern technologies like React and Next.js! What kind of project are you thinking about? 💻";
        actions.push({ type: 'navigate', target: 'contact', label: '💬 Discuss a Project' });
      }
      else if (lowerPrompt.includes('cost') || lowerPrompt.includes('price') || lowerPrompt.includes('charge') || lowerPrompt.includes('fee')) {
        text = "Great question about pricing! 💰 Sandeep's rates depend on your specific project needs and scope. He offers competitive pricing and focuses on delivering high-quality work that brings real value! Reach out for a personalized quote! 📝";
        actions.push({ type: 'navigate', target: 'contact', label: '💸 Get a Quote' });
      }
      else if (lowerPrompt.includes('time') || lowerPrompt.includes('long') || lowerPrompt.includes('timeline') || lowerPrompt.includes('deadline')) {
        text = "Wondering about timelines? ⏰ Most of Sandeep's projects take around 2-4 weeks from start to finish, depending on complexity and scope! He's known for delivering quality work on schedule! 📅 Have a specific deadline in mind? 🙋‍♂️";
        actions.push({ type: 'navigate', target: 'contact', label: '📅 Discuss Timeline' });
      }
      else if (lowerPrompt.includes('process') || lowerPrompt.includes('workflow') || lowerPrompt.includes('approach')) {
        text = "Sandeep follows a thoughtful development process! 📝 First, he'll understand your requirements, then create designs for your approval, followed by development, testing, and finally deployment! He keeps you in the loop every step of the way! 💡";
      }
      else if (lowerPrompt.includes('different') || lowerPrompt.includes('special') || lowerPrompt.includes('unique') || lowerPrompt.includes('stand out')) {
        text = "What makes Sandeep special? ✨ His combination of technical skills AND design expertise means you get both beautiful AND functional websites! Plus, he's super responsive, detail-oriented, and passionate about creating the perfect solution for each client! 👏";
      }
      else if (lowerPrompt.includes('remote') || lowerPrompt.includes('online') || lowerPrompt.includes('distance')) {
        text = "Good news! 🎉 Sandeep works remotely with clients from all around the world! With tools like Zoom, Slack, and email, distance is never an issue. He maintains clear communication throughout your project, no matter where you're located! 🌎";
      }
      else if (lowerPrompt.includes('experience') || lowerPrompt.includes('how long') || lowerPrompt.includes('years')) {
        text = "Sandeep has over 2 years of experience building websites and web applications! 💻 During this time, he's worked on a variety of projects from streaming platforms to business websites, continuously improving his skills along the way! 📈";
        actions.push({ type: 'navigate', target: 'projects', label: '💼 See Experience' });
      }
      else if (lowerPrompt.includes('language') || lowerPrompt.includes('speak')) {
        text = "Sandeep is fluent in English, Hindi, and Telugu! 🌎 This multilingual ability helps him communicate effectively with clients from various backgrounds. Which language are you most comfortable with? 😀";
      }
      else if (lowerPrompt.includes('responsive') || lowerPrompt.includes('mobile') || lowerPrompt.includes('device')) {
        text = "Absolutely! 📱 Sandeep creates fully responsive websites that look amazing on all devices - from desktop to tablets to mobile phones! He believes great user experience shouldn't be limited to just one screen size! 💻✨";
      }
      else if (lowerPrompt.includes('payment') || lowerPrompt.includes('pay')) {
        text = "For payments, Sandeep offers flexible options including bank transfers and digital payments! 💳 He typically works with a 50% upfront deposit and the remaining 50% upon project completion. Need a different arrangement? Just ask! 🙋‍♂️";
        actions.push({ type: 'navigate', target: 'contact', label: '💰 Payment Info' });
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
