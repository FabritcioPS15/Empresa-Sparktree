import { useState } from 'react';
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

  const handleViewPost = (slug: string) => {
    setCurrentBlogSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBlog = () => {
    setCurrentBlogSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    setCurrentPage(page as PageType);
    setCurrentBlogSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main>
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} currentPage={currentPage} />
    </div>
  );
}

export default App;
