import { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import Footer from './components/Footer';

type PageType = 'home' | 'blog' | 'portfolio' | 'services';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [currentBlogSlug, setCurrentBlogSlug] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [nextPage, setNextPage] = useState<PageType | null>(null);
  const [nextBlogSlug, setNextBlogSlug] = useState<string | null>(null);

  const handleViewPost = (slug: string) => {
    if (isExiting) return;
    
    setIsExiting(true);
    setNextBlogSlug(slug);
    
    setTimeout(() => {
      setCurrentBlogSlug(slug);
      setNextBlogSlug(null);
      setIsExiting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  const handleBackToBlog = () => {
    if (isExiting) return;
    
    setIsExiting(true);
    setNextBlogSlug(null);
    
    setTimeout(() => {
      setCurrentBlogSlug(null);
      setIsExiting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  const renderPage = () => {
    if (currentPage === 'blog' && currentBlogSlug) {
      return <BlogPost slug={currentBlogSlug} onBack={handleBackToBlog} />;
    }

    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'blog':
        return <Blog onViewPost={handleViewPost} />;
      case 'portfolio':
        return <Portfolio />;
      case 'services':
        return <Services />;
      default:
        return <Home />;
    }
  };

  const handleNavigate = (page: string) => {
    if (isExiting) return;
    
    const newPage = page as PageType;
    if (newPage === currentPage) return;
    
    setIsExiting(true);
    setNextPage(newPage);
    
    setTimeout(() => {
      setCurrentPage(newPage);
      setCurrentBlogSlug(null);
      setNextPage(null);
      setIsExiting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        isExiting={isExiting}
      />
      <main className={`page-exit ${isExiting ? 'exiting' : ''}`}>
        {renderPage()}
      </main>
      <Footer 
        onNavigate={handleNavigate} 
        currentPage={currentPage} 
        isExiting={isExiting}
      />
    </div>
  );
}

export default App;
