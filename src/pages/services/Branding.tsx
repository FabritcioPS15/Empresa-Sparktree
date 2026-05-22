import { useEffect, useRef } from 'react';
import PageBanner from '@/components/ui/PageBanner';
import { usePageMeta } from '@/hooks/usePageMeta';

interface ServicePageProps {
  onNavigate?: (page: string) => void;
}

export default function ServiceBranding({ onNavigate }: ServicePageProps) {
  const rootRef = useRef<HTMLElement>(null);

  usePageMeta({
    title: 'Branding Estratégico en Lima | SparkTree - Identidad Corporativa',
    description: 'Servicio de branding y diseño de identidad corporativa en Lima. Creamos marcas que conectan, destacan y venden. Logótipo, manual de marca y estrategia visual.',
    url: 'https://sparktree.pe/services/branding',
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Branding Estratégico",
      "provider": { "@type": "Organization", "name": "SparkTree" },
      "description": "Servicio de branding y diseño de identidad corporativa para empresas",
      "url": "https://sparktree.pe/services/branding"
    }
  });

  const breadcrumbs = [
    { label: 'Inicio', path: '/' },
    { label: 'Servicios', path: '/services' },
    { label: 'Branding' }
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

  const processSteps = [
    {
      title: "1. Análisis de marca y mercado",
      description: "Investigamos tu negocio, competencia y público objetivo."
    },
    {
      title: "2. Definición estratégica",
      description: "Creamos el ADN de marca: propósito, valores, personalidad y tono."
    },
    {
      title: "3. Diseño de identidad visual",
      description: "Desarrollamos logotipo, colores, tipografías y estilo visual."
    },
    {
      title: "4. Construcción del mensaje",
      description: "Definimos cómo se comunica tu marca en todos los canales."
    },
    {
      title: "5. Entrega y guía de uso",
      description: "Creamos un manual de marca para asegurar coherencia."
    }
  ];

  return (
    <div className="pt-[72px]">
      <PageBanner 
        title="Branding estratégico para empresas" 
        subtitle="Creamos marcas que conectan, destacan y venden."
        breadcrumbs={breadcrumbs}
      />

      <section ref={rootRef as any} className="relative py-16 md:py-24 overflow-hidden bg-white">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3750f0]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#41f0a5]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Main Hero View - Centered Intro */}
          <div className="text-center mb-16 md:mb-24">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-950 mb-8 tracking-tight reveal">
              Branding estratégico para <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">empresas en Lima</span>
            </h1>
          </div>

          {/* Intro Section - Split Layout */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24 md:mb-32">
            <div className="space-y-6 reveal slide-left">
              <p className="text-lg text-gray-900 font-bold leading-relaxed">
                Creamos marcas que conectan, destacan y venden.
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium">
                En SparkTree Studio, desarrollamos estrategias de branding que van más allá del diseño. Construimos una identidad sólida que comunica claramente quién eres, qué haces y por qué deberían elegirte.
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Ayudamos a las empresas a proyectar una imagen profesional, coherente y diferenciada en todos sus canales digitales.
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Convertimos tu negocio en una marca memorable y de confianza. Más allá de un logo, definimos la voz, los valores y la personalidad que te diferenciarán de tu competencia.
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
              <div className="w-full max-w-md aspect-[4/3] bg-gradient-to-br from-[#3750f0] to-[#41f0a5] rounded-3xl p-8 relative shadow-2xl overflow-hidden group">
                 {/* Sparkle Graphic inspired by mockup */}
                 <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-500 rounded-3xl" />
                 
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 transition-transform duration-700 group-hover:scale-110">
                    {/* Center Spark */}
                    <div 
                      className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-full w-full bg-white/95 shadow-[0_0_40px_rgba(255,255,255,0.6)]"
                      style={{ clipPath: 'polygon(50% 0%, 58% 42%, 100% 50%, 58% 58%, 50% 100%, 42% 58%, 0% 50%, 42% 42%)' }}
                    ></div>
                    
                    {/* Top Left Spark */}
                    <div 
                      className="absolute top-4 left-4 w-16 h-16 bg-white/80"
                      style={{ clipPath: 'polygon(50% 0%, 58% 42%, 100% 50%, 58% 58%, 50% 100%, 42% 58%, 0% 50%, 42% 42%)' }}
                    ></div>

                    {/* Bottom Right Spark */}
                    <div 
                      className="absolute bottom-4 right-4 w-20 h-20 bg-white/80"
                      style={{ clipPath: 'polygon(50% 0%, 58% 42%, 100% 50%, 58% 58%, 50% 100%, 42% 58%, 0% 50%, 42% 42%)' }}
                    ></div>
                 </div>
              </div>
            </div>
          </div>

          {/* Process Section */}
          <div className="py-16 md:py-24 border-t border-gray-100">
            <div className="text-center mb-12 md:mb-20 scroll-entrance">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-950 mb-4 tracking-tight">
                Nuestro proceso de Branding
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
                Beneficios del branding
              </h2>
              <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto font-medium px-4">
                Un branding estratégico ofrece múltiples ventajas para el crecimiento de una empresa.
              </p>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto px-4">
              {[
                "Mayor reconocimiento de marca",
                "Imagen profesional y confiable",
                "Diferenciación frente a la competencia",
                "Conexión emocional con tu audiencia",
                "Base sólida para estrategias de marketing"
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
              Ver portafolio
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


