import { useState } from 'react';
import { Sun, Moon, ArrowRight, Building2 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import logo from '/public/logo.png';
import sliderlogo from '/public/sliderlogo.png';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const { theme, toggleTheme } = useTheme();
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    setIsStarting(true);
    setTimeout(() => {
      onStart();
    }, 800);
  };

  return (
    <div className={`fixed inset-0 z-50 transition-all duration-1000 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-black' 
        : 'bg-gradient-to-br from-blue-50 via-white to-blue-100'
    } flex items-center justify-center overflow-hidden`}>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full animate-pulse ${
              theme === 'dark' ? 'bg-blue-400/20' : 'bg-blue-500/20'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Subtle grid pattern */}
        <div 
          className={`absolute inset-0 ${theme === 'dark' ? 'opacity-5' : 'opacity-10'}`}
          style={{
            backgroundImage: `
              linear-gradient(${theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.2)'} 1px, transparent 1px),
              linear-gradient(90deg, ${theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.2)'} 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Main content */}
      <div className={`relative text-center z-10 max-w-2xl mx-auto px-6 transition-all duration-1000 ${
        isStarting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}>
        
        {/* Logo section */}
        <div className="relative mb-12">
          <div className={`absolute inset-0 blur-3xl rounded-full scale-150 animate-pulse ${
            theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-400/30'
          }`} />
          <img 
            src={sliderlogo} 
            alt="Chermiti Building Logo" 
            className="relative h-32 w-auto mx-auto object-contain bg-transparent border-none outline-none shadow-none filter drop-shadow-2xl"
            style={{
              filter: `drop-shadow(0 0 40px ${theme === 'dark' ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.6)'})`
            }}
          />
        </div>

        {/* Welcome text */}
        <div className="mb-12">
          <h1 className={`text-5xl md:text-6xl font-light mb-4 tracking-wider ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Welcome to
          </h1>
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 tracking-wide ${
            theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
          }`}>
            CHERMITI BUILDING
          </h2>
          
          {/* Elegant divider */}
          <div className={`w-48 h-px mx-auto mb-6 ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-transparent via-blue-400 to-transparent' 
              : 'bg-gradient-to-r from-transparent via-blue-500 to-transparent'
          }`} />
          
          <p className={`text-lg md:text-xl font-light leading-relaxed ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Experience luxury living redefined in the heart of the metropolitan district.
            <br />
            Your architectural journey begins here.
          </p>
        </div>

        {/* Theme selection notice */}
        <div className={`mb-10 p-6 rounded-2xl backdrop-blur-md border ${
          theme === 'dark' 
            ? 'bg-white/5 border-blue-400/20' 
            : 'bg-white/60 border-blue-300/30'
        }`}>
          <div className="flex items-center justify-center mb-4">
            <Building2 className={`h-6 w-6 mr-3 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`} />
            <span className={`text-lg font-medium ${
              theme === 'dark' ? 'text-blue-300' : 'text-blue-700'
            }`}>
              Choose Your Experience
            </span>
          </div>
          
          <p className={`text-sm mb-6 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            For the best viewing experience, please select your preferred theme
          </p>

          {/* Theme toggle */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                theme === 'light'
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'bg-gray-200/20 text-gray-400 hover:bg-gray-200/30'
              }`}
            >
              <Sun className="h-5 w-5" />
              <span className="font-medium">Light Mode</span>
            </button>
            
            <div className={`w-px h-8 ${
              theme === 'dark' ? 'bg-gray-600' : 'bg-gray-400'
            }`} />
            
            <button
              onClick={toggleTheme}
              className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-gray-800/20 text-gray-600 hover:bg-gray-800/30'
              }`}
            >
              <Moon className="h-5 w-5" />
              <span className="font-medium">Dark Mode</span>
            </button>
          </div>
        </div>

        {/* Start button */}
        <div className="relative">
          <button
            onClick={handleStart}
            disabled={isStarting}
            className={`group relative px-12 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-2xl hover:shadow-blue-500/25'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-2xl hover:shadow-blue-400/25'
            } ${isStarting ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-xl'}`}
          >
            <span className="flex items-center space-x-3">
              <span>{isStarting ? 'Starting Experience...' : 'Begin Your Journey'}</span>
              <ArrowRight className={`h-5 w-5 transition-transform duration-300 ${
                isStarting ? 'translate-x-1' : 'group-hover:translate-x-1'
              }`} />
            </span>
            
            {/* Button glow effect */}
            <div className={`absolute inset-0 rounded-2xl blur-xl opacity-30 transition-opacity duration-300 ${
              theme === 'dark' ? 'bg-blue-500' : 'bg-blue-400'
            } ${isStarting ? 'opacity-50' : 'group-hover:opacity-50'}`} />
          </button>
        </div>

        {/* Subtle footer text */}
        <p className={`mt-8 text-xs tracking-wide ${
          theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
        }`}>
          Powered by cutting-edge 3D technology
        </p>
      </div>

      {/* Corner decorations */}
      <div className={`absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 ${
        theme === 'dark' ? 'border-blue-400/30' : 'border-blue-500/40'
      }`} />
      <div className={`absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 ${
        theme === 'dark' ? 'border-blue-400/30' : 'border-blue-500/40'
      }`} />
      <div className={`absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 ${
        theme === 'dark' ? 'border-blue-400/30' : 'border-blue-500/40'
      }`} />
      <div className={`absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 ${
        theme === 'dark' ? 'border-blue-400/30' : 'border-blue-500/40'
      }`} />

      {/* Exit animation overlay */}
      {isStarting && (
        <div className={`absolute inset-0 transition-opacity duration-800 ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-black' 
            : 'bg-gradient-to-br from-blue-50 via-white to-blue-100'
        } opacity-0 animate-pulse`} />
      )}
    </div>
  );
};