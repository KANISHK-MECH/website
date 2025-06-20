import React, { memo, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ChevronDown, Zap, Rocket, Plane } from 'lucide-react';
import { usePerformanceOptimization } from '../hooks/usePerformanceOptimization';
import OptimizedMotion from './OptimizedMotion';

const Hero: React.FC = memo(() => {
  const { config } = usePerformanceOptimization();

  const scrollToNext = useCallback(() => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Memoize animation variants with performance optimization
  const floatingVariants = useMemo(() => {
    const duration = config.enableAnimations ? 15 : 8;
    const easing = config.enableAnimations ? "easeInOut" : "easeOut";
    
    return {
      drone: {
        animate: config.enableAnimations ? {
          x: [0, 50, 100, 150, 100, 50, 0],
          y: [0, -10, -20, -10, 0, 10, 0],
          rotate: [0, 2, -2, 5, -5, 0]
        } : { x: 0, y: 0, rotate: 0 },
        transition: { duration, repeat: Infinity, ease: easing }
      },
      helicopter: {
        animate: config.enableAnimations ? {
          x: [150, 100, 50, 0, 50, 100, 150],
          y: [25, 15, 5, 15, 25, 35, 25],
          rotate: [0, -2, 2, -5, 2, 0]
        } : { x: 150, y: 25, rotate: 0 },
        transition: { duration: duration + 3, repeat: Infinity, ease: easing }
      },
      airplane: {
        animate: config.enableAnimations ? {
          x: [0, 75, 150, 225, 150, 75, 0],
          y: [50, 40, 30, 40, 50, 60, 50],
          rotate: [0, 5, -2, 7, -5, 0]
        } : { x: 0, y: 50, rotate: 0 },
        transition: { duration: duration + 5, repeat: Infinity, ease: easing }
      }
    };
  }, [config.enableAnimations]);

  // Optimized particle system
  const particles = useMemo(() => 
    [...Array(config.particleCount)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2
    })), [config.particleCount]
  );

  return (
    <section 
      id="home" 
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pastel-lavender/20 via-pastel-peach/10 to-pastel-cream/20 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/50 hero-optimized"
    >
      {/* Optimized Background */}
      <div className="absolute inset-0 opacity-30 no-repaint">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(213,170,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(250,208,201,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:50px_50px] optimized-bg" />
      </div>

      {/* GPU-Accelerated Floating Elements */}
      {config.enableAnimations && (
        <>
          <OptimizedMotion
            {...floatingVariants.drone}
            className="absolute top-20 left-10 z-10"
            priority="low"
          >
            <div className="relative hw-accelerated">
              <div className="w-12 h-12 bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-violet-500 rounded-lg flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
          </OptimizedMotion>

          <OptimizedMotion
            {...floatingVariants.helicopter}
            className="absolute top-32 right-20 z-10"
            priority="low"
          >
            <div className="relative hw-accelerated">
              <div className="w-10 h-10 bg-gradient-to-r from-pastel-orange to-pastel-peach dark:from-orange-500 dark:to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <Rocket className="w-5 h-5 text-white" />
              </div>
            </div>
          </OptimizedMotion>

          <OptimizedMotion
            {...floatingVariants.airplane}
            className="absolute bottom-40 left-20 z-10"
            priority="low"
          >
            <div className="relative hw-accelerated">
              <div className="w-8 h-8 bg-gradient-to-r from-pastel-cream to-pastel-pink dark:from-yellow-500 dark:to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                <Plane className="w-4 h-4 text-white" />
              </div>
            </div>
          </OptimizedMotion>
        </>
      )}

      {/* Optimized Particle System */}
      {config.enableAnimations && particles.map((particle) => (
        <motion.div
          key={particle.id}
          animate={{
            y: [0, -60, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 0.8, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeOut"
          }}
          className="absolute w-1 h-1 bg-pastel-lavender dark:bg-purple-400 rounded-full hw-accelerated"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`
          }}
        />
      ))}

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center prevent-layout-shift">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Content Column */}
          <OptimizedMotion
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center lg:text-left"
            priority="high"
          >
            <OptimizedMotion
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="mb-6"
            >
              <span className="inline-block px-6 py-3 bg-gradient-to-r from-pastel-lavender/20 to-pastel-peach/20 dark:from-purple-500/20 dark:to-pink-500/20 backdrop-blur-sm border border-pastel-lavender/30 dark:border-purple-400/50 text-gray-700 dark:text-purple-200 rounded-full text-sm font-medium mb-6 optimized-text">
                🔧 MECHANICAL ENGINEER
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pastel-lavender via-pastel-pink to-pastel-orange dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 mb-4 optimized-text">
                <span className="block">KANISHK</span>
              </h1>
              
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 optimized-text">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pastel-orange to-pastel-peach dark:from-orange-400 dark:to-pink-400">
                  UAV SPECIALIST
                </span>
                <span className="text-gray-600 dark:text-gray-400"> | </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pastel-cream to-pastel-pink dark:from-yellow-400 dark:to-pink-400">
                  CAD MASTER
                </span>
              </div>
            </OptimizedMotion>

            <OptimizedMotion
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed optimized-text"
            >
              <p>
                Pushing the boundaries of mechanical engineering with cutting-edge 
                <span className="text-pastel-lavender dark:text-purple-400 font-semibold"> drone technology</span>, 
                precision <span className="text-pastel-orange dark:text-orange-400 font-semibold">CAD modeling</span>, 
                and revolutionary <span className="text-pastel-pink dark:text-pink-400 font-semibold">mechatronic systems</span>.
              </p>
            </OptimizedMotion>

            <OptimizedMotion
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://github.com/KANISHK-MECH/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 py-4 bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500 hover:from-pastel-pink hover:to-pastel-orange dark:hover:from-pink-500 dark:hover:to-orange-500 text-white font-bold rounded-xl transition-all duration-200 overflow-hidden flex items-center hw-accelerated smooth-transition"
                >
                  <Github className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10">GitHub</span>
                </motion.a>
                
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://www.linkedin.com/in/kanishkrmech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 py-4 bg-gradient-to-r from-pastel-orange to-pastel-peach dark:from-orange-500 dark:to-pink-500 hover:from-pastel-peach hover:to-pastel-cream dark:hover:from-pink-500 dark:hover:to-yellow-500 text-white font-bold rounded-xl transition-all duration-200 overflow-hidden flex items-center hw-accelerated smooth-transition"
                >
                  <Linkedin className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10">LinkedIn</span>
                </motion.a>
              </div>
            </OptimizedMotion>
          </OptimizedMotion>

          {/* Optimized Image Column */}
          <OptimizedMotion
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex justify-center lg:justify-end"
            priority="high"
          >
            <div className="relative hw-accelerated">
              {/* Simplified rings for 60fps */}
              <div className="absolute -inset-6 border border-pastel-lavender/20 dark:border-purple-400/30 rounded-full no-repaint" />
              <div className="absolute -inset-8 border border-pastel-pink/15 dark:border-pink-400/25 rounded-full no-repaint" />

              {/* Main Image Container */}
              <div className="relative w-80 h-80 bg-gradient-to-br from-pastel-lavender/20 via-pastel-peach/20 to-pastel-cream/20 dark:from-purple-900/30 dark:via-gray-800/50 dark:to-pink-900/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-pastel-lavender/30 dark:border-purple-400/50 shadow-xl prevent-layout-shift">
                <div className="w-72 h-72 rounded-full overflow-hidden bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-800/20 dark:to-gray-900/40 border border-white/20 dark:border-gray-600/50">
                  <img 
                    src="/KANISHK_R_22ME015-removebg-preview.png" 
                    alt="Kanishk R - Elite Mechanical Engineer"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>

              {/* Static Tech Icons for better performance */}
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-pastel-orange to-pastel-peach dark:from-orange-500 dark:to-pink-500 rounded-lg flex items-center justify-center shadow-lg hw-accelerated">
                <Rocket className="w-5 h-5 text-white" />
              </div>

              <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-gradient-to-r from-pastel-cream to-pastel-pink dark:from-yellow-500 dark:to-pink-500 rounded-lg flex items-center justify-center shadow-lg hw-accelerated">
                <Plane className="w-5 h-5 text-white" />
              </div>

              <div className="absolute top-1/2 -right-6 w-8 h-8 bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500 rounded-lg flex items-center justify-center shadow-lg hw-accelerated">
                <Zap className="w-4 h-4 text-white" />
              </div>
            </div>
          </OptimizedMotion>
        </div>
      </div>

      {/* Optimized Scroll Indicator */}
      <OptimizedMotion
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-pastel-lavender dark:text-purple-400 hover:text-pastel-pink dark:hover:text-pink-400 transition-colors group cursor-pointer"
        onClick={scrollToNext}
        priority="low"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors optimized-text">Explore More</span>
          <div className="w-8 h-8 border-2 border-pastel-lavender dark:border-purple-400 rounded-full flex items-center justify-center group-hover:border-pastel-pink dark:group-hover:border-pink-400 transition-colors smooth-transition">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </OptimizedMotion>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;