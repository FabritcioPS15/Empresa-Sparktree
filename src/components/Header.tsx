import { FaWhatsapp, FaBars, FaX, FaInstagram, FaLinkedin, FaTiktok } from 'react-icons/fa6';
import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Sliding indicator removed for a minimal style

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
  ];

  const servicesItems = [
    { id: 'service-web', label: 'Diseño de Páginas Web', description: 'Sitios web que convierten' },
    { id: 'service-seo', label: 'Posicionamiento SEO', description: 'Aparece en Google' },
    { id: 'service-branding', label: 'Branding', description: 'Identidad de marca' },
  ];

  const handleNavClick = (pageId: string) => {
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-150 ${
      isExiting ? 'exiting' : ''
    } ${
      isScrolled 
        ? 'bg-white shadow-lg py-2 border-b border-gray-200' 
        : 'bg-white py-3 sm:py-4 border-b border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className={`font-bold text-gray-900 hover:text-gray-800 transition-colors duration-300 ${
              isScrolled ? 'text-lg' : 'text-xl'
            }`}
          >
            Logo
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 relative px-4 py-2 bg-gray-100 rounded-full border border-gray-200">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                {item.hasDropdown ? (
                  <div className="flex items-center">
                    <button
                      onClick={handleServicesMainClick}
                      data-nav-item={item.id}
                      className={`text-sm font-medium transition-all duration-200 relative px-4 py-2 rounded-l-full group ${
                        currentPage === item.id || currentPage.startsWith('service-')
                          ? 'text-gray-900 underline decoration-2 underline-offset-8'
                          : 'text-gray-700 hover:text-gray-900 hover:underline hover:decoration-2 hover:underline-offset-8'
                      }`}
                    >
                      {item.label}
                    </button>
                    <button
                      onClick={handleServicesClick}
                      className={`text-sm font-medium transition-all duration-200 relative px-2 py-2 rounded-r-full group ${
                        currentPage === item.id || currentPage.startsWith('service-')
                          ? 'text-gray-900'
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
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
                    className={`text-sm font-medium transition-all duration-200 relative px-4 py-2 rounded-full group ${
                      currentPage === item.id
                        ? 'text-gray-900 underline decoration-2 underline-offset-8'
                        : 'text-gray-700 hover:text-gray-900 hover:underline hover:decoration-2 hover:underline-offset-8'
                    }`}
                  >
                    {item.label}
                  </button>
                )}

                {/* Services Dropdown */}
                {item.hasDropdown && isServicesDropdownOpen && (
                  <div className="services-dropdown absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    {servicesItems.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => handleServiceClick(service.id)}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-200 ${
                          currentPage === service.id ? 'bg-gray-50' : ''
                        }`}
                      >
                        <div className="font-medium text-gray-900 text-sm">{service.label}</div>
                        <div className="text-xs text-gray-600 mt-1">{service.description}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 text-sm font-semibold shadow-md hover:shadow-lg"
            >
              <FaWhatsapp size={18} />
              <span>Agenda tu consulta</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaX size={22} /> : <FaBars size={22} />}
            </button>
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
            className={`absolute inset-0 bg-black transition-opacity duration-150 ${
              isMobileMenuOpen 
                ? 'opacity-40 backdrop-blur-sm' 
                : 'opacity-0 backdrop-blur-0'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Sidebar */}
          <div className={`absolute top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl transition-transform duration-200 z-[101] ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="flex flex-col h-full overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200 bg-white mobile-glow">
                <span className="font-semibold text-gray-900 text-lg">Menú</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
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
                            <div className="mt-2 ml-4 space-y-1">
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
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden flex items-center justify-center gap-2.5 w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 font-medium text-base shadow-md hover:shadow-lg mobile-shine mobile-glow"
                >
                  <FaWhatsapp size={18} />
                  <span>Agenda tu consulta</span>
                </a>
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