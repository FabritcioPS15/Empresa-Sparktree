import { useEffect, useRef } from 'react';
import { projects } from '@/data/projects';

interface PortfolioProps {
  onViewProject?: (projectId: string) => void;
}

export default function Portfolio({ onViewProject }: PortfolioProps) {
  const portfolioRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const timeoutId = setTimeout(() => {
      if (portfolioRef.current) {
        const elements = portfolioRef.current.querySelectorAll('.reveal');
        elements.forEach(el => observer.observe(el));
      }
      
      const scrollElements = document.querySelectorAll('.scroll-entrance');
      scrollElements.forEach(el => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  // Use projects as-is without duplicating entries
  const portfolioProjects = projects;

  return (
    <div className="pt-16 sm:pt-20">
      <section ref={portfolioRef} className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 reveal scroll-entrance initial-visible scroll-stagger-1">
              Nuestro Portafolio
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl sm:max-w-3xl mx-auto px-2 sm:px-0 reveal scroll-entrance initial-visible slide-left scroll-stagger-2">
             Portafolio de diseño web y branding: proyectos con resultados reales.
            </p>
            <style>{`
        @keyframes glowPulseMint {
          0%, 100% { text-shadow: 0 0 0 rgba(16,185,129,0); }
          50% { text-shadow: 0 0 10px rgba(110,231,183,0.9), 0 0 18px rgba(16,185,129,0.6); }
        }
        .glow-text { text-shadow: none; transition: text-shadow 200ms ease; }
        .glow-hover:hover .glow-text {
          animation: glowPulseMint 2.2s ease-in-out infinite;
          text-shadow: 0 0 8px rgba(110,231,183,0.75), 0 0 14px rgba(16,185,129,0.45);
        }
      `}</style>
          </div>

          {/* First Grid - Special Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12">
            {/* First two items */}
            {portfolioProjects.slice(0, 2).map((project, index) => (
              <div
                key={`first-${index}`}
                onClick={() => onViewProject?.(project.id)}
                className={`group cursor-pointer reveal hover:scale-105 transition-all duration-300 scroll-entrance scale-up scroll-stagger-${index + 3} smooth-exit`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative bg-gray-200 rounded-xl aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] mb-2 sm:mb-3 md:mb-4 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-500 text-xs sm:text-sm">imagen</span>
                  </div>
                  <div
                    className="absolute inset-x-0 bottom-0 h-2/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(to top, ${(project as any).overlayColor ?? '#A8B4FF'}, transparent)` }}
                  ></div>
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <div className="text-white drop-shadow-sm">
                      <p className="text-base sm:text-xl md:text-2xl font-semibold leading-tight">{project.title}</p>
                      <p className="text-xs sm:text-sm md:text-base mt-1 text-white/90">branding · diseño web</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-center text-gray-900 font-medium group-hover:text-gray-700 transition-colors text-xs sm:text-sm md:text-base px-2">
                  {project.title}
                </h3>
              </div>
            ))}
            
            {/* Third item - spans 2 rows on desktop */}
            <div 
              onClick={() => onViewProject?.(portfolioProjects[2].id)}
              className="sm:col-span-2 lg:col-span-1 lg:row-span-2 group cursor-pointer reveal hover:scale-105 transition-all duration-300 scroll-entrance scale-up scroll-stagger-5 smooth-exit" 
              style={{ animationDelay: '0.2s' }}
            >
              <div className="relative bg-gray-200 rounded-xl h-full flex items-center justify-center mb-2 sm:mb-3 md:mb-4 group-hover:bg-gray-300 transition-all duration-300 min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] group-hover:shadow-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-500 text-xs sm:text-sm">imagen</span>
                </div>
                <div
                  className="absolute inset-x-0 bottom-0 h-2/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to top, ${(portfolioProjects[2] as any).overlayColor ?? '#A8B4FF'}, transparent)` }}
                ></div>
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <div className="text-white drop-shadow-sm">
                    <p className="text-base sm:text-xl md:text-2xl font-semibold leading-tight">{portfolioProjects[2].title}</p>
                    <p className="text-xs sm:text-sm md:text-base mt-1 text-white/90">{(portfolioProjects[2] as any).services?.join(' · ') ?? 'branding · diseño web'}</p>
                  </div>
                </div>
              </div>
              <h3 className="text-center text-gray-900 font-medium group-hover:text-gray-700 transition-colors text-xs sm:text-sm md:text-base px-2">
                {portfolioProjects[2].title}
              </h3>
            </div>
          </div>

          {/* Second Grid - Reversed Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12">
            {/* First item - spans 2 rows on desktop */}
            <div 
              onClick={() => onViewProject?.(portfolioProjects[3].id)}
              className="sm:col-span-2 lg:col-span-1 lg:row-span-2 group cursor-pointer reveal hover:scale-105 transition-all duration-300 scroll-entrance slide-left scroll-stagger-6 smooth-exit" 
              style={{ animationDelay: '0.3s' }}
            >
              <div className="relative bg-gray-200 rounded-xl h-full flex items-center justify-center mb-2 sm:mb-3 md:mb-4 group-hover:bg-gray-300 transition-all duration-300 min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] group-hover:shadow-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-500 text-xs sm:text-sm">imagen</span>
                </div>
                <div
                  className="absolute inset-x-0 bottom-0 h-2/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to top, ${(portfolioProjects[3] as any).overlayColor ?? '#A8B4FF'}, transparent)` }}
                ></div>
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <div className="text-white drop-shadow-sm">
                    <p className="text-base sm:text-xl md:text-2xl font-semibold leading-tight">{portfolioProjects[3].title}</p>
                    <p className="text-xs sm:text-sm md:text-base mt-1 text-white/90">{(portfolioProjects[3] as any).services?.join(' · ') ?? 'branding · diseño web'}</p>
                  </div>
                </div>
              </div>
              <h3 className="text-center text-gray-900 font-medium group-hover:text-gray-700 transition-colors text-xs sm:text-sm md:text-base px-2">
                {portfolioProjects[3].title}
              </h3>
            </div>
            
            {/* Last two items */}
            {portfolioProjects.slice(4, 6).map((project, index) => (
              <div 
                key={`second-${index}`}
                onClick={() => onViewProject?.(project.id)}
                className={`group cursor-pointer reveal hover:scale-105 transition-all duration-300 scroll-entrance slide-right scroll-stagger-${index + 7} smooth-exit`} 
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className="relative bg-gray-200 rounded-xl aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] mb-2 sm:mb-3 md:mb-4 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-500 text-xs sm:text-sm">imagen</span>
                  </div>
                  <div
                    className="absolute inset-x-0 bottom-0 h-2/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(to top, ${(project as any).overlayColor ?? '#A8B4FF'}, transparent)` }}
                  ></div>
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <div className="text-white drop-shadow-sm">
                      <p className="text-base sm:text-xl md:text-2xl font-semibold leading-tight">{project.title}</p>
                      <p className="text-xs sm:text-sm md:text-base mt-1 text-white/90">{(project as any).services?.join(' · ') ?? 'branding · diseño web'}</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-center text-gray-900 font-medium group-hover:text-gray-700 transition-colors text-xs sm:text-sm md:text-base px-2">
                  {project.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Third grid removed to avoid repeating first projects */}

          {/* Load More Button */}
          <div className="text-center reveal scroll-entrance bounce-in scroll-stagger-12">
            <button className="glow-hover text-gray-900 font-medium transition-transform duration-300 hover:scale-105 px-1 py-1 smooth-exit text-xs sm:text-sm md:text-base" style={{ background: 'transparent' }}>
              <span className="glow-text">Ver más</span>
              <span className="ml-1 align-middle">↓</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}