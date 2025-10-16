import { useEffect, useRef } from 'react';

export default function Portfolio() {
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

  const projects = [
    { title: 'McDonals - Diseño de Página web' },
    { title: 'Coca Cola - Diseño de Página web' },
    { title: 'SparkTree - Branding' },
    { title: 'McDonals - Diseño de Página web' },
    { title: 'Coca Cola - Diseño de Página web' },
    { title: 'SparkTree - Branding' },
  ];

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
              Proyectos que han transformado negocios y generado resultados excepcionales
            </p>
          </div>

          {/* First Grid - Special Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12">
            {/* First two items */}
            {projects.slice(0, 2).map((project, index) => (
              <div
                key={index}
                className={`group cursor-pointer reveal hover:scale-105 transition-all duration-300 scroll-entrance scale-up scroll-stagger-${index + 3} smooth-exit`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gray-200 rounded-xl aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] flex items-center justify-center mb-2 sm:mb-3 md:mb-4 group-hover:bg-gray-300 transition-all duration-300 group-hover:shadow-lg relative overflow-hidden">
                  <span className="text-gray-500 group-hover:text-gray-700 transition-colors text-xs sm:text-sm">imagen</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-center text-gray-900 font-medium group-hover:text-gray-700 transition-colors text-xs sm:text-sm md:text-base px-2">
                  {project.title}
                </h3>
              </div>
            ))}
            
            {/* Third item - spans 2 rows on desktop */}
            <div className="sm:col-span-2 lg:col-span-1 lg:row-span-2 group cursor-pointer reveal hover:scale-105 transition-all duration-300 scroll-entrance scale-up scroll-stagger-5 smooth-exit" style={{ animationDelay: '0.2s' }}>
              <div className="bg-gray-200 rounded-xl h-full flex items-center justify-center mb-2 sm:mb-3 md:mb-4 group-hover:bg-gray-300 transition-all duration-300 min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] group-hover:shadow-lg relative overflow-hidden">
                <span className="text-gray-500 group-hover:text-gray-700 transition-colors text-xs sm:text-sm">imagen</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-center text-gray-900 font-medium group-hover:text-gray-700 transition-colors text-xs sm:text-sm md:text-base px-2">
                {projects[2].title}
              </h3>
            </div>
          </div>

          {/* Second Grid - Reversed Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12">
            {/* First item - spans 2 rows on desktop */}
            <div className="sm:col-span-2 lg:col-span-1 lg:row-span-2 group cursor-pointer reveal hover:scale-105 transition-all duration-300 scroll-entrance slide-left scroll-stagger-6 smooth-exit" style={{ animationDelay: '0.3s' }}>
              <div className="bg-gray-200 rounded-xl h-full flex items-center justify-center mb-2 sm:mb-3 md:mb-4 group-hover:bg-gray-300 transition-all duration-300 min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] group-hover:shadow-lg relative overflow-hidden">
                <span className="text-gray-500 group-hover:text-gray-700 transition-colors text-xs sm:text-sm">imagen</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-center text-gray-900 font-medium group-hover:text-gray-700 transition-colors text-xs sm:text-sm md:text-base px-2">
                {projects[3].title}
              </h3>
            </div>
            
            {/* Last two items */}
            {projects.slice(4, 6).map((project, index) => (
              <div 
                key={index} 
                className={`group cursor-pointer reveal hover:scale-105 transition-all duration-300 scroll-entrance slide-right scroll-stagger-${index + 7} smooth-exit`} 
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className="bg-gray-200 rounded-xl aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] flex items-center justify-center mb-2 sm:mb-3 md:mb-4 group-hover:bg-gray-300 transition-all duration-300 group-hover:shadow-lg relative overflow-hidden">
                  <span className="text-gray-500 group-hover:text-gray-700 transition-colors text-xs sm:text-sm">imagen</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-center text-gray-900 font-medium group-hover:text-gray-700 transition-colors text-xs sm:text-sm md:text-base px-2">
                  {project.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Third Grid - Regular 3 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12">
            {projects.slice(0, 3).map((project, index) => (
              <div 
                key={index} 
                className={`group cursor-pointer reveal hover:scale-105 transition-all duration-300 scroll-entrance scale-up scroll-stagger-${index + 9} smooth-exit`} 
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="bg-gray-200 rounded-xl aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] flex items-center justify-center mb-2 sm:mb-3 md:mb-4 group-hover:bg-gray-300 transition-all duration-300 group-hover:shadow-lg relative overflow-hidden">
                  <span className="text-gray-500 group-hover:text-gray-700 transition-colors text-xs sm:text-sm">imagen</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-center text-gray-900 font-medium group-hover:text-gray-700 transition-colors text-xs sm:text-sm md:text-base px-2">
                  {project.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center reveal scroll-entrance bounce-in scroll-stagger-12">
            <button className="text-gray-900 font-medium hover:text-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-md px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg hover:bg-gray-100 smooth-exit text-xs sm:text-sm md:text-base">
              Ver más ↓
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}