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
    
    // INSTANT theme application - NO DELAYS OR ANIMATIONS
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply instant transition class to all elements
    document.documentElement.classList.add('instant-theme-transition');
    
    // Force all content to remain visible during theme switch
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      (el as HTMLElement).classList.add('no-content-hiding');
    });

    // Remove transition classes after a very short time (just enough for color changes)
    const timeout = setTimeout(() => {
      document.documentElement.classList.remove('instant-theme-transition');
      
      // Remove no-content-hiding classes
      allElements.forEach(el => {
        (el as HTMLElement).classList.remove('no-content-hiding');
      });
    }, 150); // Very short - just enough for color transitions

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