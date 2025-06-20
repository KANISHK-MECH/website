import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12 relative border-t border-gray-800 dark:border-gray-700">
      {/* Enhanced Background for Dark Mode */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.2),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Enhanced Brand Section for Dark Mode */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <motion.div 
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-white font-bold text-lg">KR</span>
              </motion.div>
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Kanishk R</span>
            </div>
            <p className="text-gray-400 dark:text-gray-300 text-sm leading-relaxed">
              Mechanical Engineer specializing in UAV development, CAD design, and innovative mechatronic systems.
            </p>
          </motion.div>

          {/* Enhanced Quick Links for Dark Mode */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'About', href: '#about' },
                { name: 'Projects', href: '#projects' },
                { name: 'Skills', href: '#skills' },
                { name: 'Contact', href: '#contact' },
                { name: 'Education', href: '#education' },
                { name: 'Experience', href: '#internships' }
              ].map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ 
                    scale: 1.05,
                    color: "#a855f7"
                  }}
                  className="text-gray-400 dark:text-gray-300 hover:text-purple-400 transition-colors text-sm"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Contact & Social for Dark Mode */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Get in Touch</h3>
            <div className="space-y-2">
              <p className="text-gray-400 dark:text-gray-300 text-sm">kanishk.r2022mech@sece.ac.in</p>
              <p className="text-gray-400 dark:text-gray-300 text-sm">+91 8248942062</p>
              <p className="text-gray-400 dark:text-gray-300 text-sm">Coimbatore, Tamil Nadu</p>
            </div>
            <div className="flex space-x-4 mt-4">
              <motion.a
                href="#"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)"
                }}
                className="w-10 h-10 bg-gray-800 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-600 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 10px 30px rgba(168, 85, 247, 0.3)"
                }}
                className="w-10 h-10 bg-gray-800 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-blue-600 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:kanishk.r2022mech@sece.ac.in"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 10px 30px rgba(236, 72, 153, 0.3)"
                }}
                className="w-10 h-10 bg-gray-800 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-pink-400 hover:bg-pink-600 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Bottom section for Dark Mode */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 dark:text-gray-300 text-sm flex items-center">
            Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> by 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold ml-1">Kanishk R</span>
          </p>
          <p className="text-gray-400 dark:text-gray-300 text-sm mt-2 md:mt-0">
            © 2025 All rights reserved.
          </p>
        </motion.div>
      </div>

      {/* Enhanced Scroll to top button for Dark Mode */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)"
        }}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </footer>
  );
};

export default Footer;