import { useEffect, useRef, useState, useMemo } from 'react';
import { Project } from '@/data/projects';
import { supabase } from '@/lib/supabase';
import PageBanner from '@/components/ui/PageBanner';
import { usePageMeta } from '@/hooks/usePageMeta';
import { Laptop, Palette, Film, Settings, Megaphone, LayoutGrid, Sparkles, ArrowUpRight } from 'lucide-react';

interface PortfolioProps {
  onViewProject?: (projectId: string) => void;
}

export default function Portfolio({ onViewProject }: PortfolioProps) {
  const portfolioRef = useRef<HTMLElement>(null);
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('isVisible', true)
        .order('orderRank', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
      } else if (data) {
        setProjectsList(data as Project[]);
      }
      setLoading(false);
    }

    fetchProjects();
  }, []);

  const categories = [
    { id: 'Todos', label: 'Todos', icon: LayoutGrid },
    { id: 'Webs', label: 'Webs', icon: Laptop },
    { id: 'Diseño', label: 'Diseño', icon: Palette },
    { id: 'Multimedia', label: 'Multimedia', icon: Film },
    { id: 'Sistemas', label: 'Sistemas', icon: Settings },
    { id: 'Marketing', label: 'Marketing', icon: Megaphone },
  ];

  // Featured projects filter
  const featuredProjects = useMemo(() => projectsList.filter(p => p.isFeatured), [projectsList]);

  // Map existing categories to main ones for filtering
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'Todos') return projectsList;
    
    return projectsList.filter(p => {
      const cat = p.category.toLowerCase();
      if (activeCategory === 'Webs') return cat.includes('web') || cat.includes('ecommerce') || cat.includes('landing');
      if (activeCategory === 'Diseño') return cat.includes('branding') || cat.includes('diseño');
      if (activeCategory === 'Marketing') return cat.includes('marketing') || cat.includes('seo');
      if (activeCategory === 'Sistemas') return cat.includes('sistemas') || cat.includes('ti');
      if (activeCategory === 'Multimedia') return cat.includes('multimedia') || cat.includes('video');
      return false;
    });
  }, [activeCategory]);

  usePageMeta({
    title: 'Nuestro Portafolio | Empresa SparkTree',
    description: 'Explora nuestro portafolio de diseño web, branding y marketing digital. Proyectos con resultados reales para clientes en Perú e internacional.',
    url: 'https://sparktree.pe/portfolio',
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Portafolio de Empresa SparkTree",
      "description": "Exposición de proyectos destacados en diseño y desarrollo web.",
      "url": "https://sparktree.pe/portfolio"
    }
  });

  const breadcrumbs = [
    { label: 'Inicio', path: '/' },
    { label: 'Nuestro Portafolio' }
  ];

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
      if (portfolioRef.current) {
        const elements = portfolioRef.current.querySelectorAll('.reveal');
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


  return (
    <div className="pt-[72px]">
      <PageBanner 
        title="Nuestro Portafolio" 
        subtitle="Portafolio de diseño web y branding: proyectos con resultados reales."
        breadcrumbs={breadcrumbs}
      />
      <section ref={portfolioRef} className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section: Featured Projects (Carousel) */}
          {featuredProjects.length > 0 && (
            <div className="mb-32">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#41F0A5] rounded-2xl flex items-center justify-center shadow-lg shadow-[#41F0A5]/20 animate-bounce-in">
                    <Sparkles className="w-5 h-5 text-gray-900" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Proyectos Destacados</h2>
                    <p className="text-gray-400 font-medium text-sm">Selección premium de nuestra trayectoria.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => {
                      const container = document.getElementById('featured-carousel');
                      if (container) container.scrollBy({ left: -400, behavior: 'smooth' });
                    }}
                    className="w-12 h-12 rounded-2xl border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors group"
                  >
                    <ArrowUpRight className="w-5 h-5 rotate-[225deg] text-gray-400 group-hover:text-gray-900 transition-colors" />
                  </button>
                  <button 
                    onClick={() => {
                      const container = document.getElementById('featured-carousel');
                      if (container) container.scrollBy({ left: 400, behavior: 'smooth' });
                    }}
                    className="w-12 h-12 rounded-2xl border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors group"
                  >
                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                  </button>
                </div>
              </div>

              <div 
                id="featured-carousel"
                className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {featuredProjects.map((project) => (
                  <div 
                    key={project.id}
                    onClick={() => onViewProject?.(project.id)}
                    className="min-w-[320px] sm:min-w-[450px] lg:min-w-[550px] snap-start group cursor-pointer"
                  >
                    <div className="relative bg-gray-50 rounded-[2.5rem] aspect-[16/10] mb-6 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-1000 border border-gray-100">
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                        <span className="text-gray-300 text-[10px] font-black uppercase tracking-[0.5em] -rotate-45">Sparktree Featured</span>
                      </div>
                      
                      <div className="absolute top-8 left-8 z-20">
                        <span className="bg-white/95 backdrop-blur-md text-gray-900 text-[9px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-sm group-hover:bg-[#41F0A5] transition-colors duration-500">
                          {project.category}
                        </span>
                      </div>

                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out"
                        style={{ background: `linear-gradient(to top, rgba(0,0,0,0.98), rgba(0,0,0,0.6), transparent)` }}
                      ></div>
                      
                      <div className="absolute inset-0 p-10 flex flex-col justify-end translate-y-12 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out z-10">
                        <div className="text-white">
                          <p className="text-4xl font-black leading-tight text-[#41F0A5] mb-2">{project.title}</p>
                          <hr className="border-t border-white/20 my-5 w-0 group-hover:w-full transition-all duration-1000 delay-100" />
                          <p className="text-sm font-medium text-gray-300 leading-relaxed line-clamp-2 mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                            {project.description}
                          </p>
                          <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                            <div className="flex gap-2">
                               {project.technologies.slice(0, 3).map((tech, i) => (
                                 <span key={i} className="text-[8px] font-black uppercase bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 tracking-tighter">{tech}</span>
                               ))}
                            </div>
                            <div className="w-12 h-12 bg-[#41F0A5] rounded-full flex items-center justify-center shadow-xl shadow-[#41F0A5]/30 -rotate-45 group-hover:rotate-0 transition-transform duration-700">
                               <ArrowUpRight className="w-6 h-6 text-gray-900" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-4">
                       <h3 className="text-2xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors duration-300 tracking-tight leading-none">
                         {project.title}
                       </h3>
                       <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mt-3 group-hover:text-indigo-400 transition-colors">
                         {project.client}
                       </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categories and Filters */}
          <div className="mt-20 mb-16">
            <h2 className="text-center text-xs font-black text-gray-300 uppercase tracking-[0.4em] mb-10">Explora por categorías</h2>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 animate-fade-in-scale">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-3 px-8 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                    activeCategory === cat.id 
                      ? 'bg-gray-900 text-white shadow-2xl shadow-gray-400 -translate-y-1' 
                      : 'bg-white border border-gray-100 text-gray-400 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <cat.icon className={`w-4 h-4 ${activeCategory === cat.id ? 'text-[#41F0A5]' : 'text-gray-400'}`} />
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <style>{`
            @keyframes glowPulseMint {
              0%, 100% { text-shadow: 0 0 0 rgba(16,185,129,0); }
              50% { text-shadow: 0 0 10px rgba(110,231,183,0.9), 0 0 18px rgba(16,185,129,0.6); }
            }
            .glow-text { text-shadow: none; transition: text-shadow 200ms ease; }
            .glow-hover:hover .glow-text {
              animation: glowPulseMint 2.2s ease-in-out infinite;
              text-shadow: 0 0 8px rgba(110,231,183,0.75), 0 0 14px rgba(16,185,129,0.45);
            }
          `}</style>

          {/* Regular Uniform Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => onViewProject?.(project.id)}
                className="group cursor-pointer reveal hover:scale-[1.03] transition-all duration-500 scroll-entrance scale-up scroll-stagger-3 relative z-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative bg-gray-50 rounded-[2.5rem] aspect-[4/5] mb-6 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-1000 border border-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <span className="text-gray-300 text-[10px] font-black uppercase tracking-[0.5em] -rotate-45">Sparktree Visual System</span>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-8 left-8 z-20">
                    <span className="bg-white/95 backdrop-blur-md text-gray-900 text-[9px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-sm group-hover:bg-[#41F0A5] transition-colors duration-500">
                      {project.category}
                    </span>
                  </div>

                  {/* Gradient Overlay on Hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out"
                    style={{ background: `linear-gradient(to top, rgba(0,0,0,0.98), rgba(0,0,0,0.6), transparent)` }}
                  ></div>
                  
                  {/* HOVER CONTENT: IMPROVED UI WITH SEPARATOR LINE */}
                  <div className="absolute inset-0 p-10 flex flex-col justify-end translate-y-12 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out z-10">
                    <div className="text-white">
                      <p className="text-3xl font-black leading-tight text-[#41F0A5] mb-2">{project.title}</p>
                      
                      {/* HR Separator requested by user */}
                      <hr className="border-t border-white/20 my-5 w-0 group-hover:w-full transition-all duration-1000 delay-100" />
                      
                      <p className="text-sm font-medium text-gray-300 leading-relaxed line-clamp-3 mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                        {project.description}
                      </p>
                      
                      <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                        <div className="flex gap-2">
                           {project.technologies.slice(0, 2).map((tech, i) => (
                             <span key={i} className="text-[8px] font-black uppercase bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 tracking-tighter">{tech}</span>
                           ))}
                        </div>
                        <div className="w-12 h-12 bg-[#41F0A5] rounded-full flex items-center justify-center shadow-xl shadow-[#41F0A5]/30 -rotate-45 group-hover:rotate-0 transition-transform duration-700">
                           <ArrowUpRight className="w-6 h-6 text-gray-900" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4">
                   <h3 className="text-2xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors duration-300 tracking-tight leading-none">
                     {project.title}
                   </h3>
                   <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mt-3 group-hover:text-indigo-400 transition-colors">
                     {project.client}
                   </p>
                </div>
              </div>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-32">
              <div className="w-12 h-12 border-4 border-[#41F0A5] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredProjects.length === 0 && (
            <div className="text-center py-32 animate-fade-up">
              <div className="w-24 h-24 bg-gray-50 rounded-[2rem] mx-auto mb-8 flex items-center justify-center border border-gray-100">
                <LayoutGrid className="w-12 h-12 text-gray-200" />
              </div>
              <p className="text-gray-400 text-xl font-black tracking-tight uppercase">Próximamente más proyectos</p>
            </div>
          )}

          {/* Final CTA Button */}
          <div className="text-center mt-32 reveal scroll-entrance bounce-in">
            <button className="glow-hover text-gray-900 font-black transition-all duration-500 hover:scale-110 px-12 py-6 bg-white rounded-[2rem] border border-gray-100 shadow-2xl hover:shadow-[#41F0A5]/20 group">
              <span className="glow-text text-xl uppercase tracking-[0.2em]">Ver toda la trayectoria</span>
              <Sparkles className="inline-block ml-4 w-6 h-6 text-[#41F0A5] group-hover:animate-spin" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}