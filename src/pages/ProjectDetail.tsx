import { useEffect, useRef } from 'react';
import { getProjectById } from '@/data/projects';

interface ProjectDetailProps {
  projectId: string;
  onNavigate?: (page: string) => void;
}

export default function ProjectDetail({ projectId, onNavigate }: ProjectDetailProps) {
  const projectRef = useRef<HTMLElement>(null);
  const project = getProjectById(projectId);

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
      if (projectRef.current) {
        const elements = projectRef.current.querySelectorAll('.reveal');
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

  if (!project) {
    return (
      <div className="pt-16 sm:pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Proyecto no encontrado</h1>
          <button
            onClick={() => onNavigate?.('portfolio')}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Volver al portafolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 sm:pt-20">
      <section ref={projectRef} className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-6 sm:mb-8">
            <button
              onClick={() => onNavigate?.('portfolio')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver al portafolio
            </button>
          </div>

          {/* Hero Section - Brand/Project Overview */}
          <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
            {/* Hero Image Placeholder */}
            <div className="bg-gray-200 rounded-2xl aspect-[16/9] sm:aspect-[16/8] md:aspect-[16/7] lg:aspect-[16/6] mb-6 sm:mb-8 md:mb-10 scroll-entrance scale-up scroll-stagger-1 hover:bg-gray-300 hover:scale-105 hover:shadow-lg transition-all duration-500 cursor-default smooth-exit flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-400 rounded-lg mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base hover:text-gray-800 transition-colors duration-500">
                  {project.heroImage}
                </p>
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 text-center scroll-entrance slide-left scroll-stagger-2">
                {project.title}
              </h1>
              <p className="text-gray-600 leading-relaxed text-center text-sm sm:text-base md:text-lg px-2 sm:px-0 scroll-entrance slide-left scroll-stagger-3 hover:text-gray-800 hover:scale-105 transition-all duration-500 cursor-default">
                {project.description}
              </p>
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-8 sm:mb-12 md:mb-16 lg:mb-20">
            {/* Challenge & Solution */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200 scroll-entrance slide-left scroll-stagger-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Desafío</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {project.challenge}
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200 scroll-entrance slide-left scroll-stagger-5">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Solución</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Project Info Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 scroll-entrance slide-right scroll-stagger-4">
                <h4 className="font-bold text-gray-900 mb-3 sm:mb-4">Información del Proyecto</h4>
                <div className="space-y-3 text-sm sm:text-base">
                  <div>
                    <span className="font-medium text-gray-700">Cliente:</span>
                    <p className="text-gray-600">{project.client}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Categoría:</span>
                    <p className="text-gray-600">{project.category}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Duración:</span>
                    <p className="text-gray-600">{project.duration}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 scroll-entrance slide-right scroll-stagger-5">
                <h4 className="font-bold text-gray-900 mb-3 sm:mb-4">Tecnologías</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs sm:text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 scroll-entrance slide-right scroll-stagger-6">
                <h4 className="font-bold text-gray-900 mb-3 sm:mb-4">Equipo</h4>
                <div className="space-y-2">
                  {project.team.map((member, index) => (
                    <p key={index} className="text-sm sm:text-base text-gray-600">
                      {member}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center scroll-entrance scroll-stagger-7">
              Resultados Obtenidos
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {project.results.map((result, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 scroll-entrance scale-up scroll-stagger-8 hover:bg-gray-50 hover:scale-105 hover:shadow-lg transition-all duration-500 cursor-default"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base font-medium">{result}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Result Image */}
          <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
            <div className="bg-gray-200 rounded-2xl aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/8] lg:aspect-[16/7] scroll-entrance scale-up scroll-stagger-9 hover:bg-gray-300 hover:scale-105 hover:shadow-lg transition-all duration-500 cursor-default smooth-exit flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-400 rounded-lg mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base hover:text-gray-800 transition-colors duration-500">
                  {project.resultImages[0]}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Result Images */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {project.additionalImages.map((image, index) => (
              <div
                key={index}
                className="bg-gray-200 rounded-2xl aspect-[4/3] sm:aspect-[4/3] md:aspect-[4/3] lg:aspect-[4/3] scroll-entrance scale-up scroll-stagger-10 hover:bg-gray-300 hover:scale-105 hover:shadow-lg transition-all duration-500 cursor-default smooth-exit flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gray-400 rounded-lg mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base hover:text-gray-800 transition-colors duration-500">
                    {image}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-12 sm:mt-16 md:mt-20 text-center">
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 md:p-10 scroll-entrance bounce-in scroll-stagger-11">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                ¿Te gusta lo que ves?
              </h3>
              <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
                Trabajemos juntos en tu próximo proyecto
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                  onClick={() => onNavigate?.('services')}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium text-sm sm:text-base"
                >
                  Ver nuestros servicios
                </button>
                <button
                  onClick={() => onNavigate?.('contact')}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 rounded-lg border border-gray-200 hover:bg-gray-100 hover:shadow-md hover:scale-105 transition-all duration-300 font-medium text-sm sm:text-base"
                >
                  Contactar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
