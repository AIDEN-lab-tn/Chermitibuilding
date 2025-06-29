import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export const MouseGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 }); // Start off-screen
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Show cursor immediately
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      // Update position immediately with no delay
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

    // Use passive: false for mousemove to ensure real-time updates
    document.addEventListener('mousemove', handleMouseMove, { passive: false });
    document.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    return () => {
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
        opacity: 1,
        willChange: 'transform', // Optimize for animations
      }}
    />
  );
};