import React, { useEffect, useState } from 'react';

interface TypedTextProps {
  text: string;
  speed?: number;
  className?: string;
  pauseBeforeDelete?: number;
  pauseBeforeType?: number;
}

const TypedText: React.FC<TypedTextProps> = ({ 
  text, 
  speed = 100, 
  className = '', 
  pauseBeforeDelete = 2000,
  pauseBeforeType = 500 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isTyping) {
      if (displayText.length < text.length) {
        // Still typing
        timeout = setTimeout(() => {
          setDisplayText(text.substring(0, displayText.length + 1));
        }, speed);
      } else {
        // Typing complete, pause before deleting
        setIsTyping(false);
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseBeforeDelete);
      }
    } else if (isDeleting) {
      if (displayText.length > 0) {
        // Still deleting
        timeout = setTimeout(() => {
          setDisplayText(text.substring(0, displayText.length - 1));
        }, speed / 1.5); // Delete a bit faster than typing
      } else {
        // Deleting complete, pause before typing again
        setIsDeleting(false);
        timeout = setTimeout(() => {
          setIsTyping(true);
        }, pauseBeforeType);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, isDeleting, text, speed, pauseBeforeDelete, pauseBeforeType]);

  return (
    <span className={`${className} inline-flex relative`}>
      {displayText}
      <span className="w-[2px] h-[1em] bg-white ml-[2px] animate-blink"></span>
    </span>
  );
};

export default TypedText;
