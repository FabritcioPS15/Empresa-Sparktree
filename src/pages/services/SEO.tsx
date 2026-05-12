import { useEffect, useRef } from 'react';
import PageBanner from '@/components/ui/PageBanner';
import { usePageMeta } from '@/hooks/usePageMeta';

interface ServicePageProps {
  onNavigate?: (page: string) => void;
}

export default function ServiceSEO({ onNavigate }: ServicePageProps) {
  const rootRef = useRef<HTMLElement>(null);

  const breadcrumbs = [
    { label: 'Inicio', path: '/' },
    { label: 'Servicios', path: '/services' },
    { label: 'Posicionamiento SEO' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const timeoutId = setTimeout(() => {
      if (rootRef.current) {
        const elements = rootRef.current.querySelectorAll('.reveal, .scroll-entrance');
        elements.forEach((el) => observer.observe(el));
      }
    }, 80);

    return () => { clearTimeout(timeoutId); observer.disconnect(); };
  }, []);

  usePageMeta({
    title: 'Posicionamiento SEO en Google | SparkTree - Agencia Marketing Digital Lima',
    description: 'Especialistas en SEO para empresas en Lima. Mejoramos tu posicionamiento en Google con estrategias orgánicas efectivas. ¡Aumenta tu visibilidad y atrae más clientes!',
    url: 'https://sparktree.pe/services/seo',
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Posicionamiento SEO",
      "description": "Servicio de optimización SEO para mejorar posicionamiento en Google",
      "provider": {
        "@type": "Organization",
        "name": "SparkTree",
        "url": "https://sparktree.pe"
      },
      "serviceType": "SEO Services",
      "areaServed": "Lima, Perú",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Servicios SEO",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Auditoría SEO"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "SEO On Page"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Link Building"
            }
          }
        ]
      }
    }
  });

  const processSteps = [
    {
      title: "1. Auditoría SEO",
      description: "Analizamos el estado actual de tu web (errores, velocidad, estructura)."
    },
    {
      title: "2. Investigación de palabras clave",
      description: "Identificamos cómo buscan tus clientes en Google."
    },
    {
      title: "3. Optimización On Page",
      description: "Mejoramos títulos, contenido, estructura y experiencia de usuario."
    },
    {
      title: "4. Estrategia de contenido",
      description: "Creamos artículos y páginas orientadas a posicionamiento."
    },
    {
      title: "5. SEO técnico",
      description: "Optimizamos velocidad, indexación y arquitectura web."
    },
    {
      title: "6. Link building",
      description: "Aumentamos la autoridad con enlaces estratégicos."
    },
    {
      title: "7. Monitoreo y mejora continua",
      description: "Medimos resultados y optimizamos constantemente."
    }
  ];

  return (
    <div className="pt-[72px]">
      <PageBanner 
        title="Posicionamiento SEO en Google" 
        subtitle="Dejamos de depender solo de la publicidad pagada."
        breadcrumbs={breadcrumbs}
      />

      <section ref={rootRef as any} className="relative py-16 md:py-24 overflow-hidden bg-white">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#41f0a5]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#3750f0]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Main Hero View - Centered Intro */}
          <div className="text-center mb-16 md:mb-24">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-950 mb-8 tracking-tight reveal">
              Posicionamiento SEO en Google <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">para empresas</span>
            </h1>
          </div>

          {/* Intro Section - Split Layout */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24 md:mb-32">
            <div className="space-y-6 reveal slide-left">
              <p className="text-base md:text-lg text-gray-900 font-bold leading-relaxed">
                Dejamos de depender solo de la publicidad pagada. Optimizamos tu web para que aparezca en los primeros resultados de Google cuando tus clientes en Lima y Perú busquen tus servicios o productos.
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium">
                En SparkTree Studio, desarrollamos estrategias de posicionamiento SEO enfocadas en aumentar tu visibilidad online, atraer tráfico de calidad y generar clientes potenciales de manera orgánica para empresas en Perú.
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium">
                Trabajamos el SEO como un proceso integral que combina análisis, optimización técnica y contenido estratégico.
              </p>
              
              <div className="pt-6 flex justify-center lg:justify-start">
                <button 
                  onClick={() => onNavigate?.('contact')}
                  className="px-8 py-3.5 bg-[#3750f0] text-white rounded-xl font-bold tracking-wide shadow-[0_10px_20px_rgba(55,80,240,0.2)] hover:scale-105 transition-all duration-300 hover:shadow-[0_15px_30px_rgba(55,80,240,0.3)] text-sm md:text-base"
                >
                  Asesoría gratuita
                </button>
              </div>
            </div>

            {/* Illustration Area */}
            <div className="relative flex justify-center items-center reveal scale-up">
              <div className="w-full max-w-md aspect-[4/3] bg-gradient-to-br from-[#41f0a5] to-[#3750f0] rounded-3xl p-8 relative shadow-2xl overflow-hidden group">
                 <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-500 rounded-3xl" />
                 
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[280px] h-[200px] transition-transform duration-700 group-hover:scale-105 flex items-center justify-center">
                    {/* Simulated Browser/Google window */}
                    <div className="absolute inset-x-4 top-10 bottom-4 bg-white/95 rounded-xl shadow-2xl flex flex-col overflow-hidden transform -rotate-3 hover:translate-x-1 hover:-translate-y-1 transition-transform">
                        <div className="h-6 bg-gray-100 border-b border-gray-200 flex items-center px-3 gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-red-400"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        </div>
                        <div className="p-4 space-y-3">
                            <div className="w-20 h-4 bg-gray-200 rounded-md flex items-center px-2"><span className="text-[9px] font-black text-gray-500 tracking-wider">Google</span></div>
                            <div className="w-full h-8 bg-blue-50 border border-blue-100 rounded-md"></div>
                            <div className="w-3/4 h-2 bg-gray-200 rounded-md mt-4"></div>
                            <div className="w-5/6 h-2 bg-gray-100 rounded-md"></div>
                            <div className="w-4/5 h-2 bg-gray-100 rounded-md"></div>
                        </div>
                    </div>

                    {/* Magnifying Glass */}
                    <div className="absolute top-2 -right-4 w-32 h-32 transform rotate-[15deg] group-hover:rotate-[5deg] transition-transform duration-500 z-10 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full border-[6px] border-[#3750f0] bg-white/40 backdrop-blur-[2px] shadow-[0_15px_30px_rgba(55,80,240,0.5)] flex items-center justify-center relative z-20">
                            <span className="font-black text-[#3750f0] text-xl opacity-90 drop-shadow-sm">SEO?</span>
                        </div>
                        <div className="w-5 h-14 bg-blue-900 rounded-b-[10px] rounded-t-sm transform -translate-y-2 relative z-10 shadow-xl"></div>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Process Section */}
          <div className="py-16 md:py-24 border-t border-gray-100">
            <div className="text-center mb-12 md:mb-20 scroll-entrance">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-950 mb-4 tracking-tight">
                Nuestro proceso SEO
              </h2>
              <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto font-medium px-4">
                En Spark Tree Studio seguimos un proceso estratégico que garantiza resultados profesionales y alineados con los objetivos de cada cliente.
              </p>
            </div>

            <div className="space-y-4 md:space-y-6 max-w-3xl mx-auto px-4">
              {processSteps.map((step, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border-2 border-[#3750f0]/60 hover:border-[#3750f0] rounded-xl p-5 md:p-8 text-left transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_20px_rgba(55,80,240,0.08)] scroll-entrance slide-up group"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <h3 className="text-lg md:text-xl font-bold text-gray-950 mb-1 group-hover:text-[#3750f0] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 font-medium">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="py-16 md:py-24 border-t border-gray-100">
            <div className="text-center mb-10 md:mb-16 scroll-entrance">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-950 mb-4 tracking-tight">
                Beneficios del SEO
              </h2>
              <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto font-medium px-4">
                Un sitio web optimizado ofrece múltiples ventajas para el crecimiento de una empresa.
              </p>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto px-4">
              {[
                "Más visibilidad en Google",
                "Tráfico constante sin pagar publicidad",
                "Mayor generación de clientes potenciales",
                "Posicionamiento de marca a largo plazo",
                "Mejor retorno de inversión (ROI)"
              ].map((benefit, idx) => (
                <div 
                  key={idx} 
                  className="bg-gradient-to-r from-[#3750f0] to-[#41f0a5] rounded-xl p-5 md:p-6 text-white text-center md:text-left transition-all duration-300 shadow-[0_4px_10px_rgba(55,80,240,0.1)] hover:shadow-[0_12px_24px_rgba(55,80,240,0.2)] hover:-translate-y-1 block md:flex md:items-center scroll-entrance slide-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <p className="font-bold text-base md:text-lg tracking-wide w-full">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-16 md:mt-24 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 reveal bounce-in">
            <button 
              onClick={() => onNavigate?.('portfolio')}
              className="px-8 py-4 bg-gray-950 text-white rounded-xl font-black shadow-xl hover:scale-105 transition-all duration-300 tracking-widest uppercase text-sm"
            >
              Ver resultados
            </button>
            <button 
              onClick={() => onNavigate?.('services')}
              className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-950 rounded-xl font-black hover:border-[#3750f0] transition-all duration-300 tracking-widest uppercase text-sm"
            >
              Explorar otros servicios
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}


