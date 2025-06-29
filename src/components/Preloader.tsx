import { useState, useEffect } from 'react';
import logo from '/public/logo.png';

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

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
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-pulse"
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
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Main content */}
      <div className="relative text-center z-10">
        {/* Logo with elegant glow */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
          <img 
            src={logo} 
            alt="Chermiti Logo" 
            className="relative h-24 w-auto mx-auto object-contain bg-transparent border-none outline-none shadow-none filter drop-shadow-2xl"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.3))'
            }}
          />
        </div>

        {/* Brand name with elegant typography */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-light text-white tracking-wider mb-2">
            CHERMITI
          </h1>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-3" />
          <p className="text-blue-200/80 text-sm md:text-base font-light tracking-widest uppercase">
            Building Excellence
          </p>
        </div>

        {/* Loading text with typewriter effect */}
        <div className="mb-10">
          <p className="text-gray-300 text-lg font-light tracking-wide">
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
            <div className="w-full h-1 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
              {/* Progress fill with gradient */}
              <div 
                className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              </div>
            </div>
            
            {/* Progress glow effect */}
            <div 
              className="absolute top-0 h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 rounded-full blur-sm opacity-60 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress percentage */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-gray-400 text-sm font-light">Loading</span>
            <span className="text-blue-300 text-sm font-medium tabular-nums">
              {progress.toFixed(0)}%
            </span>
          </div>
        </div>

        {/* Subtle loading stages */}
        <div className="mt-8">
          <p className="text-gray-500 text-xs font-light tracking-wide">
            {progress < 25 && "Initializing 3D environment..."}
            {progress >= 25 && progress < 50 && "Loading building models..."}
            {progress >= 50 && progress < 75 && "Preparing interactive elements..."}
            {progress >= 75 && progress < 95 && "Finalizing experience..."}
            {progress >= 95 && "Ready to explore!"}
          </p>
        </div>
      </div>

      {/* Elegant corner decorations */}
      <div className="absolute top-8 left-8">
        <div className="w-16 h-16 border-l-2 border-t-2 border-blue-400/30" />
      </div>
      <div className="absolute top-8 right-8">
        <div className="w-16 h-16 border-r-2 border-t-2 border-blue-400/30" />
      </div>
      <div className="absolute bottom-8 left-8">
        <div className="w-16 h-16 border-l-2 border-b-2 border-blue-400/30" />
      </div>
      <div className="absolute bottom-8 right-8">
        <div className="w-16 h-16 border-r-2 border-b-2 border-blue-400/30" />
      </div>

      {/* Completion animation overlay */}
      {progress >= 100 && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black animate-pulse" />
      )}
    </div>
  );
};