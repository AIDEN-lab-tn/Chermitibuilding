import { useRef, useEffect, useState } from 'react';
import { Building2, Eye, Home, Crown, Sparkles, Phone, ArrowUp } from 'lucide-react';
import './scrollbar-hide.css';

export const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const barRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: 'hero', label: 'Home', icon: Building2 },
    { id: 'entrance-view', label: 'Entrance', icon: Eye },
    { id: 'residential-floors', label: 'Residences', icon: Home },
    { id: 'upper-residences', label: 'Sky Homes', icon: Home },
    { id: 'penthouse-clouds', label: 'Penthouse', icon: Crown },
    { id: 'rooftop-garden', label: 'Amenities', icon: Sparkles },
    { id: 'contact', label: 'Contact', icon: Phone }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1) * 100;
      setScrollProgress(progress);

      if (barRef.current) {
        const footer = document.querySelector('footer');
        if (footer) {
          const footerRect = footer.getBoundingClientRect();
          const barRect = barRef.current.getBoundingClientRect();
          const barHeight = barRect.height;
          const margin = 24; // px, same as bottom-6
          // Distance from bottom of viewport to top of footer
          const distanceToFooter = window.innerHeight - footerRect.top;
          if (distanceToFooter > margin + barHeight) {
            // Bar would overlap footer, so hide it
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
          // Always keep bar fixed at the bottom
          barRef.current.style.position = 'fixed';
          barRef.current.style.left = '50%';
          barRef.current.style.transform = 'translateX(-50%)';
          barRef.current.style.bottom = `${margin}px`;
        }
      }

      // Determine active section
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      ).filter(Boolean);

      const currentSection = sectionElements.findIndex(element => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      });

      if (currentSection !== -1) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    // Initial call to set position
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper: get footer overlap for button offset
  const [footerOffset, setFooterOffset] = useState(24); // default 24px from bottom
  useEffect(() => {
    const handleFooterOffset = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const overlap = window.innerHeight - footerRect.top;
        if (overlap > 0) {
          setFooterOffset(overlap + 24); // move up by overlap + margin
        } else {
          setFooterOffset(24);
        }
      } else {
        setFooterOffset(24);
      }
    };
    window.addEventListener('scroll', handleFooterOffset);
    window.addEventListener('resize', handleFooterOffset);
    handleFooterOffset();
    return () => {
      window.removeEventListener('scroll', handleFooterOffset);
      window.removeEventListener('resize', handleFooterOffset);
    };
  }, []);

  return (
    <>
      {/* Floating Progress bar container */}
      <div
        className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 mx-auto max-w-2xl w-full pointer-events-none"
        style={{ width: '100%', maxWidth: '42rem' }}
      >
        <div
          ref={barRef}
          className="relative w-full pointer-events-auto"
          style={{
            opacity: isVisible ? 1 : 0,
            pointerEvents: isVisible ? 'auto' : 'none',
            transition: 'opacity 0.4s cubic-bezier(0.4,0,0.2,1)'
          }}
        >
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-2xl p-2">
            <div className="relative h-1.5 bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 dark:from-gray-800 dark:via-blue-700 dark:to-blue-400 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-all duration-300 rounded-full"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
            {/* Section indicators */}
            <div className="flex justify-center items-center py-2 px-2">
              <div className="flex space-x-2 overflow-x-auto max-w-full scrollbar-hide no-scrollbar">
                {sections.map((section, index) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 min-w-[56px] ${
                        activeSection === index
                          ? 'bg-blue-600 dark:bg-blue-700 text-white scale-105 shadow-lg'
                          : 'text-gray-800 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-xs whitespace-nowrap font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button, fixed at viewport right edge */}
      <button
        onClick={scrollToTop}
        className="fixed z-50 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
        style={{
          right: 24, // 1.5rem = 24px (Tailwind right-6)
          bottom: footerOffset,
          opacity: isVisible ? 1 : 0.8,
          transition: 'bottom 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s cubic-bezier(0.4,0,0.2,1)'
        }}
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </>
  );
};
