import { useEffect, useRef } from 'react';
import PageBanner from '@/components/ui/PageBanner';

interface ServicePageProps {
  onNavigate?: (page: string) => void;
}

export default function ServiceTI({ onNavigate }: ServicePageProps) {
  const rootRef = useRef<HTMLElement>(null);

  const breadcrumbs = [
    { label: 'Inicio', path: '/' },
    { label: 'Servicios', path: '/services' },
    { label: 'Servicios TI' }
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
      title: "1. Diagnóstico tecnológico",
      description: "Evaluamos infraestructura, sistemas y necesidades."
    },
    {
      title: "2. Propuesta de solución",
      description: "Diseñamos una estrategia tecnológica personalizada."
    },
    {
      title: "3. Implementación",
      description: "Configuramos herramientas, sistemas o plataformas."
    },
    {
      title: "4. Optimización",
      description: "Mejoramos el rendimiento y eficiencia operativa."
    },
    {
      title: "5. Soporte y mantenimiento",
      description: "Acompañamiento continuo y solución de incidencias."
    }
  ];

  return (
    <div className="pt-[72px]">
      <PageBanner 
        title="Servicios de Tecnología (TI)" 
        subtitle="Impulsamos la eficiencia y seguridad tecnológica."
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
              Servicios de Tecnología de la <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">Información (TI) para empresas</span>
            </h1>
          </div>

          {/* Intro Section - Split Layout */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24 md:mb-32">
            <div className="space-y-6 reveal slide-left">
              <p className="text-base md:text-lg text-gray-900 font-bold leading-relaxed">
                Impulsamos la eficiencia y seguridad tecnológica de tu negocio.
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium">
                En SparkTree Studio, ofrecemos soluciones de TI que permiten a las empresas optimizar sus procesos, proteger su información y mejorar su rendimiento digital.
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium">
                Integramos tecnología estratégica para que tu empresa opere de forma más ágil, segura y escalable.
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
                 <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-500 rounded-3xl" />
                 
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[300px] h-[220px] transition-transform duration-700 group-hover:scale-105 flex items-center justify-center">
                    {/* Simulated Server Rack / Database */}
                    <div className="absolute top-0 left-4 w-20 h-24 bg-gray-900 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-gray-700 flex flex-col justify-evenly p-2 z-20">
                        <div className="w-full h-3 bg-gray-800 rounded flex items-center px-1 gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_5px_#41f0a5] animate-pulse"></div>
                          <div className="flex-1 h-0.5 bg-gray-600"></div>
                        </div>
                        <div className="w-full h-3 bg-gray-800 rounded flex items-center px-1 gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_5px_#41f0a5] animate-pulse delay-75"></div>
                          <div className="flex-1 h-0.5 bg-gray-600"></div>
                        </div>
                        <div className="w-full h-3 bg-gray-800 rounded flex items-center px-1 gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_5px_#3750f0] animate-pulse delay-150"></div>
                          <div className="flex-1 h-0.5 bg-gray-600"></div>
                        </div>
                    </div>

                    {/* Central Cloud Node */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-24 bg-white/30 backdrop-blur-md rounded-full shadow-[0_0_40px_rgba(255,255,255,0.4)] flex items-center justify-center z-10 border border-white/40 group-hover:bg-white/40 transition-colors">
                      <div className="absolute -top-6 left-8 w-16 h-16 bg-white/30 rounded-full"></div>
                      <div className="absolute -top-8 right-6 w-20 h-20 bg-white/30 rounded-full"></div>
                      <div className="w-16 h-1 bg-white/80 rounded-full z-20 shadow-[0_0_10px_rgba(255,255,255,1)]"></div>
                    </div>

                    {/* Connecting Lines */}
                    <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                      <line x1="60" y1="80" x2="110" y2="110" stroke="#fcd34d" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
                      <line x1="200" y1="120" x2="250" y2="160" stroke="#fcd34d" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse delay-100" />
                      <line x1="220" y1="80" x2="180" y2="100" stroke="#fcd34d" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse delay-200" />
                    </svg>

                    {/* Code Terminal */}
                    <div className="absolute bottom-4 left-6 w-28 h-20 bg-gray-950 rounded-lg shadow-xl border border-gray-800 p-2 text-xs font-mono z-20">
                      <div className="flex gap-1 mb-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-[#41f0a5] opacity-80 text-[8px]">&gt; sys config</div>
                      <div className="text-white opacity-60 text-[8px] mt-1">Status: OK</div>
                    </div>

                    {/* Security Object */}
                    <div className="absolute bottom-6 right-6 w-24 h-16 bg-[#3750f0] rounded-xl shadow-lg border border-blue-400/50 flex items-center justify-center z-20">
                      <div className="w-8 h-8 rounded-full border-4 border-white flex items-center justify-center shadow-inner">
                        <div className="w-3 h-3 bg-white rounded-sm"></div>
                      </div>
                    </div>

                    {/* Document/Folder */}
                    <div className="absolute top-2 right-4 w-16 h-14 bg-yellow-400 rounded-lg shadow-[0_5px_15px_rgba(0,0,0,0.3)] z-10 transform rotate-12 flex flex-col">
                      <div className="h-3 w-8 bg-yellow-500 rounded-t-lg"></div>
                      <div className="flex-1 bg-yellow-300 rounded-b-lg rounded-tr-lg border border-yellow-400"></div>
                    </div>

                 </div>
              </div>
            </div>
          </div>

          {/* Process Section */}
          <div className="py-16 md:py-24 border-t border-gray-100">
            <div className="text-center mb-12 md:mb-20 scroll-entrance">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-950 mb-4 tracking-tight">
                Nuestro proceso de TI
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
                Beneficios del TI
              </h2>
              <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto font-medium px-4">
                Una infraestructura tecnológica sólida ofrece múltiples ventajas para el crecimiento de una empresa.
              </p>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto px-4">
              {[
                "Mayor eficiencia operativa",
                "Reducción de errores y tiempos",
                "Seguridad de la información",
                "Escalabilidad del negocio",
                "Mejor toma de decisiones con tecnología"
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
              onClick={() => onNavigate?.('contact')}
              className="px-8 py-4 bg-gray-950 text-white rounded-xl font-black shadow-xl hover:scale-105 transition-all duration-300 tracking-widest uppercase text-sm"
            >
              Contactar asesor
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
