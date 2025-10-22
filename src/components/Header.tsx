import { FaWhatsapp, FaBars, FaX, FaInstagram, FaLinkedin, FaTiktok, FaMagnifyingGlass } from 'react-icons/fa6';
import { useState, useEffect, useRef } from 'react';
import AnimatedButton from './ui/AnimatedButton';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isExiting?: boolean;
}

export default function Header({ currentPage, onNavigate, isExiting = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // Removed sliding indicator; keeping minimal state
  const desktopNavRef = useRef<HTMLDivElement | null>(null);
  const [indicatorLeft, setIndicatorLeft] = useState(0);
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const [indicatorVisible, setIndicatorVisible] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement | null>(null);
  const desktopInputRef = useRef<HTMLInputElement | null>(null);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const mobileSearchRef = useRef<HTMLDivElement | null>(null);

  // Simple site-wide index (pages, services, categories, posts)
  const searchIndex = [
    // Pages
    { label: 'Nosotros', type: 'Página', href: 'home', keywords: 'nosotros agencia sobre nosotros' },
    { label: 'Servicios', type: 'Página', href: 'services', keywords: 'servicios' },
    { label: 'Portafolio', type: 'Página', href: 'portfolio', keywords: 'portafolio proyectos trabajos' },
    { label: 'Blog', type: 'Página', href: 'blog', keywords: 'blog artículos' },
    { label: 'Contacto', type: 'Página', href: 'contact', keywords: 'contacto consulta whatsapp email' },
    // Services
    { label: 'Diseño de Páginas Web', type: 'Servicio', href: 'service-web', keywords: 'web diseño paginas sitio' },
    { label: 'Posicionamiento SEO', type: 'Servicio', href: 'service-seo', keywords: 'seo posicionamiento google' },
    { label: 'Branding', type: 'Servicio', href: 'service-branding', keywords: 'branding identidad marca' },
    // Blog categories (navigate to blog)
    { label: 'Marketing', type: 'Categoría', href: 'blog', keywords: 'marketing' },
    { label: 'SEO', type: 'Categoría', href: 'blog', keywords: 'seo' },
    { label: 'E-commerce', type: 'Categoría', href: 'blog', keywords: 'ecommerce e-commerce' },
    { label: 'Redes Sociales', type: 'Categoría', href: 'blog', keywords: 'redes sociales social' },
    { label: 'Tecnología', type: 'Categoría', href: 'blog', keywords: 'tecnologia tecnología' },
    { label: 'Conversión', type: 'Categoría', href: 'blog', keywords: 'conversion conversión optimizacion optimización' },
    // Blog posts (recientes del listado) -> rutas directas
    { label: 'Tendencias de Marketing Digital 2025', type: 'Artículo', href: '/blog/tendencias-marketing-digital-2025', keywords: 'marketing digital tendencias 2025' },
    { label: '¿Cuales son las redes que más utilizan los E-commerce?', type: 'Artículo', href: '/blog/redes-sociales-ecommerce', keywords: 'ecommerce redes sociales' },
    { label: 'Cómo aumentar la tasa de conversión de tu sitio web', type: 'Artículo', href: '/blog/aumentar-tasa-conversion', keywords: 'conversion optimizacion' },
    { label: 'Posicionamiento SEO: El motor del crecimiento online', type: 'Artículo', href: '/blog/posicionamiento-seo-crecimiento', keywords: 'seo crecimiento' },
    { label: 'Estrategias de contenido para redes sociales', type: 'Artículo', href: '/blog/estrategias-contenido-redes-sociales', keywords: 'contenido redes sociales' },
    { label: 'Inteligencia Artificial en el Marketing Digital', type: 'Artículo', href: '/blog/ia-marketing-digital', keywords: 'ia inteligencia artificial' },
  ];

  const queryTokens = searchQuery
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  const filteredResults = queryTokens.length === 0
    ? []
    : searchIndex
        .map((item) => {
          const haystack = `${item.label} ${item.type} ${item.keywords}`.toLowerCase();
          const matchesAll = queryTokens.every((t) => haystack.includes(t));
          let score = 0;
          if (matchesAll) {
            queryTokens.forEach((t) => {
              if (item.label.toLowerCase().startsWith(t)) score += 3;
              if (item.label.toLowerCase().includes(t)) score += 2;
              if (item.keywords.toLowerCase().includes(t)) score += 1;
            });
          }
          return { item, matchesAll, score };
        })
        .filter((r) => r.matchesAll)
        .sort((a, b) => b.score - a.score)
        .slice(0, 7)
        .map((r) => r.item);

  const highlight = (text: string) => {
    if (queryTokens.length === 0) return text;
    const escaped = queryTokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const re = new RegExp(`(${escaped.join('|')})`, 'ig');
    const parts = text.split(re);
    return parts.map((part, i) =>
      re.test(part) ? (
        <mark key={i} className="bg-yellow-100 text-gray-900 px-0.5 rounded-sm">{part}</mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  useEffect(() => {
    const headerThreshold = () => Math.max(0, window.innerHeight - 80); // after hero (approx), adjust offset if needed
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > headerThreshold());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determinar si los navItems deben ser blancos o negros
  const shouldNavItemsBeWhite = currentPage === 'home' && !isScrolled;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.services-dropdown') && !target.closest('[data-nav-item="services"]')) {
        setIsServicesDropdownOpen(false);
      }
    };

    if (isServicesDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isServicesDropdownOpen]);

  // Close search when clicking outside
  useEffect(() => {
    if (!isSearchOpen) return;
    const handleOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (searchRef.current && !searchRef.current.contains(target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isSearchOpen]);

  // Close mobile search panel when clicking outside
  useEffect(() => {
    if (!isMobileSearchOpen) return;
    const handleOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(target)) {
        setIsMobileSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isMobileSearchOpen]);

  // Autofocus desktop input when opening search
  useEffect(() => {
    if (isSearchOpen) {
      desktopInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  // Sliding indicator removed for a minimal style
  // Animated sliding indicator for active desktop nav link
  useEffect(() => {
    const navRoot = desktopNavRef.current;
    if (!navRoot) return;

    const compute = () => {
      const activeId = currentPage.startsWith('service-') ? 'services' : currentPage;
      const activeEl = navRoot.querySelector(`[data-nav-item="${activeId}"]`) as HTMLElement | null;
      if (!activeEl) {
        setIndicatorVisible(false);
        return;
      }
      const navRect = navRoot.getBoundingClientRect();
      const elRect = activeEl.getBoundingClientRect();
      const left = elRect.left - navRect.left + 8; // slight inset from button padding
      const width = Math.max(0, elRect.width - 16); // inset on both sides
      setIndicatorLeft(left);
      setIndicatorWidth(width);
      setIndicatorVisible(true);
    };

    compute();
    const onResize = () => compute();
    window.addEventListener('resize', onResize);
    const rId = window.requestAnimationFrame(compute);
    return () => {
      window.removeEventListener('resize', onResize);
      window.cancelAnimationFrame(rId);
    };
  }, [currentPage, isServicesDropdownOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { id: 'home', label: 'Nosotros' },
    { id: 'services', label: 'Servicios', hasDropdown: true },
    { id: 'portfolio', label: 'Portafolio' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contacto' },
  ];

  const servicesItems = [
    { id: 'service-web', label: 'Diseño de Páginas Web', description: 'Sitios web que convierten' },
    { id: 'service-seo', label: 'Posicionamiento SEO', description: 'Aparece en Google' },
    { id: 'service-branding', label: 'Branding', description: 'Identidad de marca' },
  ];

  const handleNavClick = (pageId: string) => {
    console.log('Header: Navigating to:', pageId); // Debug log
    onNavigate(pageId);
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
  };

  const handleServicesClick = () => {
    // Si el dropdown está abierto, lo cerramos
    if (isServicesDropdownOpen) {
      setIsServicesDropdownOpen(false);
    } else {
      // Si está cerrado, lo abrimos
      setIsServicesDropdownOpen(true);
    }
  };

  const handleServicesMainClick = () => {
    // Navegar a la página de servicios y cerrar el dropdown
    onNavigate('services');
    setIsServicesDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleServiceClick = (serviceId: string) => {
    onNavigate(serviceId);
    setIsServicesDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      isExiting ? 'exiting' : ''
    } ${
      currentPage === 'home' && !isScrolled
        ? 'bg-transparent py-3 sm:py-4 border-b border-transparent'
        : 'bg-black/20 backdrop-blur-md shadow-lg py-2 border-b border-white/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className={`font-bold transition-colors duration-300 text-xl ${
              shouldNavItemsBeWhite 
                ? 'text-white hover:text-white' 
                : 'text-gray-900 hover:text-gray-700'
            }`}
          >
            Logo
          </button>

          {/* Desktop Navigation LA BARRA DEL MENÚ :V PARA MOVER LA POSICION CON ML PS*/}
          <nav ref={desktopNavRef} className="hidden lg:flex items-center gap-2 relative px-1 py-0.5 ml-32">
            {/* Animated active indicator */}
            <span
              className={`absolute bottom-1 h-[3px] rounded-full transition-all duration-300 ease-out ${
                shouldNavItemsBeWhite ? 'bg-white' : 'bg-gray-900'
              } ${indicatorVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ left: indicatorLeft, width: indicatorWidth }}
              aria-hidden
            />
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                {item.hasDropdown ? (
                  <div className="flex items-center">
                    <button
                      onClick={handleServicesMainClick}
                      data-nav-item={item.id}
                      aria-current={(currentPage === item.id || currentPage.startsWith('service-')) ? 'page' : undefined}
                      className={`text-base font-medium tracking-tight transition-colors duration-200 relative pl-3.5 pr-2.5 py-2 rounded-md ${
                        shouldNavItemsBeWhite
                          ? 'text-white hover:text-white'
                          : 'text-gray-900 hover:text-gray-700'
                      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300`}
                    >
                      {currentPage === item.id || currentPage.startsWith('service-') ? (
                        <span className={shouldNavItemsBeWhite ? 'active-glow-text-white' : 'active-glow-text'}>{item.label}</span>
                      ) : (
                        item.label
                      )}
                    </button>
                    <button
                      onClick={handleServicesClick}
                      data-nav-item="services"
                      aria-current={(currentPage === item.id || currentPage.startsWith('service-')) ? 'page' : undefined}
                      className={`text-base font-medium tracking-tight transition-colors duration-200 relative -ml-1 pl-1.5 pr-2 py-2 rounded-md ${
                        shouldNavItemsBeWhite
                          ? 'text-white hover:text-white'
                          : 'text-gray-900 hover:text-gray-700'
                      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300`}
                    >
                      <svg 
                        className={`w-3 h-3 transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onNavigate(item.id)}
                    data-nav-item={item.id}
                    aria-current={currentPage === item.id ? 'page' : undefined}
                    className={`text-base font-medium tracking-tight transition-colors duration-200 relative px-3.5 py-2 rounded-md ${
                      shouldNavItemsBeWhite
                        ? 'text-white hover:text-white'
                        : 'text-gray-900 hover:text-gray-700'
                    } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300`}
                  >
                    {currentPage === item.id ? (
                      <span className={shouldNavItemsBeWhite ? 'active-glow-text-white' : 'active-glow-text'}>{item.label}</span>
                    ) : (
                      item.label
                    )}
                  </button>
                )}

                 {/* Services Dropdown */}
                 {item.hasDropdown && isServicesDropdownOpen && (
                   <div className="services-dropdown absolute top-full left-0 mt-2 w-80 bg-black/20 backdrop-blur-md rounded-xl shadow-lg border border-white/20 py-2 z-50">
                    {servicesItems.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => handleServiceClick(service.id)}
                        className={`w-full text-left px-4 py-3 hover:bg-white/10 transition-colors duration-200 ${
                          currentPage === service.id ? 'bg-white/10' : ''
                        }`}
                      >
                        <div className="font-medium text-white text-sm">{service.label}</div>
                        <div className="text-xs text-gray-300 mt-1">{service.description}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3 relative">
            {/* Search (desktop) */}
             <div
               ref={searchRef}
               className={`hidden sm:flex items-center overflow-visible border ${isSearchOpen ? 'w-64 pl-2 pr-2.5' : 'w-10 px-2'} h-10 rounded-full transition-all duration-300 ease-out shadow-[0_2px_20px_rgba(0,0,0,0.08)] relative ${
                 shouldNavItemsBeWhite 
                   ? 'bg-transparent border-white backdrop-blur-0' 
                   : 'bg-black/10 border-white/60 backdrop-blur-md'
               }`}
             >
              <button
                type="button"
                aria-label="Buscar"
                onClick={() => setIsSearchOpen((v) => !v)}
                className={`flex items-center justify-center w-6 h-6 ${
                  shouldNavItemsBeWhite 
                    ? 'text-white hover:text-white' 
                    : 'text-gray-900 hover:text-gray-200'
                }`}
              >
                <FaMagnifyingGlass size={16} />
              </button>
              <input
                ref={desktopInputRef}
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setIsSearchOpen(false);
                  if (e.key === 'Enter' && filteredResults.length > 0) {
                    const first = filteredResults[0];
                    if (first.href === 'blog' && searchQuery.trim()) {
                      const qp = new URLSearchParams(window.location.search);
                      qp.set('q', searchQuery.trim());
                      window.history.replaceState(null, '', `?${qp.toString()}`);
                    } else {
                      const qp = new URLSearchParams(window.location.search);
                      qp.delete('q');
                      window.history.replaceState(null, '', qp.toString() ? `?${qp.toString()}` : window.location.pathname);
                    }
                    onNavigate(first.href);
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }
                }}
                className={`outline-none bg-transparent text-sm text-gray-900 font-normal transition-all duration-300 ${isSearchOpen ? 'w-full pl-3' : 'w-0 pl-0'} placeholder:text-gray-300`}
              />
               {/* Suggestions dropdown (desktop) */}
               {isSearchOpen && filteredResults.length > 0 && (
                 <div className="absolute top-[110%] left-0 right-0 bg-black/20 backdrop-blur-md border border-white/20 rounded-xl shadow-xl overflow-hidden z-50">
                  <ul className="max-h-80 overflow-auto">
                    {filteredResults.map((item, idx) => (
                      <li key={idx}>
                        <button
                          className="w-full text-left px-4 py-2.5 hover:bg-white/10 flex items-center justify-between"
                          onClick={() => {
                            if (item.href === 'blog' && searchQuery.trim()) {
                              const qp = new URLSearchParams(window.location.search);
                              qp.set('q', searchQuery.trim());
                              window.history.replaceState(null, '', `?${qp.toString()}`);
                            } else {
                              const qp = new URLSearchParams(window.location.search);
                              qp.delete('q');
                              window.history.replaceState(null, '', qp.toString() ? `?${qp.toString()}` : window.location.pathname);
                            }
                            onNavigate(item.href);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                        >
                           <span className="text-sm text-white">{highlight(item.label)}</span>
                           <span className="text-[11px] text-gray-300 ml-3">{item.type}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* Mobile search trigger hidden here (moved next to menu) */}
            <button type="button" className="hidden" aria-hidden="true">
              <FaMagnifyingGlass size={18} />
            </button>
            {/* Desktop CTA */}
            <AnimatedButton
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2"
              variant={shouldNavItemsBeWhite ? 'transparent-white' : 'default'}
            >
              <FaWhatsapp size={18} />
              <span>Agenda tu consulta</span>
            </AnimatedButton>
          </div>

          {/* Mobile Actions: search + menu */}
          <div className="lg:hidden flex items-center gap-2 relative">
            {/* Mobile search trigger next to menu */}
            <button
              type="button"
              className={`p-2.5 hover:bg-gray-100 rounded-lg transition-colors duration-300 ${
                shouldNavItemsBeWhite 
                  ? 'text-white hover:text-white' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
              aria-label="Abrir búsqueda"
              onClick={() => setIsMobileSearchOpen(true)}
            >
              <FaMagnifyingGlass size={18} />
            </button>
            {/* Mobile search dropdown anchored below icon */}
            {isMobileSearchOpen && (
               <div
                 ref={mobileSearchRef}
                 className="absolute right-0 top-full mt-2 w-[92vw] max-w-sm bg-black/20 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl p-3 z-[120]"
               >
                <div className="flex items-center bg-white/10 border border-white/20 rounded-full px-3 h-10">
                  <FaMagnifyingGlass className="text-white" size={16} />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') setIsMobileSearchOpen(false);
                      if (e.key === 'Enter' && filteredResults.length > 0) {
                        const first = filteredResults[0];
                        if (first.href === 'blog' && searchQuery.trim()) {
                          const qp = new URLSearchParams(window.location.search);
                          qp.set('q', searchQuery.trim());
                          window.history.replaceState(null, '', `?${qp.toString()}`);
                        } else {
                          const qp = new URLSearchParams(window.location.search);
                          qp.delete('q');
                          window.history.replaceState(null, '', qp.toString() ? `?${qp.toString()}` : window.location.pathname);
                        }
                        onNavigate(first.href);
                        setIsMobileSearchOpen(false);
                        setSearchQuery('');
                      }
                    }}
                    className="flex-1 ml-2 outline-none bg-transparent text-sm text-white placeholder:text-gray-300"
                  />
                  <button
                    aria-label="Cerrar"
                    className="ml-2 p-1.5 rounded-md hover:bg-white/10 text-gray-300"
                    onClick={() => setIsMobileSearchOpen(false)}
                  >
                    <FaX size={14} />
                  </button>
                </div>
                <div className="mt-2 max-h-72 overflow-auto">
                  {searchQuery.trim().length === 0 ? (
                    <div className="px-2 py-3 text-sm text-gray-500">Empieza a escribir para ver resultados</div>
                  ) : filteredResults.length === 0 ? (
                    <div className="px-2 py-3 text-sm text-gray-500">No se encontraron resultados</div>
                  ) : (
                    <ul className="divide-y divide-gray-100">
                      {filteredResults.map((item, idx) => (
                        <li key={idx}>
                          <button
                            className="w-full text-left px-3 py-2.5 hover:bg-gray-50"
                            onClick={() => {
                              if (item.href === 'blog' && searchQuery.trim()) {
                                const qp = new URLSearchParams(window.location.search);
                                qp.set('q', searchQuery.trim());
                                window.history.replaceState(null, '', `?${qp.toString()}`);
                              } else {
                                const qp = new URLSearchParams(window.location.search);
                                qp.delete('q');
                                window.history.replaceState(null, '', qp.toString() ? `?${qp.toString()}` : window.location.pathname);
                              }
                              onNavigate(item.href);
                              setIsMobileSearchOpen(false);
                              setSearchQuery('');
                            }}
                          >
                            <div className="text-sm font-medium text-gray-900">{highlight(item.label)}</div>
                            <div className="text-xs text-gray-500">{item.type}</div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2.5 hover:bg-gray-100 rounded-lg transition-colors duration-300 ${
                shouldNavItemsBeWhite 
                  ? 'text-white hover:text-white' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaX size={22} /> : <FaBars size={22} />}
            </button>
          </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden fixed inset-0 z-[100] transition-all duration-150 ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}>
          {/* Overlay */}
          <div 
            className={`absolute inset-0 transition-all duration-200 ${
              isMobileMenuOpen 
                ? 'bg-black/40 backdrop-blur-md backdrop-saturate-150' 
                : 'bg-transparent backdrop-blur-0'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
           {/* Sidebar */}
           <div className={`absolute top-0 right-0 h-full w-80 max-w-[90vw] bg-black/20 backdrop-blur-md shadow-2xl transition-transform duration-200 z-[101] ${
             isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
           }`}>
            <div className="flex flex-col h-full overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between h-16 px-6 border-b border-white/20 bg-transparent mobile-glow">
                <span className="font-semibold text-white text-lg">Menú</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                  aria-label="Close menu"
                >
                  <FaX size={20} />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 p-4 bg-white">
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <div key={item.id}>
                      {item.hasDropdown ? (
                        <div>
                          <div className="flex">
                            <button
                              onClick={handleServicesMainClick}
                              data-nav-item="services"
                              className={`flex-1 text-left py-3 px-4 rounded-l-lg transition-all duration-200 text-base font-medium border border-r-0 ${
                                currentPage === item.id || currentPage.startsWith('service-')
                                  ? 'bg-gray-900 text-white border-gray-900 shadow-sm mobile-glow'
                                  : 'text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900'
                              }`}
                            >
                              {item.label}
                            </button>
                            <button
                              onClick={handleServicesClick}
                              data-nav-item="services"
                              className={`px-4 py-3 rounded-r-lg transition-all duration-200 text-base font-medium border ${
                                currentPage === item.id || currentPage.startsWith('service-')
                                  ? 'bg-gray-900 text-white border-gray-900 shadow-sm mobile-glow'
                                  : 'text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900'
                              }`}
                            >
                              <svg 
                                className={`w-4 h-4 transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          </div>
                          
                          {/* Mobile Services Dropdown */}
                          {isServicesDropdownOpen && (
                            <div className="services-dropdown mt-2 ml-4 space-y-1">
                              {servicesItems.map((service) => (
                                <button
                                  key={service.id}
                                  onClick={() => handleServiceClick(service.id)}
                                  className={`w-full text-left py-2 px-4 rounded-lg transition-all duration-200 text-sm font-medium border ${
                                    currentPage === service.id
                                      ? 'bg-gray-100 text-gray-900 border-gray-300'
                                      : 'text-gray-600 border-gray-100 hover:bg-gray-50 hover:text-gray-900'
                                  }`}
                                >
                                  <div className="font-medium">{service.label}</div>
                                  <div className="text-xs text-gray-500 mt-1">{service.description}</div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() => handleNavClick(item.id)}
                          className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-200 text-base font-medium border ${
                            currentPage === item.id
                              ? 'bg-gray-900 text-white border-gray-900 shadow-sm mobile-glow'
                              : 'text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          {item.label}
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Quick Actions removed per request (leave only main CTA below) */}

                {/* Social Links */}
                <div className="mt-8 pt-4 border-t border-gray-200">
                  <p className="text-gray-600 font-medium mb-3 text-center text-sm">Síguenos</p>
                  <div className="flex justify-center gap-3">
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 text-gray-900 hover:bg-gray-100 transition-colors duration-300 shadow-sm"
                    >
                      <FaInstagram size={18} />
                    </a>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 text-gray-900 hover:bg-gray-100 transition-colors duration-300 shadow-sm"
                    >
                      <FaLinkedin size={18} />
                    </a>
                    <a 
                      href="https://tiktok.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 text-gray-900 hover:bg-gray-100 transition-colors duration-300 shadow-sm"
                    >
                      <FaTiktok size={18} />
                    </a>
                  </div>
                </div>

              </nav>

              {/* CTA Button */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <AnimatedButton
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3 text-base font-medium"
                  variant="default"
                >
                  <FaWhatsapp size={18} />
                  <span>Agenda tu consulta</span>
                </AnimatedButton>
                <div className="mt-3 text-center text-xs text-gray-500">
                  <span>Horario: Lun - Vie 9:00 - 18:00</span>
                </div>
              </div>

              {/* Información útil */}
              <div className="px-4 py-4 border-t border-gray-200 bg-white">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3 text-gray-700">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-900"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V21a1 1 0 01-1 1C10.3 22 2 13.7 2 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z" fill="currentColor"/></svg>
                    <a href="tel:+51999999999" className="hover:text-gray-900 transition-colors">+51 999 999 999</a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-900"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8l8 5 8-5v10H4z" fill="currentColor"/></svg>
                    <a href="mailto:contacto@tuempresa.com" className="hover:text-gray-900 transition-colors">contacto@tuempresa.com</a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-900"><path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 14 6 14s6-8.75 6-14c0-3.314-2.686-6-6-6zm0 8.5A2.5 2.5 0 1112 5a2.5 2.5 0 010 5.5z" fill="currentColor"/></svg>
                    <span>Surco, Lima</span>
                  </div>
                </div>
              </div>

              {/* Footer info from site (placed last) */}
              <div className="px-4 pb-5 pt-3 border-t border-gray-200 bg-white">
                <div className="flex justify-center items-center gap-3 text-xs text-gray-600">
                  <a href="#" className="hover:text-gray-900 transition-colors">Política de privacidad</a>
                  <span className="text-gray-300">•</span>
                  <a href="#" className="hover:text-gray-900 transition-colors">Términos de servicio</a>
                </div>
                <p className="mt-2 text-center text-[11px] text-gray-500">© 2025 Sparktree. Todos los derechos reservados.</p>
              </div>
            </div>
          </div>
        </div>

      <style>{`
        /* Estilos para asegurar que no haya transparencias no deseadas */
        .bg-white {
          background-color: #ffffff !important;
        }
        .bg-gray-100 {
          background-color: #f3f4f6 !important;
        }
        .bg-gray-50 {
          background-color: #f9fafb !important;
        }
        .bg-blue-50 {
          background-color: #eff6ff !important;
        }
        /* Animaciones sutiles constantes para menú móvil */
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 rgba(0,0,0,0); }
          50% { box-shadow: 0 0 22px rgba(17,24,39,0.12); }
        }
        .mobile-glow {
          animation: glowPulse 2.6s ease-in-out infinite;
        }
        @keyframes shineSweep {
          0% { transform: translateX(-160%) skewX(-15deg); opacity: 0; }
          35% { opacity: 0.55; }
          65% { opacity: 0.18; }
          100% { transform: translateX(220%) skewX(-15deg); opacity: 0; }
        }
        .mobile-shine::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 40%;
          height: 100%;
          background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.38) 50%, rgba(255,255,255,0) 100%);
          filter: blur(0.5px);
          animation: shineSweep 2.2s linear infinite;
        }
      `}</style>
    </header>
  );
}