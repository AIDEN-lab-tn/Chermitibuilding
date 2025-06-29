import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export const MouseGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number; timestamp: number }>>([]);
  const { theme } = useTheme();

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);

      // Add trail effect with timestamp
      const newTrail = { 
        x: e.clientX, 
        y: e.clientY, 
        id: trailId++, 
        timestamp: Date.now() 
      };
      setTrails(prev => [...prev.slice(-12), newTrail]); // Keep last 12 trail points

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
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Clean up old trails based on timestamp
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setTrails(prev => prev.filter(trail => now - trail.timestamp < 800)); // Keep trails for 800ms
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Main cursor glow - Yellow for both themes */}
      <div
        className={`cursor-glow ${
          theme === 'dark' ? 'cursor-glow-dark' : 'cursor-glow-light'
        } ${isHovering ? 'cursor-glow-interactive' : ''} ${
          isClicking ? 'cursor-glow-click' : ''
        }`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />

      {/* Cursor trails with yellow glow */}
      {trails.map((trail, index) => {
        const age = Date.now() - trail.timestamp;
        const opacity = Math.max(0, 1 - age / 800); // Fade out over 800ms
        const scale = Math.max(0.3, 1 - age / 1000); // Scale down over 1000ms
        
        return (
          <div
            key={trail.id}
            className={`cursor-trail ${
              theme === 'dark' ? 'cursor-trail-dark' : 'cursor-trail-light'
            }`}
            style={{
              left: trail.x,
              top: trail.y,
              opacity: opacity * 0.7,
              transform: `translate(-50%, -50%) scale(${scale})`,
            }}
          />
        );
      })}
    </>
  );
};