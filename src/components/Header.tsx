import { FaWhatsapp, FaBars, FaX } from 'react-icons/fa6';
import { useState, useEffect } from 'react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isExiting?: boolean;
}

export default function Header({ currentPage, onNavigate, isExiting = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: '0px',
    left: '0px',
    opacity: 0
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update indicator position when currentPage changes
  useEffect(() => {
    const activeItem = document.querySelector(`[data-nav-item="${currentPage}"]`);
    if (activeItem) {
      const rect = activeItem.getBoundingClientRect();
      const navRect = activeItem.parentElement?.getBoundingClientRect();
      if (navRect) {
        setIndicatorStyle({
          width: `${rect.width - 16}px`, // Account for padding
          left: `${rect.left - navRect.left + 8}px`, // Center within button
          opacity: 1
        });
      }
    }
  }, [currentPage]);

  const navItems = [
    { id: 'home', label: 'Nosotros' },
    { id: 'services', label: 'Servicios' },
    { id: 'portfolio', label: 'Portafolio' },
    { id: 'blog', label: 'Blog' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 component-exit overflow-hidden ${
      isExiting ? 'exiting' : ''
    } ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-md shadow-xl py-2 border-b border-white/20' 
        : 'bg-white/60 backdrop-blur-sm shadow-lg py-3 sm:py-4 border-b border-white/10'
    }`}>
      {/* Efecto de nieve/gotas cayendo */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="snowflake"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-300">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className={`font-bold text-gray-900 hover:text-gray-700 transition-all duration-300 smooth-exit ${
              isScrolled ? 'text-lg' : 'text-xl'
            }`}
          >
            Logo
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 relative px-6 py-2 bg-gray-50/50 rounded-full backdrop-blur-sm border border-gray-200/50">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                data-nav-item={item.id}
                className={`nav-item-micro text-sm font-medium transition-all duration-300 relative px-4 py-2 rounded-lg group smooth-exit ${
                  currentPage === item.id
                    ? 'text-gray-900 scale-125 font-bold nav-item-float bg-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:scale-105 hover:bg-white/50'
                }`}
              >
                {item.label}
                {/* Individual item hover indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
              </button>
            ))}
            {/* Adaptive sliding indicator */}
            <div 
              className="absolute bottom-0 h-0.5 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 rounded-full transition-all duration-500 ease-out shadow-lg nav-indicator-pulse"
              style={indicatorStyle}
            />
          </nav>

          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex btn-fill items-center gap-2 px-4 py-2 text-sm font-medium smooth-exit"
            >
              <span className="btn-fill-content flex items-center gap-2">
                <FaWhatsapp size={18} />
                <span>Agenda tu consulta</span>
              </span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors smooth-exit"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaX size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100 mt-4 transform translate-y-0' 
            : 'max-h-0 opacity-0 overflow-hidden transform -translate-y-2'
        }`}>
          <nav className="flex flex-col gap-4 py-4 border-t border-gray-100">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`mobile-nav-item text-left py-3 px-4 rounded-lg transition-all duration-300 smooth-exit ${
                  currentPage === item.id
                    ? 'mobile-nav-item-active text-gray-900 font-semibold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                style={{
                  animationDelay: isMobileMenuOpen ? `${index * 100}ms` : '0ms',
                  animation: isMobileMenuOpen ? 'slideInFromLeft 0.3s ease-out forwards' : 'none'
                }}
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile CTA */}
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fill flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium mt-2 smooth-exit"
            >
              <span className="btn-fill-content flex items-center gap-2">
                <FaWhatsapp size={18} />
                <span>Agenda tu consulta</span>
              </span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
