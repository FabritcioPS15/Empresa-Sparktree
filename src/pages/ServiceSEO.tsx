import { useEffect, useRef } from 'react';

interface ServicePageProps {
  onNavigate?: (page: string) => void;
}

export default function ServiceSEO({ onNavigate }: ServicePageProps) {
  const rootRef = useRef<HTMLElement>(null);

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

  return (
    <div className="pt-16 sm:pt-20">
      <section ref={rootRef as any} className="py-12 sm:py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 reveal">Posicionamiento SEO</h1>
          <p className="text-gray-600 text-base sm:text-lg mb-8 reveal slide-left">Nuestro servicio de SEO mejora tu visibilidad en Google y te ayuda a atraer clientes potenciales que realmente buscan tus servicios</p>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-10">
            <div className="rounded-2xl bg-white border border-gray-200 p-4 reveal scale-up">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Incluye</h2>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>Auditoría SEO y plan de acción</li>
                <li>Optimización On-Page</li>
                <li>Mejoras de rendimiento</li>
                <li>Reporting mensual</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-gray-200 aspect-video flex items-center justify-center reveal rotate-in">
              <span className="text-gray-500">gráfico</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="px-5 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium" onClick={() => onNavigate?.('portfolio')}>Ver resultados</button>
            <button className="px-5 py-3 bg-white text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors font-medium" onClick={() => onNavigate?.('services')}>Todos los servicios</button>
          </div>
        </div>
      </section>
    </div>
  );
}


