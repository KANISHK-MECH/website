import React, { useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';

// Lazy load non-critical components
const About = lazy(() => import('./components/About'));
const Education = lazy(() => import('./components/Education'));
const Internships = lazy(() => import('./components/Internships'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Certifications = lazy(() => import('./components/Certifications'));
const Achievements = lazy(() => import('./components/Achievements'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Loading component
const SectionLoader: React.FC = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-pastel-lavender border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  useEffect(() => {
    // Preload critical images
    const preloadImages = [
      '/KANISHK_R_22ME015-removebg-preview.png',
      '/WhatsApp Image 2025-06-20 at 00.22.32_49ff0e19.jpg',
      '/logo dh.png'
    ];

    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // Initialize database with default data if empty
    const initializeDatabase = () => {
      const hasInternships = localStorage.getItem('portfolio_internships');
      const hasCertifications = localStorage.getItem('portfolio_certifications');
      const hasAchievements = localStorage.getItem('portfolio_achievements');
      const hasProjects = localStorage.getItem('portfolio_projects');
      
      // Initialize as empty arrays if not exists
      if (!hasProjects) {
        localStorage.setItem('portfolio_projects', JSON.stringify([]));
      }
      
      if (!hasCertifications) {
        localStorage.setItem('portfolio_certifications', JSON.stringify([]));
      }
      
      if (!hasInternships || !hasAchievements) {
        // Import and save initial data (excluding projects and certifications)
        import('./data/portfolio').then(({ internships, achievements }) => {
          if (!hasInternships) localStorage.setItem('portfolio_internships', JSON.stringify(internships));
          if (!hasAchievements) localStorage.setItem('portfolio_achievements', JSON.stringify(achievements));
        });
      }
    };

    initializeDatabase();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <main className="relative">
        <Hero />
        
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Education />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Internships />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Certifications />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Achievements />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Footer />
        </Suspense>
      </main>
    </div>
  );
}

export default App;