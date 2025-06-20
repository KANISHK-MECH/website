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
    <section id="home" className="min-h-screen relative overflow-hidden bg-gradient-to-br from-cream-50 via-sage-50 to-mint-50 dark:from-forest-900 dark:via-forest-800 dark:to-emerald-900">
      {/* Minimalist Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(198,218,191,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(198,218,191,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(26,147,111,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(26,147,111,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -30, 0],
          rotate: [0, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-20 z-10"
      >
        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-mint-500 rounded-lg flex items-center justify-center shadow-lg opacity-20 dark:opacity-30">
          <Zap className="w-6 h-6 text-white" />
        </div>
      </motion.div>

      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 40, 0],
          rotate: [0, -180]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-32 left-20 z-10"
      >
        <div className="w-10 h-10 bg-gradient-to-r from-forest-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg opacity-20 dark:opacity-30">
          <Rocket className="w-5 h-5 text-white" />
        </div>
      </motion.div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Content */}
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
              className="mb-8"
            >
              <motion.span
                className="inline-block px-4 py-2 bg-sage-100 dark:bg-forest-800 text-forest-600 dark:text-emerald-400 rounded-full text-sm font-medium mb-6 border border-sage-200 dark:border-forest-700"
              >
                🔧 MECHANICAL ENGINEER
              </motion.span>
              
              <motion.h1 
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-forest-800 dark:text-cream-100 mb-4 leading-tight"
              >
                KANISHK R
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl sm:text-2xl lg:text-3xl font-medium mb-2"
              >
                <span className="text-emerald-600 dark:text-emerald-400">UAV SPECIALIST</span>
                <span className="text-sage-400 dark:text-sage-500 mx-3">|</span>
                <span className="text-mint-600 dark:text-mint-400">CAD EXPERT</span>
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg text-forest-600 dark:text-sage-300 mb-8 max-w-2xl leading-relaxed"
            >
              Advancing mechanical engineering through innovative 
              <span className="text-emerald-600 dark:text-emerald-400 font-medium"> drone technology</span>, 
              precision <span className="text-mint-600 dark:text-mint-400 font-medium">CAD design</span>, 
              and cutting-edge <span className="text-forest-600 dark:text-forest-400 font-medium">mechatronic systems</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-colors duration-300 flex items-center justify-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </motion.button>
              
              <div className="flex space-x-3">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://github.com/KANISHK-MECH/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-sage-100 dark:bg-forest-800 hover:bg-sage-200 dark:hover:bg-forest-700 text-forest-600 dark:text-sage-300 rounded-xl transition-colors duration-300"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://www.linkedin.com/in/kanishkrmech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-sage-100 dark:bg-forest-800 hover:bg-sage-200 dark:hover:bg-forest-700 text-forest-600 dark:text-sage-300 rounded-xl transition-colors duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Minimalist rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-6 border border-sage-200 dark:border-forest-700 rounded-full opacity-30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-12 border border-mint-200 dark:border-emerald-700 rounded-full opacity-20"
              />

              {/* Main image container */}
              <div className="relative w-80 h-80 bg-gradient-to-br from-sage-100 to-cream-100 dark:from-forest-800 dark:to-emerald-800 rounded-full flex items-center justify-center border border-sage-200 dark:border-forest-700 shadow-xl">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-72 h-72 rounded-full overflow-hidden bg-white dark:bg-forest-900 border-4 border-white dark:border-forest-700"
                >
                  <img 
                    src="/KANISHK_R_22ME015-removebg-preview.png" 
                    alt="Kanishk R - Mechanical Engineer"
                    className="w-full h-full object-cover object-center"
                  />
                </motion.div>
              </div>

              {/* Floating tech icons */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-2 -right-2 w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg"
              >
                <Rocket className="w-5 h-5 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-2 -left-2 w-10 h-10 bg-mint-500 rounded-lg flex items-center justify-center shadow-lg"
              >
                <Plane className="w-5 h-5 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-forest-500 dark:text-sage-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors group"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center"
        >
          <span className="text-sm font-medium mb-2">Explore More</span>
          <div className="w-6 h-6 border-2 border-current rounded-full flex items-center justify-center">
            <ChevronDown className="w-3 h-3" />
          </div>
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;