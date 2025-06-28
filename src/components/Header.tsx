import React, { useState, useEffect, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Menu, X, Home, User, BookOpen, Briefcase, Code, Award, Trophy, Mail, Settings } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import AdminPanel from './AdminPanel';

const Header: React.FC = memo(() => {
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const navigation = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Education', href: '#education', icon: BookOpen },
    { name: 'Experience', href: '#internships', icon: Briefcase },
    { name: 'Projects', href: '#projects', icon: Code },
    { name: 'Certifications', href: '#certifications', icon: Award },
    { name: 'Achievements', href: '#achievements', icon: Trophy },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  const handleScroll = useCallback(() => {
    const sections = navigation.map(nav => nav.href.slice(1));
    const scrollPosition = window.scrollY + 100;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    }
  }, [navigation]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = useCallback((href: string) => {
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-4 left-4 right-4 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-pastel-lavender/30 rounded-3xl shadow-2xl shadow-pastel-lavender/20"
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-center h-20">
            {/* Brand Section */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-4"
            >
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pastel-lavender to-pastel-pink">
                  KANISHK 
                </span>
                <div className="h-8 w-px bg-gray-300 dark:bg-gray-600"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300 font-bold tracking-wider">
                  MECHANICAL ENGINEER
                </span>
              </div>
            </motion.div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 bg-gradient-to-r from-pastel-peach/10 to-pastel-cream/10 backdrop-blur-sm rounded-2xl p-2 border border-pastel-peach/20">
              {navigation.map((item) => (
                <motion.button
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center overflow-hidden ${
                    activeSection === item.href.slice(1)
                      ? 'bg-gradient-to-r from-pastel-lavender to-pastel-pink text-white shadow-xl'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-white/50'
                  }`}
                >
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-pastel-lavender to-pastel-pink rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <item.icon className="w-3.5 h-3.5 mr-1.5 relative z-10" />
                  <span className="relative z-10">{item.name}</span>
                </motion.button>
              ))}
            </nav>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Admin Panel Button - Only show if authenticated */}
              {isAuthenticated && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAdminPanel(true)}
                  className="p-3 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 text-purple-600 hover:text-purple-700 hover:border-purple-500/50 transition-all duration-300"
                  title="Admin Panel"
                >
                  <Settings className="w-5 h-5" />
                </motion.button>
              )}

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-3 rounded-2xl bg-gradient-to-r from-pastel-peach/20 to-pastel-cream/20 backdrop-blur-sm border border-pastel-peach/30 text-gray-600 hover:text-pastel-lavender hover:border-pastel-lavender/50 transition-all duration-300"
              >
                <motion.div
                  animate={{ rotate: isDark ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.div>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMenu}
                className="lg:hidden p-3 rounded-2xl bg-gradient-to-r from-pastel-peach/20 to-pastel-cream/20 backdrop-blur-sm border border-pastel-peach/30 text-gray-600 hover:text-pastel-lavender hover:border-pastel-lavender/50 transition-all duration-300"
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.div>
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden py-6 border-t border-pastel-lavender/20 mt-4"
            >
              <div className="flex flex-col space-y-3">
                {navigation.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 8 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection(item.href)}
                    className={`flex items-center px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-300 relative overflow-hidden ${
                      activeSection === item.href.slice(1)
                        ? 'bg-gradient-to-r from-pastel-lavender to-pastel-pink text-white shadow-xl'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gradient-to-r hover:from-pastel-peach/10 hover:to-pastel-cream/10'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-4 relative z-10" />
                    <span className="relative z-10">{item.name}</span>
                  </motion.button>
                ))}
                
                {/* Admin Panel Button in Mobile Menu */}
                {isAuthenticated && (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navigation.length * 0.1 }}
                    whileHover={{ scale: 1.02, x: 8 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowAdminPanel(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-300 text-purple-600 hover:text-purple-800 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50"
                  >
                    <Settings className="w-5 h-5 mr-4" />
                    <span>Admin Panel</span>
                  </motion.button>
                )}
              </div>
            </motion.nav>
          )}
        </div>
      </motion.header>

      {/* Admin Panel */}
      <AdminPanel 
        isOpen={showAdminPanel} 
        onClose={() => setShowAdminPanel(false)} 
      />
    </>
  );
});

Header.displayName = 'Header';

export default Header;