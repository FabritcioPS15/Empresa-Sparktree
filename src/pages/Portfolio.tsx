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

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      if (portfolioRef.current) {
        const elements = portfolioRef.current.querySelectorAll('.reveal');
        elements.forEach(el => observer.observe(el));
      }
      
      // Observe scroll-entrance elements
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
    <div className="pt-20">
      <section ref={portfolioRef} className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 reveal scroll-entrance initial-visible scroll-stagger-1">
              Nuestro Portafolio
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto reveal scroll-entrance initial-visible slide-left scroll-stagger-2">
              Proyectos que han transformado negocios y generado resultados excepcionales
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {projects.slice(0, 2).map((project, index) => (
              <div
                key={index}
                className={`group cursor-pointer reveal hover:scale-105 transition-all duration-300 scroll-entrance scale-up scroll-stagger-${index + 3} ${index === 0 ? 'md:col-span-1' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gray-200 rounded-xl aspect-[3/4] flex items-center justify-center mb-4 group-hover:bg-gray-300 transition-all duration-300 group-hover:shadow-lg relative overflow-hidden">
                  <span className="text-gray-500 group-hover:text-gray-700 transition-colors">imagen</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-center text-gray-900 font-medium group-hover:text-gray-700 transition-colors">{project.title}</h3>
              </div>
            ))}
            <div className="md:col-span-1 md:row-span-2 group cursor-pointer reveal hover:scale-105 transition-all duration-300 scroll-entrance scale-up scroll-stagger-5" style={{ animationDelay: '0.2s' }}>
              <div className="bg-gray-200 rounded-xl h-full flex items-center justify-center mb-4 group-hover:bg-gray-300 transition-all duration-300 min-h-[500px] group-hover:shadow-lg relative overflow-hidden">
                <span className="text-gray-500 group-hover:text-gray-700 transition-colors">imagen</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-center text-gray-900 font-medium group-hover:text-gray-700 transition-colors">{projects[2].title}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="md:col-span-1 md:row-span-2 group cursor-pointer reveal hover:scale-105 transition-all duration-300 scroll-entrance slide-left scroll-stagger-6" style={{ animationDelay: '0.3s' }}>
              <div className="bg-gray-200 rounded-xl h-full flex items-center justify-center mb-4 group-hover:bg-gray-300 transition-all duration-300 min-h-[500px] group-hover:shadow-lg relative overflow-hidden">
                <span className="text-gray-500 group-hover:text-gray-700 transition-colors">imagen</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-center text-gray-900 font-medium group-hover:text-gray-700 transition-colors">{projects[3].title}</h3>
            </div>
            {projects.slice(4, 6).map((project, index) => (
              <div key={index} className={`group cursor-pointer reveal hover:scale-105 transition-all duration-300 scroll-entrance slide-right scroll-stagger-${index + 7}`} style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                <div className="bg-gray-200 rounded-xl aspect-[3/4] flex items-center justify-center mb-4 group-hover:bg-gray-300 transition-all duration-300 group-hover:shadow-lg relative overflow-hidden">
                  <span className="text-gray-500 group-hover:text-gray-700 transition-colors">imagen</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-center text-gray-900 font-medium group-hover:text-gray-700 transition-colors">{project.title}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {projects.slice(0, 3).map((project, index) => (
              <div key={index} className={`group cursor-pointer reveal hover:scale-105 transition-all duration-300 scroll-entrance scale-up scroll-stagger-${index + 9}`} style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
                <div className="bg-gray-200 rounded-xl aspect-[3/4] flex items-center justify-center mb-4 group-hover:bg-gray-300 transition-all duration-300 group-hover:shadow-lg relative overflow-hidden">
                  <span className="text-gray-500 group-hover:text-gray-700 transition-colors">imagen</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-center text-gray-900 font-medium group-hover:text-gray-700 transition-colors">{project.title}</h3>
              </div>
            ))}
          </div>

          <div className="text-center reveal scroll-entrance bounce-in scroll-stagger-12">
            <button className="text-gray-900 font-medium hover:text-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-md px-6 py-3 rounded-lg hover:bg-gray-100">
              Ver más ↓
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
