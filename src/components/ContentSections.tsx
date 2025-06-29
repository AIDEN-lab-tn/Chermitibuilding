import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollIndicator } from '@/components/ScrollIndicator';
import { ContactDialog } from '@/components/ContactDialog';
import logo from '/public/logo.png';
import sliderlogo from '/public/sliderlogo.png';

export const ContentSections = () => {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionIndex = parseInt(entry.target.getAttribute('data-section') || '0');
          setVisibleSections(prev => {
            const newSet = new Set(prev);
            if (entry.isIntersecting) {
              newSet.add(sectionIndex);
            } else {
              newSet.delete(sectionIndex);
            }
            return newSet;
          });
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('[data-section]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const sections = [
    {
      id: 'hero',
      subtitle: 'Redefining luxury living in the heart of the city',
      content: 'Welcome to the most prestigious address in the metropolitan district. Rising 60 stories above the cityscape, Chermiti Building offers unparalleled views, world-class amenities, and architectural excellence. Experience a new standard of luxury living where every detail has been crafted to perfection.',
      position: 'center',
      viewDescription: 'Your journey begins here',
      features: ['60 Stories of Luxury', '180 Exclusive Residences', '24/7 Concierge Service', 'Sky Gardens & Terraces'],
      pricing: 'Starting from $2.5M'
    },
    {
      id: 'entrance-view',
      title: 'Grand Entrance Plaza',
      subtitle: 'First impressions that last forever',
      content: 'The moment you arrive, you\'ll understand why Chermiti Building stands apart. Our grand entrance features a 30-foot waterfall cascade, imported Italian marble flooring, and custom crystal chandeliers. The curved glass facade creates a stunning visual gateway to luxury.',
      position: 'left',
      viewDescription: 'Currently viewing: Ground Level & Entrance',
      features: ['Valet Parking Service', 'Private Drop-off Zone', 'Secured Entry Systems', 'Landscaped Gardens'],
      amenity: 'Double-height lobby with 24/7 doorman'
    },
    {
      id: 'residential-floors',
      title: 'Luxury Residences',
      subtitle: 'Where comfort meets sophistication',
      content: 'Floors 5-45 house our premium residential units, each featuring floor-to-ceiling windows, premium hardwood flooring, and custom millwork. Every residence includes smart home technology, European appliances, and private balconies with breathtaking city views.',
      position: 'right',
      viewDescription: 'Currently viewing: Residential Floors 5-45',
      features: ['1-4 Bedroom Layouts', 'Smart Home Integration', 'Premium Appliances', 'City & River Views'],
      amenity: 'Residents-only elevator access'
    },
    {
      id: 'upper-residences',
      title: 'Sky Residences',
      subtitle: 'Elevated living, elevated views',
      content: 'Floors 46-55 offer our most exclusive residential experiences. These sky residences feature 12-foot ceilings, private terraces, and panoramic windows. Each unit includes a private wine cellar, home office space, and access to the exclusive Sky Club.',
      position: 'left',
      viewDescription: 'Currently viewing: Sky Residences 46-55',
      features: ['Private Wine Cellars', 'Home Office Spaces', 'Exclusive Sky Club Access', 'Panoramic Views'],
      amenity: 'Personal concierge service included'
    },
    {
      id: 'penthouse-clouds',
      title: 'Penthouse Collection',
      subtitle: 'The crown jewel of urban living',
      content: 'Floors 56-58 house our ultra-exclusive penthouse collection. These magnificent homes feature private elevator access, wrap-around terraces, infinity pools, and 360-degree city views. Each penthouse is a masterpiece of design and luxury.',
      position: 'right',
      viewDescription: 'Currently viewing: Penthouse Floors 56-58',
      features: ['Private Elevator Access', 'Infinity Pools', 'Wrap-around Terraces', '360° City Views'],
      amenity: 'Dedicated penthouse concierge team'
    },
    {
      id: 'rooftop-garden',
      title: 'Sky Gardens & Amenities',
      subtitle: 'Your private paradise above the clouds',
      content: 'The rooftop level features lush sky gardens, an Olympic-size pool, state-of-the-art fitness center, spa facilities, and multiple entertainment spaces. This is where residents gather to enjoy sunset cocktails while floating above the metropolitan skyline.',
      position: 'left',
      viewDescription: 'Currently viewing: Rooftop Level 59-60',
      features: ['Olympic Pool & Spa', 'Fitness Center', 'Sky Gardens', 'Event Spaces'],
      amenity: 'Rooftop helipad for private access'
    },
    {
      id: 'contact',
      title: 'Schedule Your Private Tour',
      subtitle: 'Experience this architectural marvel',
      content: 'Ready to call Chermiti Building home? Our exclusive sales team is waiting to guide you through this one-of-a-kind living experience. Book your private helicopter tour or ground-level presentation today. Financing options available for qualified buyers.',
      position: 'center',
      viewDescription: 'Complete your journey with us',
      features: ['Private Helicopter Tours', 'Virtual Reality Previews', 'Flexible Financing', 'Move-in Ready Units'],
      amenity: null // Remove amenity for contact section
    }
  ];

  return (
    <div className="min-h-[700vh]">
      {sections.map((section, index) => {
        const isVisible = visibleSections.has(index);
        
        // First and last sections are centered
        if (section.position === 'center' && index === 0) {
          return (
            <section
              key={section.id}
              id={section.id}
              data-section={index}
              className="h-screen flex items-center justify-center px-6 relative"
            >
              <div className="w-full max-w-4xl mx-auto flex items-center justify-center">
                <Card className={`h-auto max-w-3xl bg-white/80 dark:bg-black/80 backdrop-blur-lg border-blue-200 dark:border-gray-600 text-gray-800 dark:text-white transition-all duration-1000 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}>
                  <CardContent className="p-12">
                    <div className="text-center">
                      <Badge className="text-xs px-4 py-2 bg-blue-100/60 dark:bg-blue-600/30 text-blue-600 dark:text-blue-200 border-blue-400/40 dark:border-blue-500/40 mb-6">
                        {section.viewDescription}
                      </Badge>
                      <img src={sliderlogo} alt="Chermiti Slider Logo" className="mx-auto mb-8 h-24 md:h-32 w-auto object-contain bg-transparent border-none outline-none shadow-none" />
                      <h1 className="text-4xl md:text-5xl font-bold mb-4">{section.title}</h1>
                      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-700 dark:text-blue-200">{section.subtitle}</h2>
                      <p className="mb-8 text-lg text-gray-800 dark:text-gray-200">{section.content}</p>
                      <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {section.features.map((feature, i) => (
                          <span key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/40 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200 border border-blue-400/30 dark:border-blue-700/30 text-sm font-medium">
                            <img src={logo} alt="Feature" className="h-4 w-4 object-contain bg-transparent p-0 border-none outline-none shadow-none" />
                            {feature}
                          </span>
                        ))}
                      </div>
                      <div className="text-green-500 dark:text-green-400 text-xl font-bold mb-2">{section.pricing}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* Scroll Indicator placed at the bottom center of the hero section */}
              <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2 z-10">
                <ScrollIndicator />
              </div>
            </section>
          );
        }

        // Left and right positioned sections with more extreme positioning
        if (section.id === 'contact') {
          return (
            <section
              key={section.id}
              id={section.id}
              data-section={index}
              className="h-screen flex items-center justify-center px-6 relative"
            >
              <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center gap-8">
                <Card className={`h-auto w-full max-w-3xl bg-white/80 dark:bg-black/80 backdrop-blur-lg border-blue-200 dark:border-gray-600 text-gray-800 dark:text-white transition-all duration-1000 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}>
                  <CardContent className="p-12">
                    <div className="text-center">
                      <Badge className="text-xs px-4 py-2 bg-blue-100/60 dark:bg-blue-600/30 text-blue-600 dark:text-blue-200 border-blue-400/40 dark:border-blue-500/40 mb-6">
                        {section.viewDescription}
                      </Badge>
                      <img src={logo} alt="Chermiti Logo" className="mx-auto mb-4 h-14 w-14 rounded-full shadow-lg object-contain bg-white/80 dark:bg-black/80 p-2" />
                      <h1 className="text-4xl md:text-5xl font-bold mb-4">{section.title}</h1>
                      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-700 dark:text-blue-200">{section.subtitle}</h2>
                      <p className="mb-8 text-lg text-gray-800 dark:text-gray-200">{section.content}</p>
                      <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {section.features.map((feature, i) => (
                          <span key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/40 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200 border border-blue-400/30 dark:border-blue-700/30 text-sm font-medium">
                            <img src={logo} alt="Feature" className="h-4 w-4 object-contain bg-transparent p-0 border-none outline-none shadow-none" />
                            {feature}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-center">
                        <ContactDialog>
                          <button className="bg-blue-600 dark:bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-semibold text-lg shadow-lg">
                            Apply to Buy a Residence
                          </button>
                        </ContactDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          );
        }

        return (
          <section
            key={section.id}
            id={section.id}
            data-section={index}
            className="h-screen flex items-center px-6"
          >
            <div className={`w-full max-w-none mx-auto flex items-center ${
              section.position === 'left' 
                ? 'justify-start pl-12 md:pl-24' 
                : 'justify-end pr-12 md:pr-24'
            }`}>
              <Card className={`h-auto max-w-lg bg-white/80 dark:bg-black/80 backdrop-blur-lg border-blue-200 dark:border-gray-600 text-gray-800 dark:text-white transition-all duration-1000 ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : section.position === 'left' 
                    ? 'opacity-0 -translate-x-full' 
                    : 'opacity-0 translate-x-full'
              }`}>
                <CardContent className="p-10">
                  <div className="mb-6">
                    <Badge className="text-xs px-4 py-2 bg-blue-100/60 dark:bg-blue-600/30 text-blue-600 dark:text-blue-200 border-blue-400/40 dark:border-blue-500/40 mb-6">
                      {section.viewDescription}
                    </Badge>
                  </div>
                  <div className="flex items-start gap-4 mb-8">
                    <img src={logo} alt="Chermiti Logo" className="h-12 w-12 object-contain bg-transparent p-0 mt-1 flex-shrink-0 border-none outline-none shadow-none" />
                    <div>
                      <h2 className="text-3xl font-bold mb-3">{section.title}</h2>
                      <p className="text-blue-700 text-lg dark:text-blue-300">{section.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-base leading-relaxed text-gray-800 dark:text-gray-300 mb-6">
                    {section.content}
                  </p>
                  
                  {section.features && (
                    <div className="space-y-3 mb-6">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-blue-300 uppercase tracking-wide">Key Features</h4>
                      <div className="space-y-2">
                        {section.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-3 text-gray-800 dark:text-gray-300">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {section.amenity && (
                    <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4 mt-6">
                      <div className="flex items-center space-x-3">
                        <img src={logo} alt="Amenity" className="h-5 w-5 object-contain bg-transparent p-0 border-none outline-none shadow-none" />
                        <span className="text-sm text-gray-700 dark:text-blue-200 font-semibold">{section.amenity}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>
        );
      })}
    </div>
  );
};
