import { useEffect, useRef } from 'react';

export default function Services() {
  const servicesRef = useRef<HTMLElement>(null);

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
          <h1 className="text-5xl font-bold text-gray-900 mb-20 leading-tight reveal scroll-entrance initial-visible">
            <span className="inline-block scroll-stagger-1">Nuestros servicios,</span>
            <br />
            <span className="inline-block scroll-stagger-2">impulsan resultados</span>
          </h1>

          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-12 items-center reveal hover:scale-105 transition-all duration-500 group scroll-entrance scale-up scroll-stagger-${index + 3}`}
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
                    <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg">
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

          <div className="text-center mt-20 reveal scroll-entrance bounce-in scroll-stagger-6">
            <div className="bg-gray-50 rounded-2xl p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 scroll-entrance scroll-stagger-1">
                ¿Listo para impulsar tu negocio?
              </h3>
              <p className="text-xl text-gray-600 mb-8 scroll-entrance slide-left scroll-stagger-2">
                Descubre cómo nuestros servicios pueden transformar tu presencia digital
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg scroll-entrance slide-left scroll-stagger-3">
                  Solicitar consulta
                </button>
                <button className="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-300 font-medium hover:scale-105 scroll-entrance slide-right scroll-stagger-4">
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
