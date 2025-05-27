import { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time and resources being loaded
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-t-white border-r-white border-b-transparent border-l-transparent animate-spin"></div>
          <div className="absolute inset-2 rounded-full overflow-hidden">
            <img 
              src="/img.jpg" 
              alt="Sandeep profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="text-white text-xl font-semibold">Loading Portfolio...</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
