import { ArrowLeft, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AumentarTasaConversion() {
  const navigate = useNavigate();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }).format(date);
  };

  const title = 'Cómo aumentar la tasa de conversión de tu sitio web';
  const published_date = '2025-10-05';

  return (
    <div className="pt-20">
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <button onClick={() => navigate('/blog')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8">
            <ArrowLeft size={20} />
            <span>Volver al blog</span>
          </button>

          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">{title}</h1>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={18} />
              <time dateTime={published_date}>{formatDate(published_date)}</time>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 leading-relaxed mb-6">
              Consejos prácticos para mejorar el CRO de tu web: velocidad, claridad de oferta y prueba social.
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Tácticas clave</h2>
            <p className="text-gray-600 leading-relaxed mb-6">Optimiza formularios, CTA visibles, y reduce fricción en el checkout.</p>
          </div>
        </div>
      </article>
    </div>
  );
}
