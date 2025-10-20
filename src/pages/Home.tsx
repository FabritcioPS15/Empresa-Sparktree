import { useEffect, useRef, useState } from 'react';
import { TextRevealButton } from '@/components/ui/shadcn-io/text-reveal-button';

interface HomeProps {
  onNavigate?: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Considered "scrolled enough" after 80px
      setHasScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

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
      // Observe reveal elements
      if (heroRef.current) {
        const elements = heroRef.current.querySelectorAll('.reveal');
        elements.forEach(el => observer.observe(el));
      }
      if (servicesRef.current) {
        const elements = servicesRef.current.querySelectorAll('.reveal');
        elements.forEach(el => observer.observe(el));
      }
      if (projectsRef.current) {
        const elements = projectsRef.current.querySelectorAll('.reveal');
        elements.forEach(el => observer.observe(el));
      }
      if (teamRef.current) {
        const elements = teamRef.current.querySelectorAll('.reveal');
        elements.forEach(el => observer.observe(el));
      }
      
      // Observe scroll-entrance elements
      const scrollElements = document.querySelectorAll('.scroll-entrance');
      scrollElements.forEach(el => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const projects = [
    { id: 1, title: 'McDonals - Diseño de Página web' },
    { id: 2, title: 'Coca Cola - Diseño de Página web' },
    { id: 3, title: 'SparkTree - Branding' },
  ];

  const services = [
    {
      title: 'Diseño de Páginas Web',
      description: 'Tu sitio será hermoso, rápido y, lo más importante, intuitivo. Nos enfocamos en la Experiencia del Usuario (UX) para que tus visitantes encuentren lo que necesitan sin fricción y realicen la acción que deseas',
    },
    {
      title: 'Posicionamiento SEO',
      description: 'Dejamos de depender solo de la publicidad pagada. Optimizamos tu web para que aparezca en los primeros resultados de Google cuando tus clientes busquen tus servicios o productos.',
    },
    {
      title: 'Branding',
      description: 'Convertimos tu negocio en una marca memorable y de confianza. Más allá de un logo, definimos la voz, los valores y la personalidad que te diferenciarán de tu competencia.',
    },
  ];

  const team = [
    { name: 'Fabricio Peña', role: 'Desarrollador' },
    { name: 'Roman Reto', role: 'Diseñador UX / UI' },
  ];

  return (
    <div className="pt-0">
      {/* Hero Section */}
      <section ref={heroRef} className={`relative overflow-hidden ${hasScrolled ? 'bg-gray-50 pt-16 sm:pt-20' : 'bg-transparent pt-0'} transition-colors duration-300 min-h-screen flex items-center`}>
        {/* Decorative background only after scroll */}
        {hasScrolled && (
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-gray-200 to-white blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-gray-200 to-white blur-3xl" />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Copy side */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-700 text-xs sm:text-sm mb-4 scroll-entrance initial-visible">
                <span className="inline-block h-2 w-2 rounded-full bg-gray-900" />
                Agencia web en Lima
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-3 sm:mb-4 scroll-entrance initial-visible">
                Convierte visitas en
                <span className="text-gradient"> clientes</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 scroll-entrance initial-visible slide-left">
                Diseñamos y desarrollamos sitios rápidos, claros y orientados a resultados. Menos ruido, más ventas.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start scroll-entrance initial-visible bounce-in">
                <button
                  onClick={() => onNavigate?.('services')}
                  className="px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 font-medium text-sm sm:text-base"
                >
                  Quiero una web que venda
                </button>
                <button
                  onClick={() => onNavigate?.('portfolio')}
                  className="px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 bg-white text-gray-900 rounded-lg border border-gray-200 hover:bg-gray-100 hover:shadow-md transition-all duration-300 font-medium text-sm sm:text-base"
                >
                  Ver portafolio →
                </button>
              </div>

              {/* Trust row */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-gray-600 scroll-entrance initial-visible">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="text-xs sm:text-sm">4.9/5 por 120+ clientes</span>
                </div>
                <div className="hidden sm:block h-4 w-px bg-gray-300" />
                <div className="flex items-center gap-3 opacity-80">
                  <div className="h-6 w-16 bg-gray-200 rounded" />
                  <div className="h-6 w-16 bg-gray-200 rounded" />
                  <div className="h-6 w-16 bg-gray-200 rounded" />
                </div>
              </div>
            </div>

            {/* Visual side */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none scroll-entrance scale-up">
                <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-3 sm:p-4">
                  <div className="rounded-xl bg-gray-200 aspect-video flex items-center justify-center">
                    <span className="text-gray-500">mockup</span>
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-gray-900 text-white text-xs sm:text-sm px-3 py-2 rounded-lg shadow-lg float-slow">
                  +38% tasa de conversión
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Scroll-down indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="scrolldown" style={{ ['--color' as any]: '#111827' }}>
            <div className="chevrons">
              <div className="chevrondown" />
              <div className="chevrondown" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <div className="bg-gray-100 rounded-2xl p-4 sm:p-6 md:p-8 text-center mb-6 sm:mb-8 md:mb-10 scroll-entrance scale-up scroll-stagger-1 hover:bg-gray-200 hover:scale-105 hover:shadow-lg transition-all duration-500 cursor-default smooth-exit">
              <p className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base hover:text-gray-800 transition-colors duration-500">
                Imagen de la marca, su nombre y de lo que trata
              </p>
            </div>
            <p className="text-gray-600 leading-relaxed text-center text-xs sm:text-sm md:text-base px-2 sm:px-0 scroll-entrance slide-left scroll-stagger-2 hover:text-gray-800 hover:scale-105 transition-all duration-500 cursor-default">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12">
            <div className="bg-gray-100 rounded-2xl aspect-[4/3] sm:aspect-[3/2] flex items-center justify-center scroll-entrance slide-left scroll-stagger-3 hover:bg-gray-200 hover:scale-105 hover:shadow-lg transition-all duration-500 cursor-default group smooth-exit p-4">
              <p className="text-gray-500 group-hover:text-gray-700 transition-colors duration-500 text-xs sm:text-sm text-center">
                Imagen referencial del resultado del proyecto
              </p>
            </div>
            <div className="bg-gray-100 rounded-2xl aspect-[4/3] sm:aspect-[3/2] flex items-center justify-center scroll-entrance slide-right scroll-stagger-4 hover:bg-gray-200 hover:scale-105 hover:shadow-lg transition-all duration-500 cursor-default group smooth-exit p-4">
              <p className="text-gray-500 group-hover:text-gray-700 transition-colors duration-500 text-xs sm:text-sm text-center">
                Imagen referencial del resultado del proyecto
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Sections (one per service) */}
      <section ref={servicesRef} className="bg-white">
        {services.map((service, index) => (
          <section
            key={index}
            id={
              index === 0
                ? 'service-diseno'
                : index === 1
                ? 'service-seo'
                : 'service-branding'
            }
            className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} py-10 sm:py-12 md:py-16 lg:py-20`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div
                className={`grid lg:grid-cols-12 gap-6 sm:gap-8 md:gap-10 items-center scroll-entrance scale-up scroll-stagger-${index + 2}`}
              >
                <div className={`${index % 2 === 0 ? 'lg:col-span-6' : 'lg:col-span-6 lg:order-2'}`}>
                  <div className="mb-3 sm:mb-4">
                    <TextRevealButton
                      text={service.title}
                      revealColor="#000000"
                      strokeColor="#111827"
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-normal"
                    />
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg mb-5 sm:mb-6">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => onNavigate?.(index === 0 ? 'service-web' : index === 1 ? 'service-seo' : 'service-branding')} className="px-4 sm:px-5 md:px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 hover:shadow-lg transition-colors duration-300 font-medium text-sm">
                      Ver servicio
                    </button>
                    <button onClick={() => onNavigate?.('portfolio')} className="px-4 sm:px-5 md:px-6 py-2.5 bg-white text-gray-900 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-300 font-medium text-sm">
                      Ver casos →
                    </button>
                  </div>
                </div>
                <div className={`${index % 2 === 0 ? 'lg:col-span-6' : 'lg:col-span-6 lg:order-1'}`}>
                  <div className="rounded-2xl bg-white border border-gray-200 p-3 sm:p-4 shadow-sm">
                    <div className="rounded-xl bg-gray-200 aspect-video flex items-center justify-center">
                      <span className="text-gray-500">imagen</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </section>

      {/* Service Modals removed: direct navigation */}

      {/* Projects Section */}
      <section ref={projectsRef} className="bg-gray-50 py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 text-center px-2 sm:px-0 scroll-entrance scroll-stagger-1">
            <span className="inline-block scroll-stagger-1 hover:scale-105 hover:text-gray-700 transition-all duration-500 cursor-default">
              Proyectos Recientes
            </span>
            <br />
            <span className="inline-block scroll-stagger-2 hover:scale-105 hover:text-gray-700 transition-all duration-500 cursor-default">
              que Impulsamos
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 md:mt-10 lg:mt-12 mb-6 sm:mb-8">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className={`group cursor-pointer scroll-entrance scale-up scroll-stagger-${index + 3} hover:scale-105 transition-all duration-500 smooth-exit`}
              >
                <div className="bg-gray-200 rounded-xl aspect-[4/5] sm:aspect-[3/4] flex items-center justify-center mb-2 sm:mb-3 md:mb-4 group-hover:bg-gray-300 group-hover:shadow-lg transition-all duration-500 p-4">
                  <span className="text-gray-500 group-hover:text-gray-700 transition-colors duration-500 text-xs sm:text-sm">
                    imagen
                  </span>
                </div>
                <h3 className="text-center text-gray-900 font-medium text-xs sm:text-sm md:text-base group-hover:text-gray-700 transition-colors duration-500 px-2">
                  {project.title}
                </h3>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate?.('portfolio')}
              className="text-gray-900 font-medium hover:text-gray-600 hover:scale-105 hover:shadow-lg transition-all duration-500 scroll-entrance bounce-in scroll-stagger-6 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg hover:bg-gray-100 smooth-exit text-xs sm:text-sm md:text-base"
            >
              Ver más ↓
            </button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-center px-2 sm:px-0 scroll-entrance scroll-stagger-1">
            <span className="inline-block scroll-stagger-1 hover:scale-105 hover:text-gray-700 transition-all duration-500 cursor-default">
              Somos Ciencia &
            </span>
            <br />
            <span className="inline-block scroll-stagger-2 hover:scale-105 hover:text-gray-700 transition-all duration-500 cursor-default">
              Creatividad
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12">
            {team.map((member, index) => (
              <div 
                key={index} 
                className={`bg-gray-100 rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 text-center scroll-entrance scale-up scroll-stagger-${index + 3} hover:bg-gray-200 hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-default group smooth-exit`}
              >
                <div className="bg-gray-200 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full mx-auto mb-4 sm:mb-5 md:mb-6 group-hover:bg-gray-300 group-hover:scale-105 transition-all duration-500"></div>
                <p className="text-gray-900 font-bold mb-2 group-hover:text-gray-700 transition-colors duration-500 text-xs sm:text-sm">
                  IMAGEN:
                </p>
                <p className="text-gray-900 font-medium text-sm sm:text-base md:text-lg group-hover:text-gray-700 transition-colors duration-500">
                  {member.name}
                </p>
                <p className="text-gray-600 text-xs sm:text-sm mt-2 sm:mt-3 md:mt-4 group-hover:text-gray-800 transition-colors duration-500">
                  {member.role}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 leading-relaxed max-w-3xl mx-auto text-xs sm:text-sm md:text-base px-4 sm:px-6 md:px-0 scroll-entrance slide-left scroll-stagger-5 hover:text-gray-800 hover:scale-105 transition-all duration-500 cursor-default">
            Ayudamos a las marcas a crecer y destacar en el mercado a través de estrategias de marketing innovadoras y personalizadas, enfocadas en conectar con su audiencia y maximizar su impacto digital
          </p>
        </div>
      </section>
    </div>
  );
}