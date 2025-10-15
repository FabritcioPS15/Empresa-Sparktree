import { useEffect, useRef } from 'react';
import { TextRevealButton } from '@/components/ui/shadcn-io/text-reveal-button';

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLElement>(null);

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
    <div className="pt-20">
      <section ref={heroRef} className="bg-gray-100 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 scroll-entrance initial-visible">
            <span className="inline-block scroll-stagger-1 hover:scale-110 hover:text-gray-700 transition-all duration-500 cursor-default">Tu página web.</span>
            <br />
            <span className="inline-block scroll-stagger-2 hover:scale-110 hover:text-gray-700 transition-all duration-500 cursor-default">Más ventas en Lima</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 scroll-entrance initial-visible slide-left scroll-stagger-3 hover:text-gray-800 hover:scale-105 transition-all duration-500 cursor-default">
            Creamos experiencias digitales que convierten visitantes en clientes leales
          </p>
          <button className="px-8 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 hover:scale-110 hover:shadow-2xl transition-all duration-500 font-medium scroll-entrance initial-visible bounce-in scroll-stagger-4">
            Quiero una web que venda
          </button>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-gray-100 rounded-2xl p-8 text-center mb-12 scroll-entrance scale-up scroll-stagger-1 hover:bg-gray-200 hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-default">
              <p className="text-gray-600 leading-relaxed hover:text-gray-800 transition-colors duration-500">
                Imagen de la marca, su nombre y de lo que trata
              </p>
            </div>
            <p className="text-gray-600 leading-relaxed text-center scroll-entrance slide-left scroll-stagger-2 hover:text-gray-800 hover:scale-105 transition-all duration-500 cursor-default">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gray-100 rounded-2xl aspect-[4/3] flex items-center justify-center scroll-entrance slide-left scroll-stagger-3 hover:bg-gray-200 hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-default group">
              <p className="text-gray-500 group-hover:text-gray-700 transition-colors duration-500">Imagen referencial del resultado del proyecto</p>
            </div>
            <div className="bg-gray-100 rounded-2xl aspect-[4/3] flex items-center justify-center scroll-entrance slide-right scroll-stagger-4 hover:bg-gray-200 hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-default group">
              <p className="text-gray-500 group-hover:text-gray-700 transition-colors duration-500">Imagen referencial del resultado del proyecto</p>
            </div>
          </div>
        </div>
      </section>

      <section ref={servicesRef} className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center scroll-entrance scroll-stagger-1 hover:text-gray-700 hover:scale-105 transition-all duration-500 cursor-default">
            Nuestros Servicios: Estrategia, Diseño y Crecimiento
          </h2>

          <div className="space-y-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-gray-50 rounded-2xl p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center scroll-entrance scale-up scroll-stagger-${index + 2} hover:bg-gray-100 hover:scale-105 hover:shadow-2xl transition-all duration-500 cursor-default group`}
              >
                <div>
                  <div className="mb-4">
                    {index === 0 && (
                      <TextRevealButton
                        text={service.title}
                        revealColor="#39FF14"
                        strokeColor="#111827"
                        className="text-2xl md:text-3xl tracking-normal"
                      />
                    )}
                    {index === 1 && (
                      <TextRevealButton
                        text={service.title}
                        revealColor="#00E5FF"
                        strokeColor="#111827"
                        className="text-2xl md:text-3xl tracking-normal"
                      />
                    )}
                    {index === 2 && (
                      <TextRevealButton
                        text={service.title}
                        revealColor="#FFA500"
                        strokeColor="#111827"
                        className="text-2xl md:text-3xl tracking-normal"
                      />
                    )}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-800 transition-colors duration-500">{service.description}</p>
                  <button className="px-6 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 hover:scale-110 hover:shadow-lg transition-all duration-500 font-medium">
                    Descubre más
                  </button>
                </div>
                <div className="bg-gray-200 rounded-xl aspect-video flex items-center justify-center group-hover:bg-gray-300 group-hover:scale-105 transition-all duration-500">
                  <span className="text-gray-500 group-hover:text-gray-700 transition-colors duration-500">imagen</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={projectsRef} className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center scroll-entrance scroll-stagger-1">
            <span className="inline-block scroll-stagger-1 hover:scale-110 hover:text-gray-700 transition-all duration-500 cursor-default">Proyectos Recientes</span>
            <br />
            <span className="inline-block scroll-stagger-2 hover:scale-110 hover:text-gray-700 transition-all duration-500 cursor-default">que Impulsamos</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-8">
            {projects.map((project, index) => (
              <div key={project.id} className={`group cursor-pointer scroll-entrance scale-up scroll-stagger-${index + 3} hover:scale-105 transition-all duration-500`}>
                <div className="bg-gray-200 rounded-xl aspect-[3/4] flex items-center justify-center mb-4 group-hover:bg-gray-300 group-hover:shadow-xl transition-all duration-500">
                  <span className="text-gray-500 group-hover:text-gray-700 transition-colors duration-500">imagen</span>
                </div>
                <h3 className="text-center text-gray-900 font-medium group-hover:text-gray-700 transition-colors duration-500">{project.title}</h3>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="text-gray-900 font-medium hover:text-gray-600 hover:scale-110 hover:shadow-lg transition-all duration-500 scroll-entrance bounce-in scroll-stagger-6 px-6 py-3 rounded-lg hover:bg-gray-100">
              Ver más ↓
            </button>
          </div>
        </div>
      </section>

      <section ref={teamRef} className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center scroll-entrance scroll-stagger-1">
            <span className="inline-block scroll-stagger-1 hover:scale-110 hover:text-gray-700 transition-all duration-500 cursor-default">Somos Ciencia &</span><br />
            <span className="inline-block scroll-stagger-2 hover:scale-110 hover:text-gray-700 transition-all duration-500 cursor-default">Creatividad</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {team.map((member, index) => (
              <div key={index} className={`bg-gray-100 rounded-2xl p-12 text-center scroll-entrance scale-up scroll-stagger-${index + 3} hover:bg-gray-200 hover:scale-105 hover:shadow-2xl transition-all duration-500 cursor-default group`}>
                <div className="bg-gray-200 w-32 h-32 rounded-full mx-auto mb-6 group-hover:bg-gray-300 group-hover:scale-110 transition-all duration-500"></div>
                <p className="text-gray-900 font-bold mb-2 group-hover:text-gray-700 transition-colors duration-500">IMAGEN:</p>
                <p className="text-gray-900 font-medium text-lg group-hover:text-gray-700 transition-colors duration-500">{member.name}</p>
                <p className="text-gray-600 text-sm mt-4 group-hover:text-gray-800 transition-colors duration-500">{member.role}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 leading-relaxed max-w-3xl mx-auto scroll-entrance slide-left scroll-stagger-5 hover:text-gray-800 hover:scale-105 transition-all duration-500 cursor-default">
            Ayudamos a las marcas a crecer y destacar en el mercado a través de estrategias de marketing innovadoras y personalizadas, enfocadas en conectar con su audiencia y maximizar su impacto digital
          </p>
        </div>
      </section>
    </div>
  );
}
