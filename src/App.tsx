import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Internships from './components/Internships';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { preloadCriticalImages } from './utils/performance';

function App() {
  useEffect(() => {
    // Preload critical images for better performance
    preloadCriticalImages();
    
    // Optimize for low-end devices
    if (typeof window !== 'undefined') {
      // Disable smooth scrolling on low-end devices
      const isLowEnd = navigator.hardwareConcurrency <= 4 || 
                      (navigator as any).deviceMemory <= 4;
      
      if (isLowEnd) {
        document.documentElement.style.scrollBehavior = 'auto';
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <About />
        <Education />
        <Internships />
        <Projects />
        <Skills />
        <Certifications />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;