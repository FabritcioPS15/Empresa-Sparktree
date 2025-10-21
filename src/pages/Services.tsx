import { useEffect, useRef, useState } from 'react';
import { FaHeadset, FaRocket, FaCalendar } from 'react-icons/fa6';
import { FaCheckCircle } from 'react-icons/fa';

interface ServicesProps {
  onNavigate?: (page: string) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  const servicesRef = useRef<HTMLElement>(null);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [lineProgress, setLineProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<HTMLDivElement[]>([]);

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
      if (servicesRef.current) {
        const elements = servicesRef.current.querySelectorAll('.reveal');
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
  
  // Animación del proceso basada en scroll y visibilidad
  useEffect(() => {
    // Observa pasos individualmente
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idxAttr = (entry.target as HTMLElement).getAttribute('data-step-index');
          const idx = idxAttr ? parseInt(idxAttr, 10) : NaN;
          if (!Number.isNaN(idx) && entry.isIntersecting) {
            setVisibleSteps((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
            stepObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    stepRefs.current.forEach((el) => el && stepObserver.observe(el));

    // Progreso de línea basado en scroll dentro de la sección
    const updateProgress = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight || document.documentElement.clientHeight;
      const total = rect.height;
      // cuánto del contenedor ha entrado al viewport
      const entered = Math.min(Math.max(viewportH - rect.top, 0), total);
      const pct = total > 0 ? Math.min(Math.max((entered / total) * 100, 0), 100) : 0;
      setLineProgress(pct);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      stepObserver.disconnect();
      window.removeEventListener('scroll', updateProgress as EventListener);
      window.removeEventListener('resize', updateProgress as EventListener);
    };
  }, []);
  const services = [
    {
      title: 'Diseño de Páginas Web',
      description:
        'Tu sitio será hermoso, rápido y, lo más importante, intuitivo. Nos enfocamos en la Experiencia del Usuario (UX) para que tus visitantes encuentren lo que necesitan sin fricción y realicen la acción que deseas (comprar, contactar, cotizar). Un diseño optimizado significa más clientes con el mismo tráfico.',
    },
    {
      title: 'Posicionamiento SEO',
      description:
        'Dejaremos de depender solo de la publicidad pagada. Optimizamos tu web para que aparezca en los primeros resultados de Google cuando tus clientes busquen tus servicios o productos. Lograrás tráfico constante, calificado y gratuito que trabajará por ti 24/7',
    },
    {
      title: 'Branding',
      description:
        'Convertimos tu negocio en una marca memorable y de confianza. Más allá de un logo, definimos la voz, los valores y la personalidad que te diferenciarán de tu competencia. Una marca sólida genera lealtad y te permite cobrar lo que realmente vale tu servicio',
    },
  ];

  return (
    <div className="pt-20">
      <section ref={servicesRef} className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-20 leading-tight reveal scroll-entrance initial-visible">
            <span className="inline-block scroll-stagger-1">Nuestros servicios,</span>
            <br />
            <span className="inline-block scroll-stagger-2">impulsan resultados</span>
          </h1>

          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-12 items-center reveal hover:scale-105 transition-all duration-500 group scroll-entrance scale-up scroll-stagger-${index + 3} smooth-exit`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`${index % 2 === 1 ? 'md:order-2' : ''} group-hover:scale-105 transition-transform duration-300`}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-gray-700 transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {service.description}
                  </p>
                  <div className="mt-6">
                    <button 
                      onClick={() => onNavigate?.(`service-${service.title.toLowerCase().replace(/\s+/g, '-').replace('diseño-de-páginas-web', 'web').replace('posicionamiento-seo', 'seo')}`)}
                      className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg smooth-exit"
                    >
                      Conoce más
                    </button>
                  </div>
                </div>
                <div className={`${index % 2 === 1 ? 'md:order-1' : ''} group-hover:scale-105 transition-transform duration-300`}>
                  <div className="bg-gray-200 rounded-2xl aspect-video flex items-center justify-center group-hover:bg-gray-300 transition-all duration-300 group-hover:shadow-lg relative overflow-hidden">
                    <span className="text-gray-500 group-hover:text-gray-700 transition-colors">imagen</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Process Section - Timeline */}
          <section className="py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
              <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-4 scroll-entrance">
                  Nuestro proceso de trabajo
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base scroll-entrance px-2">
                  Así es como trabajamos contigo para hacer realidad tu proyecto
                </p>
              </div>

              <div ref={timelineRef} className="relative">
                {/* Línea de tiempo */}
                <div className="hidden lg:block absolute top-8 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200">
                  <div 
                    className="absolute top-0 left-0 w-full bg-gray-900 transition-all duration-2000 ease-out"
                    style={{ height: `${lineProgress}%` }}
                  />
                </div>

                {/* Línea de tiempo móvil */}
                <div className="lg:hidden absolute top-8 left-8 w-1 h-full bg-gray-200">
                  <div 
                    className="absolute top-0 left-0 w-full bg-gray-900 transition-all duration-2000 ease-out"
                    style={{ height: `${lineProgress}%` }}
                  />
                </div>

                <div className="space-y-8 lg:space-y-12">
                  {[
                    {
                      step: "01",
                      title: "Consulta inicial",
                      description: "Posterior al envío del brief, analizamos tus necesidades y objetivos en una reunión gratuita de 30 minutos.",
                      icon: FaHeadset
                    },
                    {
                      step: "02", 
                      title: "Propuesta personalizada",
                      description: "Creamos una propuesta detallada con cronograma, presupuesto y alcance del proyecto.",
                      icon: FaRocket
                    },
                    {
                      step: "03",
                      title: "Desarrollo",
                      description: "Trabajamos en tu proyecto con comunicación constante y entregas parciales.",
                      icon: FaCheckCircle
                    },
                    {
                      step: "04",
                      title: "Lanzamiento y soporte",
                      description: "Lanzamos tu proyecto y te brindamos soporte continuo para su éxito.",
                      icon: FaCalendar
                    }
                  ].map((process, index) => (
                    <div 
                      key={index} 
                      ref={(el) => {
                        if (el) stepRefs.current[index] = el;
                      }}
                      data-step-index={index}
                      className={`relative flex items-start lg:items-center ${
                        index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                      } transition-all duration-700 ease-out ${
                        visibleSteps.includes(index) 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-8'
                      }`}
                    >
                      {/* Punto de la línea de tiempo */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className={`w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto transition-all duration-500 ${
                          visibleSteps.includes(index) 
                            ? 'scale-100 opacity-100' 
                            : 'scale-75 opacity-0'
                        }`}>
                          <process.icon className="text-white text-xl" />
                        </div>
                      </div>

                      {/* Contenido del paso */}
                      <div className={`ml-6 sm:ml-8 lg:ml-12 lg:w-1/2 ${
                        index % 2 === 0 ? 'lg:pr-4 lg:pr-8' : 'lg:pl-4 lg:pl-8'
                      }`}>
                        <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md focus-within:ring-2 focus-within:ring-gray-300 transition-all duration-300">
                          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <div className="text-xl sm:text-2xl font-bold text-gray-900">{process.step}</div>
                            <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
                              {process.title}
                            </h3>
                          </div>
                          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                            {process.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="text-center mt-20 reveal scroll-entrance bounce-in scroll-stagger-6">
            <div className="bg-gray-50 rounded-2xl p-12 max-w-4xl mx-auto smooth-exit">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 scroll-entrance scroll-stagger-1">
                ¿Listo para impulsar tu negocio?
              </h3>
              <p className="text-xl text-gray-600 mb-8 scroll-entrance slide-left scroll-stagger-2">
                Descubre cómo nuestros servicios pueden transformar tu presencia digital
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.open('https://wa.me/', '_blank')}
                  className="px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg scroll-entrance slide-left scroll-stagger-3 smooth-exit"
                >
                  Solicitar consulta
                </button>
                <button 
                  onClick={() => onNavigate?.('portfolio')}
                  className="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-300 font-medium hover:scale-105 scroll-entrance slide-right scroll-stagger-4 smooth-exit"
                >
                  Ver portafolio
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
