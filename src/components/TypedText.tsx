import React, { useEffect, useState } from 'react';

interface TypedTextProps {
  text: string;
  speed?: number;
  className?: string;
  pauseBeforeDelete?: number;
  pauseBeforeType?: number;
  deleteSpeed?: number;
}

const TypedText: React.FC<TypedTextProps> = ({ 
  text, 
  speed = 80, // Even slower typing speed for better readability
  className = '', 
  pauseBeforeDelete = 4000, // Longer pause before deleting
  pauseBeforeType = 1500, // Longer pause before restarting
  deleteSpeed = 30
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // Start with false to add initial delay
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = Array.isArray(text) ? text : [text];
  
  // Add initial delay before starting animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
    }, 1500); // 1.5 second initial delay before starting
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isTyping && !isDeleting) return;
    
    let timeout: ReturnType<typeof setTimeout>;
    const currentText = texts[currentTextIndex];
    // Use slower speed for typing, slightly faster for deleting
    const currentSpeed = isDeleting ? deleteSpeed : speed;

    if (isTyping || isDeleting) {
      timeout = setTimeout(() => {
        if (isTyping) {
          if (displayText.length < currentText.length) {
            // Typing out the text
            setDisplayText(currentText.substring(0, displayText.length + 1));
          } else {
            // Finished typing, prepare to delete
            setIsTyping(false);
            timeout = setTimeout(() => {
              setIsDeleting(true);
            }, pauseBeforeDelete);
          }
        } else if (isDeleting) {
          if (displayText.length > 0) {
            // Deleting the text
            setDisplayText(displayText.substring(0, displayText.length - 1));
          } else {
            // Finished deleting, prepare to type next text
            setIsDeleting(false);
            const nextIndex = (currentTextIndex + 1) % texts.length;
            setCurrentTextIndex(nextIndex);
            
            // Start typing next text after a short delay
            timeout = setTimeout(() => {
              setIsTyping(true);
            }, nextIndex === 0 ? pauseBeforeType : 300);
          }
        }
      }, currentSpeed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, isDeleting, texts, currentTextIndex, speed, pauseBeforeDelete, pauseBeforeType]);

  return (
    <span className={`${className} inline-flex relative`}>
      {displayText}
      <span className={`w-[2px] h-[1em] bg-white ml-[2px] ${(isTyping || isDeleting) ? 'animate-blink' : 'opacity-0'}`}></span>
    </span>
  );
};

export default TypedText;
