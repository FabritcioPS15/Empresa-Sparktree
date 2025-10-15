import { useEffect, useRef } from 'react';

interface BlogProps {
  onViewPost: (slug: string) => void;
}

export default function Blog({ onViewPost }: BlogProps) {
  const blogRef = useRef<HTMLElement>(null);

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

    const timeoutId = setTimeout(() => {
      if (blogRef.current) {
        const elements = blogRef.current.querySelectorAll('.reveal');
        elements.forEach(el => observer.observe(el));
      }
      
      const scrollElements = document.querySelectorAll('.scroll-entrance');
      scrollElements.forEach(el => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  // Datos de ejemplo para el blog

  const posts = [
    {
      id: 2,
      title: "¿Cuales son las redes que más utilizan los E-commerce?",
      published_date: "2025-10-11",
      slug: "redes-sociales-ecommerce"
    },
    {
      id: 3,
      title: "El posicionamiento SEO como herramienta de crecimiento",
      published_date: "2025-10-11",
      slug: "posicionamiento-seo-crecimiento"
    },
    {
      id: 4,
      title: "Estrategias de contenido para redes sociales",
      published_date: "2025-10-11",
      slug: "estrategias-contenido-redes-sociales"
    }
  ];

  return (
    <div className="pt-20">
      <section ref={blogRef} className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-gray-900 mb-6 scroll-entrance initial-visible hover:scale-110 hover:text-gray-700 transition-all duration-500 cursor-default">
              Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto scroll-entrance initial-visible hover:text-gray-800 hover:scale-105 transition-all duration-500 cursor-default">
              Entérate de las últimas novedades digitales que pueden ayudar a tu negocio a conseguir el alcance que necesitas.
            </p>
          </div>

          {/* Featured Post */}
          <div className="mb-16 scroll-entrance initial-visible">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center hover:text-gray-700 hover:scale-105 transition-all duration-500 cursor-default">
              Destacar
            </h2>
          </div>

          {/* Posts Grid - 1 grande arriba, 2 pequeños abajo */}
          <div className="space-y-4">
            {/* Primera fila - 1 post grande */}
            <div className="scroll-entrance initial-visible">
              <div className="group cursor-pointer hover:scale-105 transition-all duration-500">
                <div className="bg-gray-100 p-2 hover:bg-gray-200 hover:shadow-xl transition-all duration-500 relative overflow-visible">
                  <div className="grid grid-cols-6 gap-10 items-center">
                    {/* Contenido de texto - 70% */}
                    <div className="col-span-4">
                      <h3 className="text-gray-900 font-bold text-lg mb-3 group-hover:text-gray-700 transition-colors duration-500">
                        {posts[2].title}
                      </h3>
                      <p className="text-gray-500 text-sm group-hover:text-gray-700 transition-colors duration-500">
                        {formatDate(posts[2].published_date)}
                      </p>
                    </div>
                    
                    {/* Imagen - 30% - Más grande y que sobresalga */}
                    <div className="col-span-2 relative">
                      <div className="bg-gray-200 aspect-[3/2] flex items-center justify-center group-hover:bg-gray-300 transition-colors duration-500 relative overflow-hidden transform scale-125 -translate-y-6 -translate-x-24">
                        <span className="text-gray-500 group-hover:text-gray-700 transition-colors duration-500 text-sm">
                          imagen
                        </span>
                        <button
                          onClick={() => onViewPost(posts[2].slug)}
                          className="absolute bottom-2 right-2 px-3 py-1 bg-gray-400 text-gray-900 text-xs hover:bg-gray-500 transition-colors font-medium"
                        >
                          Descubre más
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Segunda fila - 2 posts pequeños */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.slice(0, 2).map((post) => (
                <div key={post.id} className="group cursor-pointer scroll-entrance initial-visible hover:scale-105 transition-all duration-500">
                  <div className="bg-gray-100 overflow-hidden hover:bg-gray-200 hover:shadow-xl transition-all duration-500 relative">
                    {/* Imagen más chata */}
                    <div className="bg-gray-200 aspect-[16/6] flex items-center justify-center group-hover:bg-gray-300 transition-colors duration-500 relative">
                      <span className="text-gray-500 group-hover:text-gray-700 transition-colors duration-500">
                        imagen
                      </span>
                      
                      {/* Título y fecha superpuestos en la imagen */}
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center p-4">
                        <h3 className="text-white font-bold text-base mb-2 group-hover:text-gray-200 transition-colors duration-500 text-center">
                          {post.title}
                        </h3>
                        <p className="text-gray-200 text-xs group-hover:text-gray-300 transition-colors duration-500 mb-4">
                          {formatDate(post.published_date)}
                        </p>
                        
                        {/* Botón superpuesto en la parte inferior de la imagen */}
                        <button
                          onClick={() => onViewPost(post.slug)}
                          className="px-3 py-1 bg-gray-400 text-gray-900 text-xs hover:bg-gray-500 transition-colors font-medium"
                        >
                          Descubre más
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
