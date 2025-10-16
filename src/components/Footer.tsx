import { FormEvent, useEffect, useRef, useState } from 'react';
import { FaInstagram, FaLinkedin, FaTiktok } from 'react-icons/fa6';

interface FooterProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  isExiting?: boolean;
}

export default function Footer({ onNavigate, currentPage, isExiting = false }: FooterProps) {
  const footerRef = useRef<HTMLElement | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const mainLinks = [
    { id: 'home', label: 'Nosotros' },
    { id: 'services', label: 'Servicios' },
    { id: 'portfolio', label: 'Portafolio' },
    { id: 'blog', label: 'Blog' },
  ];

  const socialLinks = [
    { label: 'Instagram', href: 'https://instagram.com', Icon: FaInstagram },
    { label: 'LinkedIn', href: 'https://linkedin.com', Icon: FaLinkedin },
    { label: 'TikTok', href: 'https://tiktok.com', Icon: FaTiktok },
  ];

  function handleNewsletterSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get('email') || '').trim();
    if (!email) return;
    // This is a UI-only demo. Plug into your backend/email provider here.
    // eslint-disable-next-line no-alert
    alert('Gracias por suscribirte');
    e.currentTarget.reset();
  }

  useEffect(() => {
    if (!footerRef.current) return;
    const root = footerRef.current;
    const elementsToReveal = root.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elementsToReveal.forEach((el) => observer.observe(el));
    
    // Observe scroll-entrance elements
    const scrollElements = document.querySelectorAll('.scroll-entrance');
    scrollElements.forEach(el => observer.observe(el));
    
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setShowBackToTop(y > 240);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <footer ref={footerRef} className={`bg-white border-t border-gray-200 relative overflow-hidden component-exit ${
      isExiting ? 'exiting' : ''
    }`}>
      {/* Decorative background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-gray-50 to-white" />
      {/* Soft top wave (under shimmer) */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 left-0 right-0 w-full text-gray-200 opacity-60"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path fill="currentColor" d="M0,64L48,58.7C96,53,192,43,288,53.3C384,64,480,96,576,106.7C672,117,768,107,864,96C960,85,1056,75,1152,64C1248,53,1344,43,1392,37.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
      </svg>
      {/* Shimmer gradient bar */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer" />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="reveal scroll-entrance fast slide-left fast-stagger-1">
            {mainLinks.map((link, index) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`block mb-3 text-left transition-all duration-300 link-underline smooth-exit ${
                  currentPage === link.id
                    ? 'text-gray-900 font-semibold scale-105'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                {link.label}
                {currentPage === link.id && (
                  <span className="block w-6 h-0.5 bg-gray-900 rounded-full mt-1 transition-all duration-300" />
                )}
              </button>
            ))}
          </div>

          <div className="reveal scroll-entrance fast slide-up fast-stagger-2">
            {socialLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-3 transition-colors smooth-exit"
                style={{ transitionDelay: `${index * 60}ms` }}
                aria-label={link.label}
                title={link.label}
              >
                <link.Icon size={18} />
                <span className="link-underline">{link.label}</span>
              </a>
            ))}
          </div>

          <div className="flex flex-col items-start md:items-end reveal scroll-entrance fast slide-right fast-stagger-3">
            {/* Newsletter */}
            <form onSubmit={handleNewsletterSubmit} className="w-full md:w-auto">
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Tu email"
                  className="w-full md:w-64 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 transition-colors text-sm font-medium smooth-exit"
                >
                  Suscribirme
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 gap-4 reveal scroll-entrance fast slide-up fast-stagger-4">
          <div className="flex items-center gap-4 scroll-entrance fast slide-left fast-stagger-5">
            <button
              onClick={() => onNavigate('home')}
              className="text-gray-700 hover:text-gray-900 transition-colors link-underline smooth-exit"
            >
              Política de privacidad
            </button>
            <span className="text-gray-400">•</span>
            <button
              onClick={() => onNavigate('home')}
              className="text-gray-700 hover:text-gray-900 transition-colors link-underline smooth-exit"
            >
              Términos de servicio
            </button>
          </div>
          <div className="flex items-center gap-3 scroll-entrance fast slide-right fast-stagger-6">
            <div className="text-gray-900 font-bold select-none">
              <span className="inline-block align-middle">Logo - horizontal</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Second Footer - Copyright Section */}
      <div className="bg-gray-50 border-t border-gray-200 scroll-entrance fast slide-up fast-stagger-1">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-center items-center text-sm text-gray-600">
            <span>© 2025 Sparktree. Todos los derechos reservados.</span>
          </div>
        </div>
      </div>
      {/* Floating Back-to-top button */}
      <div className={`fixed bottom-6 left-6 z-50 transition-opacity ${showBackToTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="btn-clone text-gray-800 smooth-exit"
          aria-label="Volver arriba"
        >
          <div className="text justify-center">
            <span>Volver</span>
            <span>arriba</span>
          </div>
          <div className="clone justify-center">
            <span>Volver</span>
            <span>arriba</span>
          </div>
          <svg strokeWidth={2} stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="20px">
            <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
