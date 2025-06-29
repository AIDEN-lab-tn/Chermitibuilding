import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme;
    return saved || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    // Add smooth transition class to document
    document.documentElement.classList.add('theme-transition');
    
    // Apply theme with smooth transition and fade effect for BOTH modes
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.remove('light-mode-fade');
      document.body.classList.add('dark-mode-fade');
      
      // Add content animation to all major content containers
      const contentElements = document.querySelectorAll('.card, .glass-effect, main, section, article');
      contentElements.forEach(el => {
        el.classList.remove('content-fade-in');
        // Force reflow
        el.offsetHeight;
        el.classList.add('content-fade-in');
      });
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark-mode-fade');
      document.body.classList.add('light-mode-fade');
      
      // Add content animation to all major content containers
      const contentElements = document.querySelectorAll('.card, .glass-effect, main, section, article');
      contentElements.forEach(el => {
        el.classList.remove('content-fade-in');
        // Force reflow
        el.offsetHeight;
        el.classList.add('content-fade-in');
      });
    }

    // Remove transition and fade classes after animation completes
    const timeout = setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
      document.body.classList.remove('dark-mode-fade', 'light-mode-fade');
      
      // Remove content animation classes
      const contentElements = document.querySelectorAll('.content-fade-in');
      contentElements.forEach(el => {
        el.classList.remove('content-fade-in');
      });
    }, 1000); // Increased to 1 second to match CSS transition duration

    return () => clearTimeout(timeout);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};