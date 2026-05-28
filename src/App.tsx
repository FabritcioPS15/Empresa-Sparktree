import { useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import { Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from './components/Header';
import CustomLoader from './components/common/CustomLoader';

import Home from './pages/home';
import Blog from './pages/blog';
import BlogPost from './pages/blog/Post';
import Portfolio from './pages/portfolio';
import Services from './pages/services';
import ServiceWeb from './pages/services/Web';
import ServiceSEO from './pages/services/SEO';
import ServiceBranding from './pages/services/Branding';
import ServiceTI from './pages/services/TI';
import SparkBots from './pages/services/SparkBots';
import Privacy from './pages/privacy';
import ProjectDetail from './pages/portfolio/ProjectDetail';
import Contact from './pages/contact';
import FloatingQuoteBar from './components/ui/FloatingQuoteBar';
import Nosotros from './pages/nosotros';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import PortfolioEditor from './pages/admin/PortfolioEditor';

// Blog article pages
import TendenciasMarketingDigital2025 from './pages/blog/tendencias-marketing-digital-2025';
import RedesSocialesEcommerce from './pages/blog/redes-sociales-ecommerce';
import PosicionamientoSeoCrecimiento from './pages/blog/posicionamiento-seo-crecimiento';
import EstrategiasContenidoRedesSociales from './pages/blog/estrategias-contenido-redes-sociales';
import IaMarketingDigital from './pages/blog/ia-marketing-digital';
import AumentarTasaConversion from './pages/blog/aumentar-tasa-conversion';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loader for at least 2 seconds for aesthetic impact
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Función para obtener la página actual basada en la URL
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/blog') return 'blog';
    if (path === '/portfolio') return 'portfolio';
    if (path === '/services') return 'services';
    if (path === '/services/web') return 'service-web';
    if (path === '/services/seo') return 'service-seo';
    if (path === '/services/branding') return 'service-branding';
    if (path === '/services/ti') return 'service-ti';
    if (path === '/services/bots') return 'service-bots';
    if (path === '/privacy') return 'privacy';
    if (path === '/nosotros') return 'nosotros';
    if (path === '/contact') return 'contact';
    if (path.startsWith('/blog/')) return 'blog-post';
    if (path.startsWith('/portfolio/')) return 'project-detail';
    if (path === '/admin/portfolio' || path === '/PortfolioEditor') return 'admin-portfolio';
    return ''; // No page active if not matched
  };

  const currentPage = getCurrentPage();

  const handleNavigate = (page: string) => {
    if (isExiting) return;
    
    let path = '/';
    if (page.startsWith('/')) {
      path = page;
    } else {
      switch (page) {
        case 'home':
          path = '/';
          break;
        case 'blog':
          path = '/blog';
          break;
        case 'portfolio':
          path = '/portfolio';
          break;
        case 'services':
          path = '/services';
          break;
        case 'service-web':
          path = '/services/web';
          break;
        case 'service-seo':
          path = '/services/seo';
          break;
        case 'service-branding':
          path = '/services/branding';
          break;
        case 'service-ti':
          path = '/services/ti';
          break;
        case 'service-bots':
          path = '/services/bots';
          break;
        case 'privacy':
          path = '/privacy';
          break;
        case 'nosotros':
          path = '/nosotros';
          break;
        case 'contact':
          path = '/contact';
          break;
        case 'admin-portfolio':
          path = '/PortfolioEditor'; // Default this to what user expects now
          break;
        default:
          path = '/';
      }
    }


    setIsExiting(true);
    
    setTimeout(() => {
      navigate(path);
      setIsExiting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  const handleViewPost = (slug: string) => {
    if (isExiting) return;
    
    setIsExiting(true);
    
    setTimeout(() => {
      navigate(`/blog/${slug}`);
      setIsExiting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  const handleBackToBlog = () => {
    if (isExiting) return;
    
    setIsExiting(true);
    
    setTimeout(() => {
      navigate('/blog');
      setIsExiting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  const handleViewProject = (projectId: string) => {
    if (isExiting) return;
    
    setIsExiting(true);
    
    setTimeout(() => {
      navigate(`/portfolio/${projectId}`);
      setIsExiting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  

  return (
    <ReactLenis root>
      {isLoading && <CustomLoader />}
      <div className={`min-h-screen bg-white transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>

        <Header 
          currentPage={currentPage} 
          onNavigate={handleNavigate} 
          isExiting={isExiting}
        />
        <main className={`page-exit ${isExiting ? 'exiting' : ''}`}>
          <Routes>
            <Route path="/" element={<Home onNavigate={handleNavigate} />} />
            <Route path="/blog" element={<Blog onViewPost={handleViewPost} />} />
            {/* Explicit blog article routes */}
            <Route path="/blog/tendencias-marketing-digital-2025" element={<TendenciasMarketingDigital2025 />} />
            <Route path="/blog/redes-sociales-ecommerce" element={<RedesSocialesEcommerce />} />
            <Route path="/blog/posicionamiento-seo-crecimiento" element={<PosicionamientoSeoCrecimiento />} />
            <Route path="/blog/estrategias-contenido-redes-sociales" element={<EstrategiasContenidoRedesSociales />} />
            <Route path="/blog/ia-marketing-digital" element={<IaMarketingDigital />} />
            <Route path="/blog/aumentar-tasa-conversion" element={<AumentarTasaConversion />} />
            <Route path="/blog/:slug" element={<BlogPostWrapper onBack={handleBackToBlog} />} />
            <Route path="/portfolio" element={<Portfolio onViewProject={handleViewProject} />} />
            <Route path="/portfolio/:projectId" element={<ProjectDetailWrapper onNavigate={handleNavigate} />} />
            <Route path="/services" element={<Services onNavigate={handleNavigate} />} />
            <Route path="/services/web" element={<ServiceWeb onNavigate={handleNavigate} />} />
            <Route path="/services/seo" element={<ServiceSEO onNavigate={handleNavigate} />} />
            <Route path="/services/branding" element={<ServiceBranding onNavigate={handleNavigate} />} />
            <Route path="/services/ti" element={<ServiceTI onNavigate={handleNavigate} />} />
            <Route path="/services/bots" element={<SparkBots onNavigate={handleNavigate} />} />
            <Route path="/privacy" element={<Privacy onNavigate={handleNavigate} />} />
             <Route path="/contact" element={<Contact />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/admin/portfolio" element={<PortfolioEditor />} />
            <Route path="/PortfolioEditor" element={<PortfolioEditor />} />
          </Routes>
        </main>
        <Footer 
          onNavigate={handleNavigate} 
          currentPage={currentPage} 
          isExiting={isExiting}
        />
        <CookieConsent onNavigate={handleNavigate} />
        <FloatingQuoteBar onNavigate={handleNavigate} />
      </div>
    </ReactLenis>
  );
}

// Wrapper components para pasar props a los componentes que las necesitan
function BlogPostWrapper({ onBack }: { onBack: () => void }) {
  const location = useLocation();
  const slug = location.pathname.split('/')[2];
  return <BlogPost slug={slug} onBack={onBack} />;
}

function ProjectDetailWrapper({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { projectId } = useParams<{ projectId: string }>();
  return <ProjectDetail projectId={projectId} onNavigate={onNavigate} />;
}

export default App;
