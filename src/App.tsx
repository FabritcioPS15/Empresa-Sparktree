import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import SmoothCursor from './components/ui/SmoothCursor';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import ServiceWeb from './pages/ServiceWeb';
import ServiceSEO from './pages/ServiceSEO';
import ServiceBranding from './pages/ServiceBranding';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import Footer from './components/Footer';

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
    if (path === '/contact') return 'contact';
    if (path.startsWith('/blog/')) return 'blog-post';
    if (path.startsWith('/portfolio/')) return 'project-detail';
    return 'home';
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
        case 'contact':
          path = '/contact';
          break;
        default:
          path = '/';
      }
    }

    // Para la página de contacto, navegación inmediata sin animación
    if (page === 'contact') {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
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

  const handleBackToPortfolio = () => {
    if (isExiting) return;
    
    setIsExiting(true);
    
    setTimeout(() => {
      navigate('/portfolio');
      setIsExiting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Global custom cursor across the whole site */}
      <SmoothCursor visibilityRootSelector="body" primaryColor="#111827" ringColor="rgba(107,114,128,0.18)" enableTap />
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
          <Route path="/contact" element={<Contact onNavigate={handleNavigate} />} />
        </Routes>
      </main>
      <Footer 
        onNavigate={handleNavigate} 
        currentPage={currentPage} 
        isExiting={isExiting}
      />
    </div>
  );
}

// Wrapper components para pasar props a los componentes que las necesitan
function BlogPostWrapper({ onBack }: { onBack: () => void }) {
  const location = useLocation();
  const slug = location.pathname.split('/')[2];
  return <BlogPost slug={slug} onBack={onBack} />;
}

function ProjectDetailWrapper({ onNavigate }: { onNavigate: (page: string) => void }) {
  const location = useLocation();
  const projectId = location.pathname.split('/')[2];
  return <ProjectDetail projectId={projectId} onNavigate={onNavigate} />;
}

export default App;
