import { useEffect, useRef } from 'react';
import PageBanner from '@/components/ui/PageBanner';
import { usePageMeta } from '@/hooks/usePageMeta';
import { FaRocket, FaCheck } from 'react-icons/fa6';

interface ServicePageProps {
  onNavigate?: (page: string) => void;
}

export default function ServiceTI({ onNavigate }: ServicePageProps) {
  const rootRef = useRef<HTMLElement>(null);

  usePageMeta({
    title: 'Servicios TI en Lima | SparkTree - Infraestructura y Seguridad',
    description: 'Soluciones de tecnología de la información para empresas en Lima. Infraestructura, ciberseguridad, soporte técnico y optimización de sistemas.',
    url: 'https://sparktree.pe/services/ti',
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Servicios TI",
      "provider": { "@type": "Organization", "name": "SparkTree" },
      "description": "Servicios de tecnología, infraestructura y seguridad informática para empresas",
      "url": "https://sparktree.pe/services/ti"
    }
  });

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
      number: "1",
      title: "Diagnóstico tecnológico",
      description: "Evaluamos infraestructura, sistemas y necesidades.",
      items: ["inventario tecnológico", "evaluación de seguridad", "análisis de procesos"],
      footer: "Nuestro objetivo es entender completamente tu entorno actual"
    },
    {
      number: "2",
      title: "Propuesta de solución",
      description: "Diseñamos una estrategia tecnológica personalizada.",
      items: ["mapa de infraestructura", "selección de herramientas", "plan de implementación"],
      footer: "Una estrategia clara asegura resultados óptimos"
    },
    {
      number: "3",
      title: "Implementación",
      description: "Configuramos herramientas, sistemas o plataformas.",
      items: ["configuración técnica", "instalación de software", "integración de sistemas"],
      footer: "Todo implementado siguiendo mejores prácticas de TI"
    },
    {
      number: "4",
      title: "Optimización",
      description: "Mejoramos el rendimiento y eficiencia operativa."
    },
    {
      number: "5",
      title: "Soporte y mantenimiento",
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
              Servicios de Tecnología de la <br className="hidden md:block" />
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
          <div className="py-24 border-t border-gray-100">
            <div className="text-center mb-20 scroll-entrance">
              <h2 className="text-3xl md:text-5xl font-black text-gray-950 mb-6 tracking-tight">
                Nuestro proceso de diseño y desarrollo web
              </h2>
              <p className="text-lg text-gray-500 max-w-3xl mx-auto font-medium">
                En Spark Tree Studio seguimos un proceso estratégico que garantiza resultados profesionales y alineados con los objetivos de cada cliente.
              </p>
            </div>

            <div className="space-y-12 max-w-4xl mx-auto">
              {processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`relative p-8 md:p-12 bg-white/40 backdrop-blur-xl border border-gray-100 rounded-[3rem] transition-all duration-500 hover:shadow-2xl hover:border-[#41f0a5]/30 scroll-entrance ${idx % 2 === 0 ? 'slide-left' : 'slide-right'}`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="absolute top-8 right-12 text-8xl font-black text-gray-950/5 select-none">{step.number}</div>

                  <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-16 h-16 bg-gray-950 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl group-hover:rotate-6 transition-all">
                      <FaRocket className="text-[#41f0a5] text-2xl" />
                    </div>

                    <div className="flex-1 space-y-6">
                      <h3 className="text-2xl md:text-3xl font-black text-gray-950 tracking-tight">
                        {step.number}. {step.title}
                      </h3>
                      <p className="text-lg text-gray-600 font-medium leading-relaxed">
                        {step.description}
                      </p>

                      {step.items && (
                        <div className="space-y-4">
                          <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Definimos:</p>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                            {step.items.map((item, i) => (
                              <li key={i} className="flex items-center gap-3 group/item">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#41f0a5] group-hover/item:scale-150 transition-transform" />
                                <span className="text-gray-600 font-medium group-hover/item:text-gray-950 transition-colors uppercase text-xs tracking-wider">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {step.footer && (
                        <div className="pt-4 border-t border-gray-100 flex items-center gap-3 text-[#3750f0] font-bold italic">
                          <FaCheck size={14} />
                          <p>{step.footer}</p>
                        </div>
                      )}
                    </div>
                  </div>
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
