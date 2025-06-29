import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export const MouseGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 }); // Start off-screen
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Show cursor after a brief delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.matches('button, a, input, textarea, select, [role="button"], .cursor-pointer') ||
                           target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer');
      setIsHovering(isInteractive);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: -100, y: -100 }); // Move off-screen
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    return () => {
      clearTimeout(showTimer);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`cursor-glow ${
        theme === 'dark' ? 'cursor-glow-dark' : 'cursor-glow-light'
      } ${isHovering ? 'cursor-glow-interactive' : ''} ${
        isClicking ? 'cursor-glow-click' : ''
      }`}
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
        opacity: isVisible ? 1 : 0,
      }}
    />
  );
};