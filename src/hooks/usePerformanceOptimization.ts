import { useEffect, useCallback, useRef } from 'react';

interface PerformanceConfig {
  enableAnimations: boolean;
  reducedMotion: boolean;
  frameRate: number;
  particleCount: number;
}

export const usePerformanceOptimization = () => {
  const frameRef = useRef<number>();
  const lastFrameTime = useRef<number>(0);
  const frameCount = useRef<number>(0);
  const fpsRef = useRef<number>(60);

  // Detect device capabilities
  const getPerformanceConfig = useCallback((): PerformanceConfig => {
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as any).deviceMemory || 4;
    const connection = (navigator as any).connection;
    const isSlowConnection = connection && 
      (connection.effectiveType === 'slow-2g' || 
       connection.effectiveType === '2g');
    
    // Check for reduced motion preference
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Determine performance level
    const isHighEnd = cores >= 8 && memory >= 8 && !isSlowConnection;
    const isMidRange = cores >= 4 && memory >= 4 && !isSlowConnection;
    
    return {
      enableAnimations: !reducedMotion && (isHighEnd || isMidRange),
      reducedMotion,
      frameRate: isHighEnd ? 60 : isMidRange ? 30 : 15,
      particleCount: isHighEnd ? 20 : isMidRange ? 10 : 5
    };
  }, []);

  // Monitor frame rate
  const monitorFrameRate = useCallback(() => {
    const now = performance.now();
    frameCount.current++;
    
    if (now - lastFrameTime.current >= 1000) {
      fpsRef.current = frameCount.current;
      frameCount.current = 0;
      lastFrameTime.current = now;
      
      // Adjust performance based on actual FPS
      if (fpsRef.current < 30) {
        document.documentElement.style.setProperty('--animation-duration', '0.2s');
        document.documentElement.style.setProperty('--particle-count', '3');
      } else if (fpsRef.current < 45) {
        document.documentElement.style.setProperty('--animation-duration', '0.4s');
        document.documentElement.style.setProperty('--particle-count', '8');
      } else {
        document.documentElement.style.setProperty('--animation-duration', '0.6s');
        document.documentElement.style.setProperty('--particle-count', '15');
      }
    }
    
    frameRef.current = requestAnimationFrame(monitorFrameRate);
  }, []);

  // Optimize scroll performance
  const optimizeScrolling = useCallback(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Scroll optimizations here
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Preload critical resources
  const preloadResources = useCallback(() => {
    // Preload fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);

    // Preload critical images
    const criticalImages = [
      '/KANISHK_R_22ME015-removebg-preview.png',
      '/WhatsApp Image 2025-06-20 at 00.22.32_49ff0e19.jpg',
      '/logo dh.png'
    ];

    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    // Start performance monitoring
    frameRef.current = requestAnimationFrame(monitorFrameRate);
    
    // Optimize scrolling
    const cleanupScroll = optimizeScrolling();
    
    // Preload resources
    preloadResources();
    
    // Set initial performance variables
    const config = getPerformanceConfig();
    document.documentElement.style.setProperty('--enable-animations', config.enableAnimations ? '1' : '0');
    document.documentElement.style.setProperty('--particle-count', config.particleCount.toString());
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      cleanupScroll();
    };
  }, [monitorFrameRate, optimizeScrolling, preloadResources, getPerformanceConfig]);

  return {
    config: getPerformanceConfig(),
    currentFPS: fpsRef.current
  };
};