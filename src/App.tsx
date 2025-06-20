import React, { useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import { usePerformanceOptimization } from './hooks/usePerformanceOptimization';

// Lazy load non-critical components for better initial performance
const About = lazy(() => import('./components/About'));
const Education = lazy(() => import('./components/Education'));
const Internships = lazy(() => import('./components/Internships'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Certifications = lazy(() => import('./components/Certifications'));
const Achievements = lazy(() => import('./components/Achievements'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Loading component for better UX
const SectionLoader: React.FC = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-pastel-lavender border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const { config } = usePerformanceOptimization();

  useEffect(() => {
    // Critical performance optimizations
    const optimizeApp = () => {
      // Disable smooth scrolling on low-end devices
      if (!config.enableAnimations) {
        document.documentElement.style.scrollBehavior = 'auto';
      }

      // Optimize font loading
      if ('fonts' in document) {
        document.fonts.ready.then(() => {
          document.body.classList.add('fonts-loaded');
        });
      }

      // Preload critical resources
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = '/KANISHK_R_22ME015-removebg-preview.png';
      document.head.appendChild(preloadLink);

      // Set CSS custom properties for performance
      document.documentElement.style.setProperty('--enable-animations', config.enableAnimations ? '1' : '0');
      document.documentElement.style.setProperty('--particle-count', config.particleCount.toString());
      
      // Enable hardware acceleration globally
      document.body.style.transform = 'translateZ(0)';
      document.body.style.backfaceVisibility = 'hidden';
    };

    // Use requestIdleCallback for non-critical optimizations
    if ('requestIdleCallback' in window) {
      requestIdleCallback(optimizeApp);
    } else {
      setTimeout(optimizeApp, 0);
    }

    // Cleanup function
    return () => {
      document.body.style.transform = '';
      document.body.style.backfaceVisibility = '';
    };
  }, [config]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 gpu-accelerated">
      <Header />
      <main className="relative">
        {/* Critical above-the-fold content */}
        <Hero />
        
        {/* Lazy-loaded sections with suspense boundaries */}
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