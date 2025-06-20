import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Menu, X, Home, User, BookOpen, Briefcase, Code, Award, Trophy, Mail } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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

  useEffect(() => {
    const handleScroll = () => {
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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-4 left-4 right-4 z-50 bg-white/95 dark:bg-forest-900/95 backdrop-blur-xl border border-sage-200 dark:border-forest-700 rounded-2xl shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3"
          >
            <div className="flex items-center space-x-3">
              <motion.span 
                className="text-xl font-bold text-forest-600 dark:text-emerald-400"
              >
                KANISHK R
              </motion.span>
              <div className="h-6 w-px bg-sage-300 dark:bg-forest-600"></div>
              <span className="text-xs text-forest-500 dark:text-sage-400 font-medium tracking-wider">
                MECHANICAL ENGINEER
              </span>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 bg-sage-50 dark:bg-forest-800 rounded-xl p-1">
            {navigation.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.href)}
                className={`relative px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 flex items-center ${
                  activeSection === item.href.slice(1)
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'text-forest-600 dark:text-sage-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white/50 dark:hover:bg-forest-700/50'
                }`}
              >
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-emerald-500 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon className="w-3.5 h-3.5 mr-1.5 relative z-10" />
                <span className="relative z-10">{item.name}</span>
              </motion.button>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-sage-100 dark:bg-forest-800 text-forest-600 dark:text-sage-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              <motion.div
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.div>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-sage-100 dark:bg-forest-800 text-forest-600 dark:text-sage-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
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
            className="lg:hidden py-4 border-t border-sage-200 dark:border-forest-700 mt-4"
          >
            <div className="flex flex-col space-y-2">
              {navigation.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 8 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection(item.href)}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeSection === item.href.slice(1)
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'text-forest-600 dark:text-sage-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-sage-50 dark:hover:bg-forest-800'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  <span>{item.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;