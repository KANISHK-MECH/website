import React from 'react';
import { motion } from 'framer-motion';
import { Download, Github, Linkedin, ChevronDown, Zap, Rocket, Plane } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pastel-lavender/20 via-pastel-peach/10 to-pastel-cream/20 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/50">
      {/* Soft Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(213,170,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(250,208,201,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(139,92,246,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.2)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Floating Drone Animation with Enhanced Dark Mode Colors */}
      <motion.div
        animate={{
          x: [0, 100, 200, 300, 200, 100, 0],
          y: [0, -20, -40, -20, 0, 20, 0],
          rotate: [0, 5, -5, 10, -10, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 z-10"
      >
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-violet-500 rounded-lg flex items-center justify-center shadow-2xl shadow-pastel-lavender/50 dark:shadow-purple-500/50">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute -top-2 -left-2 w-20 h-20 border-2 border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg"
          />
        </div>
      </motion.div>

      {/* Floating Helicopter */}
      <motion.div
        animate={{
          x: [300, 200, 100, 0, 100, 200, 300],
          y: [50, 30, 10, 30, 50, 70, 50],
          rotate: [0, -5, 5, -10, 5, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-32 right-20 z-10"
      >
        <div className="relative">
          <div className="w-14 h-14 bg-gradient-to-r from-pastel-orange to-pastel-peach dark:from-orange-500 dark:to-pink-500 rounded-full flex items-center justify-center shadow-2xl shadow-pastel-orange/50 dark:shadow-orange-500/50">
            <Rocket className="w-7 h-7 text-white" />
          </div>
          <motion.div
            animate={{ scaleX: [1, 1.2, 1], scaleY: [1, 0.8, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-pastel-orange/60 dark:bg-orange-400/80 rounded-full"
          />
        </div>
      </motion.div>

      {/* Floating Airplane */}
      <motion.div
        animate={{
          x: [0, 150, 300, 450, 300, 150, 0],
          y: [100, 80, 60, 80, 100, 120, 100],
          rotate: [0, 10, -5, 15, -10, 0]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-40 left-20 z-10"
      >
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-r from-pastel-cream to-pastel-pink dark:from-yellow-500 dark:to-pink-500 rounded-lg flex items-center justify-center shadow-2xl shadow-pastel-cream/50 dark:shadow-yellow-500/50">
            <Plane className="w-6 h-6 text-white" />
          </div>
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-6 h-0.5 bg-pastel-cream/60 dark:bg-yellow-400/80"
          />
        </div>
      </motion.div>

      {/* Enhanced Particle Effects for Dark Mode */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          className="absolute w-1 h-1 bg-pastel-lavender dark:bg-purple-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6"
            >
              <motion.span
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(213, 170, 255, 0.3)",
                    "0 0 40px rgba(213, 170, 255, 0.6)",
                    "0 0 20px rgba(213, 170, 255, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block px-6 py-3 bg-gradient-to-r from-pastel-lavender/20 to-pastel-peach/20 dark:from-purple-500/20 dark:to-pink-500/20 backdrop-blur-sm border border-pastel-lavender/30 dark:border-purple-400/50 text-gray-700 dark:text-purple-200 rounded-full text-sm font-medium mb-6"
              >
                🔧 MECHANICAL ENGINEER
              </motion.span>
              
              <motion.h1 
                className="text-5xl sm:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pastel-lavender via-pastel-pink to-pastel-orange dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 mb-4"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              >
                <span className="block">KANISHK</span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pastel-orange to-pastel-peach dark:from-orange-400 dark:to-pink-400">
                  UAV SPECIALIST
                </span>
                <span className="text-gray-600 dark:text-gray-400"> | </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pastel-cream to-pastel-pink dark:from-yellow-400 dark:to-pink-400">
                  CAD MASTER
                </span>
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed"
            >
              Pushing the boundaries of mechanical engineering with cutting-edge 
              <span className="text-pastel-lavender dark:text-purple-400 font-semibold"> drone technology</span>, 
              precision <span className="text-pastel-orange dark:text-orange-400 font-semibold">CAD modeling</span>, 
              and revolutionary <span className="text-pastel-pink dark:text-pink-400 font-semibold">mechatronic systems</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(213, 170, 255, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500 hover:from-pastel-pink hover:to-pastel-orange dark:hover:from-pink-500 dark:hover:to-orange-500 text-white font-bold rounded-xl transition-all duration-300 overflow-hidden"
              >
                <motion.div
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
                <div className="relative flex items-center justify-center">
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume
                </div>
              </motion.button>
              
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 10px 30px rgba(250, 208, 201, 0.4)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  href="https://github.com/KANISHK-MECH/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-pastel-peach/20 dark:bg-gray-800/50 hover:bg-pastel-peach/30 dark:hover:bg-gray-700/70 backdrop-blur-sm border border-pastel-peach/30 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-all duration-300"
                >
                  <Github className="w-6 h-6" />
                </motion.a>
                <motion.a
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 10px 30px rgba(255, 195, 160, 0.4)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  href="https://www.linkedin.com/in/kanishkrmech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-pastel-orange/20 dark:bg-gray-800/50 hover:bg-pastel-orange/30 dark:hover:bg-gray-700/70 backdrop-blur-sm border border-pastel-orange/30 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-all duration-300"
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Image Column with Dark Mode Hologram Effect */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Enhanced Holographic Rings for Dark Mode */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 border-2 border-pastel-lavender/30 dark:border-purple-400/50 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-12 border border-pastel-pink/20 dark:border-pink-400/40 rounded-full"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-16 border border-pastel-cream/10 dark:border-yellow-400/30 rounded-full"
              />

              {/* Main Image Container with Enhanced Dark Mode */}
              <div className="relative w-96 h-96 bg-gradient-to-br from-pastel-lavender/20 via-pastel-peach/20 to-pastel-cream/20 dark:from-purple-900/30 dark:via-gray-800/50 dark:to-pink-900/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-pastel-lavender/30 dark:border-purple-400/50 shadow-2xl shadow-pastel-lavender/20 dark:shadow-purple-500/30">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    boxShadow: [
                      "0 0 50px rgba(213, 170, 255, 0.3)",
                      "0 0 80px rgba(250, 208, 201, 0.4)",
                      "0 0 50px rgba(213, 170, 255, 0.3)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-80 h-80 rounded-full overflow-hidden bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-800/20 dark:to-gray-900/40 border border-white/20 dark:border-gray-600/50"
                >
                  <img 
                    src="/KANISHK_R_22ME015-removebg-preview.png" 
                    alt="Kanishk R - Elite Mechanical Engineer"
                    className="w-full h-full object-cover object-center"
                  />
                </motion.div>
              </div>

              {/* Enhanced Floating Tech Icons for Dark Mode */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-pastel-orange to-pastel-peach dark:from-orange-500 dark:to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-pastel-orange/50 dark:shadow-orange-500/50"
              >
                <Rocket className="w-6 h-6 text-white" />
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-pastel-cream to-pastel-pink dark:from-yellow-500 dark:to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-pastel-cream/50 dark:shadow-yellow-500/50"
              >
                <Plane className="w-6 h-6 text-white" />
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, -12, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
                className="absolute top-1/2 -right-8 w-10 h-10 bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-pastel-lavender/50 dark:shadow-purple-500/50"
              >
                <Zap className="w-5 h-5 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator for Dark Mode */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-pastel-lavender dark:text-purple-400 hover:text-pastel-pink dark:hover:text-pink-400 transition-colors group"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center"
        >
          <span className="text-sm font-medium mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">Explore More</span>
          <div className="w-8 h-8 border-2 border-pastel-lavender dark:border-purple-400 rounded-full flex items-center justify-center group-hover:border-pastel-pink dark:group-hover:border-pink-400 transition-colors">
            <ChevronDown className="w-4 h-4" />
          </div>
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;