import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { ContactDialog } from '@/components/ContactDialog';
import { useNavigate } from 'react-router-dom';
import logo from '/public/logo.png';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-blue-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="Chermiti Logo" className="h-10 w-auto md:h-12 md:w-auto object-contain p-0 bg-transparent border-none outline-none shadow-none" />
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <button 
              onClick={() => smoothScroll('hero')}
              className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700/50"
            >
              Home
            </button>
            <button 
              onClick={() => smoothScroll('entrance-view')}
              className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700/50"
            >
              Entrance
            </button>
            <button 
              onClick={() => smoothScroll('residential-floors')}
              className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700/50"
            >
              Residences
            </button>
            <button 
              onClick={() => smoothScroll('penthouse-clouds')}
              className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700/50"
            >
              Penthouse
            </button>
            
            <button
              onClick={toggleTheme}
              className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-300 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700/50"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <ContactDialog>
              <button className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium">
                Contact
              </button>
            </ContactDialog>

            <button
              onClick={handleLoginClick}
              className="bg-blue-500 dark:bg-blue-800 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors mr-2"
            >
              Login
            </button>
          </div>

          <button 
            className="md:hidden text-gray-800 dark:text-gray-100 p-2 rounded-lg hover:bg-white/10 dark:hover:bg-gray-700/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 space-y-2 pb-4">
            <button 
              onClick={() => smoothScroll('hero')}
              className="block w-full text-left text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-300 transition-colors px-4 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700/50"
            >
              Home
            </button>
            <button 
              onClick={() => smoothScroll('entrance-view')}
              className="block w-full text-left text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-300 transition-colors px-4 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700/50"
            >
              Entrance
            </button>
            <button 
              onClick={() => smoothScroll('residential-floors')}
              className="block w-full text-left text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-300 transition-colors px-4 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700/50"
            >
              Residences
            </button>
            <button 
              onClick={() => smoothScroll('penthouse-clouds')}
              className="block w-full text-left text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-300 transition-colors px-4 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700/50"
            >
              Penthouse
            </button>
            <button 
              onClick={() => smoothScroll('contact')}
              className="block w-full text-left bg-blue-600 dark:bg-blue-700 text-white px-4 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium"
            >
              Contact
            </button>
            
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-gray-800 dark:text-gray-100">Dark Mode</span>
              <button
                onClick={toggleTheme}
                className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-300 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700/50"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
            
            <ContactDialog>
              <button className="block w-full text-left bg-blue-600 dark:bg-blue-700 text-white px-4 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium">
                Contact
              </button>
            </ContactDialog>

            <button
              onClick={handleLoginClick}
              className="block w-full text-left bg-blue-500 dark:bg-blue-800 text-white px-4 py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};