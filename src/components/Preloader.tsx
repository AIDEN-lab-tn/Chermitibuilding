import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import logo from '/public/logo.png';

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 800);
          return 100;
        }
        return prev + 1.5;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden ${
      theme === 'dark' 
        ? 'gradient-bg-dark' 
        : 'gradient-bg-light'
    }`}>
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full animate-pulse ${
              theme === 'dark' ? 'bg-blue-400/20' : 'bg-blue-600/30'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Subtle grid pattern overlay */}
      <div 
        className={`absolute inset-0 ${theme === 'dark' ? 'opacity-5' : 'opacity-10'}`}
        style={{
          backgroundImage: `
            linear-gradient(${theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.2)'} 1px, transparent 1px),
            linear-gradient(90deg, ${theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.2)'} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Main content */}
      <div className="relative text-center z-10">
        {/* Logo with elegant glow */}
        <div className="relative mb-12">
          <div className={`absolute inset-0 blur-3xl rounded-full scale-150 animate-pulse ${
            theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-400/30'
          }`} />
          <img 
            src={logo} 
            alt="Chermiti Logo" 
            className="relative h-24 w-auto mx-auto object-contain bg-transparent border-none outline-none shadow-none filter drop-shadow-2xl"
            style={{
              filter: `drop-shadow(0 0 30px ${theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.5)'})`
            }}
          />
        </div>

        {/* Brand name with elegant typography */}
        <div className="mb-8">
          <h1 className={`text-4xl md:text-5xl font-light tracking-wider mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            CHERMITI
          </h1>
          <div className={`w-32 h-px mx-auto mb-3 ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-transparent via-blue-400 to-transparent' 
              : 'bg-gradient-to-r from-transparent via-blue-600 to-transparent'
          }`} />
          <p className={`text-sm md:text-base font-light tracking-widest uppercase ${
            theme === 'dark' ? 'text-blue-200/80' : 'text-blue-700/80'
          }`}>
            Building Excellence
          </p>
        </div>

        {/* Loading text with typewriter effect */}
        <div className="mb-10">
          <p className={`text-lg font-light tracking-wide ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Preparing your architectural experience
            <span className="inline-block animate-pulse ml-1">
              {progress < 33 ? '.' : progress < 66 ? '..' : '...'}
            </span>
          </p>
        </div>

        {/* Elegant progress bar */}
        <div className="w-80 mx-auto">
          {/* Progress container */}
          <div className="relative">
            {/* Background track */}
            <div className={`w-full h-1 rounded-full overflow-hidden backdrop-blur-sm ${
              theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'
            }`}>
              {/* Progress fill with gradient */}
              <div 
                className={`h-full rounded-full transition-all duration-300 ease-out relative ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400' 
                    : 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700'
                }`}
                style={{ width: `${progress}%` }}
              >
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              </div>
            </div>
            
            {/* Progress glow effect */}
            <div 
              className={`absolute top-0 h-1 rounded-full blur-sm opacity-60 transition-all duration-300 ease-out ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400' 
                  : 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress percentage */}
          <div className="flex justify-between items-center mt-4">
            <span className={`text-sm font-light ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>Loading</span>
            <span className={`text-sm font-medium tabular-nums ${
              theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
            }`}>
              {progress.toFixed(0)}%
            </span>
          </div>
        </div>

        {/* Subtle loading stages */}
        <div className="mt-8">
          <p className={`text-xs font-light tracking-wide ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
          }`}>
            {progress < 25 && "Initializing 3D environment..."}
            {progress >= 25 && progress < 50 && "Loading building models..."}
            {progress >= 50 && progress < 75 && "Preparing interactive elements..."}
            {progress >= 75 && progress < 95 && "Finalizing experience..."}
            {progress >= 95 && "Ready to explore!"}
          </p>
        </div>
      </div>

      {/* Completion animation overlay */}
      {progress >= 100 && (
        <div className={`absolute inset-0 transition-opacity duration-800 animate-pulse ${
          theme === 'dark' 
            ? 'gradient-bg-dark' 
            : 'gradient-bg-light'
        } opacity-0`} />
      )}
    </div>
  );
};