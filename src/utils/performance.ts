// Performance utilities for low-end devices
export const isLowEndDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4;
  
  // Check device memory (if available)
  const memory = (navigator as any).deviceMemory || 4;
  
  // Check connection speed
  const connection = (navigator as any).connection;
  const isSlowConnection = connection && 
    (connection.effectiveType === 'slow-2g' || 
     connection.effectiveType === '2g' || 
     connection.effectiveType === '3g');
  
  // Check screen size (mobile devices are often lower-end)
  const isSmallScreen = window.innerWidth < 768;
  
  return cores <= 4 || memory <= 4 || isSlowConnection || isSmallScreen;
};

export const getOptimizedAnimationConfig = () => {
  const isLowEnd = isLowEndDevice();
  
  return {
    // Reduce animation duration for low-end devices
    duration: isLowEnd ? 0.3 : 0.6,
    // Disable complex animations on low-end devices
    enableComplexAnimations: !isLowEnd,
    // Reduce particle count
    particleCount: isLowEnd ? 5 : 15,
    // Simplify easing
    ease: isLowEnd ? "easeOut" : "easeInOut"
  };
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Preload critical resources
export const preloadCriticalImages = () => {
  const criticalImages = [
    '/KANISHK_R_22ME015-removebg-preview.png',
    '/WhatsApp Image 2025-06-20 at 00.22.32_49ff0e19.jpg'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Optimize images for different screen sizes
export const getOptimizedImageSrc = (src: string, width: number): string => {
  // In a real application, you would use a service like Cloudinary or ImageKit
  // For now, we'll return the original src
  return src;
};