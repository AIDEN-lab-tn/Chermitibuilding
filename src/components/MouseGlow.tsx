import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export const MouseGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 }); // Start off-screen
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number; timestamp: number }>>([]);
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    let trailId = 0;
    let animationFrame: number;

    // Show cursor after a brief delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);

      // Throttled trail creation using requestAnimationFrame
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      
      animationFrame = requestAnimationFrame(() => {
        const newTrail = { 
          x: e.clientX, 
          y: e.clientY, 
          id: trailId++, 
          timestamp: Date.now() 
        };
        setTrails(prev => [...prev.slice(-8), newTrail]); // Keep last 8 trail points
      });

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
      setTrails([]);
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
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Clean up old trails based on timestamp
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setTrails(prev => prev.filter(trail => now - trail.timestamp < 600)); // Keep trails for 600ms
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor glow - Yellow for both themes, replaces system cursor */}
      <div
        className={`cursor-glow ${
          theme === 'dark' ? 'cursor-glow-dark dark-mode-fade' : 'cursor-glow-light'
        } ${isHovering ? 'cursor-glow-interactive' : ''} ${
          isClicking ? 'cursor-glow-click' : ''
        }`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Cursor trails with yellow glow */}
      {trails.map((trail, index) => {
        const age = Date.now() - trail.timestamp;
        const opacity = Math.max(0, 1 - age / 600); // Fade out over 600ms
        const scale = Math.max(0.4, 1 - age / 800); // Scale down over 800ms
        
        return (
          <div
            key={trail.id}
            className={`cursor-trail ${
              theme === 'dark' ? 'cursor-trail-dark' : 'cursor-trail-light'
            }`}
            style={{
              left: trail.x,
              top: trail.y,
              opacity: opacity * 0.6,
              transform: `translate(-50%, -50%) scale(${scale})`,
            }}
          />
        );
      })}
    </>
  );
};