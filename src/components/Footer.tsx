import { useEffect, useState } from 'react';
import { FaInstagram, FaLinkedin, FaTiktok } from 'react-icons/fa6';

interface FooterProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  isExiting?: boolean;
}

export default function Footer({ onNavigate, currentPage, isExiting = false }: FooterProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 240);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const mainLinks = [
    { id: 'home', label: 'Nosotros' },
    { id: 'services', label: 'Servicios' },
    { id: 'portfolio', label: 'Portafolio' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contacto' },
  ];

  const socialLinks = [
    { label: 'Instagram', href: 'https://instagram.com', Icon: FaInstagram },
    { label: 'LinkedIn', href: 'https://linkedin.com', Icon: FaLinkedin },
    { label: 'Tiktok', href: 'https://tiktok.com', Icon: FaTiktok },
  ];

  const legalLinks = [
    { id: 'privacy', label: 'Política de privacidad' },
    { id: 'terms', label: 'Términos de servicio' },
  ];

  return (
<footer className={`bg-black text-white rounded-t-[90px] mt-auto component-exit ${isExiting ? 'exiting' : ''}`}>      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Main Links */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-white mb-4">Menú</h3>
            {mainLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`block text-left transition-colors duration-300 hover:text-[#41f0a5] ${currentPage === link.id ? 'font-semibold text-[#41f0a5]' : ''}`}>
                {link.label}
              </button>
            ))}
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-white mb-4">Redes</h3>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors duration-300 hover:text-[#41f0a5]">
                <link.Icon size={18} />
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          {/* Logo */}
          <div className="flex items-start justify-start md:justify-end">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-lg font-semibold transition-colors duration-300 hover:text-[#41f0a5]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>SparkTree</span>
            </button>
          </div>
        </div>

        <hr className="border-white my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="transition-colors duration-300 hover:text-white">
                {link.label}
              </button>
            ))}
          </div>
          <p>&copy; {new Date().getFullYear()} SparkTree. Todos los derechos reservados.</p>
        </div>
      </div>

      {/* Floating Back-to-top button */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${showBackToTop ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-white text-black rounded-full p-3 shadow-lg hover:bg-gray-200 hover:scale-110 transition-all duration-300"
          aria-label="Volver arriba"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
