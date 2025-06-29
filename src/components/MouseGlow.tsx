import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export const MouseGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const { theme } = useTheme();

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);

      // Add trail effect
      const newTrail = { x: e.clientX, y: e.clientY, id: trailId++ };
      setTrails(prev => [...prev.slice(-8), newTrail]); // Keep last 8 trail points

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.matches('button, a, input, textarea, select, [role="button"], .cursor-pointer');
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

  // Clean up old trails
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails(prev => prev.slice(1));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Main cursor glow */}
      <div
        className={`cursor-glow ${
          theme === 'dark' ? 'cursor-glow-dark' : 'cursor-glow-light'
        } ${isHovering ? 'cursor-glow-interactive' : ''} ${
          isClicking ? 'cursor-glow-click' : ''
        }`}
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
        }}
      />

      {/* Cursor trails */}
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className={`cursor-trail ${
            theme === 'dark' ? 'cursor-trail-dark' : 'cursor-trail-light'
          }`}
          style={{
            left: trail.x - 3,
            top: trail.y - 3,
            opacity: (index + 1) / trails.length * 0.6,
            transform: `scale(${(index + 1) / trails.length})`,
          }}
        />
      ))}
    </>
  );
};