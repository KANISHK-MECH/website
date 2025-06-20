import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Camera, Filter, Rocket, Plane, Zap, Settings } from 'lucide-react';
import { projects } from '../data/portfolio';

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  
  const categories = ['All', 'UAV', 'CAD', 'Software', 'Hardware'];
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'UAV': return Rocket;
      case 'CAD': return Settings;
      case 'Software': return Code;
      case 'Hardware': return Zap;
      default: return Plane;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'UAV': return 'from-pastel-orange to-pastel-peach';
      case 'CAD': return 'from-pastel-lavender to-pastel-pink';
      case 'Software': return 'from-pastel-pink to-pastel-cream';
      case 'Hardware': return 'from-pastel-cream to-pastel-orange';
      default: return 'from-pastel-peach to-pastel-lavender';
    }
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-pastel-cream/10 via-white to-pastel-lavender/10 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/50 relative overflow-hidden">
      {/* Soft Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(213,170,255,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_20%_50%,rgba(139,92,246,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(250,208,201,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.2),transparent_50%)]" />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-20 opacity-10 dark:opacity-20"
      >
        <Rocket className="w-32 h-32 text-pastel-lavender dark:text-purple-400" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pastel-lavender via-pastel-pink to-pastel-orange dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 mb-6"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ backgroundSize: "200% 200%" }}
          >
            Elite Projects
          </motion.h2>
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-pastel-lavender to-pastel-orange dark:from-purple-500 dark:to-orange-500 mx-auto mb-6"
            animate={{ scaleX: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Revolutionary solutions in UAV technology, precision CAD design, and cutting-edge automation systems
          </p>
        </motion.div>

        {/* Enhanced Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => {
            const IconComponent = getCategoryIcon(category);
            const colorClass = getCategoryColor(category);
            
            return (
              <motion.button
                key={category}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(213, 170, 255, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(category)}
                className={`group relative px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center overflow-hidden ${
                  activeFilter === category
                    ? `bg-gradient-to-r ${colorClass} text-white shadow-lg`
                    : 'bg-white/50 backdrop-blur-sm border border-pastel-lavender/20 dark:border-purple-400/30 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:border-pastel-pink/40 dark:hover:border-pink-400/60'
                }`}
              >
                {activeFilter === category && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-gradient-to-r from-pastel-lavender/20 to-pastel-pink/20 dark:from-purple-500/30 dark:to-pink-500/30 rounded-xl"
                  />
                )}
                <IconComponent className="w-4 h-4 mr-2 relative z-10" />
                <span className="relative z-10">{category}</span>
                
                {activeFilter === category && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute -right-1 -top-1 w-3 h-3 bg-white rounded-full"
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Enhanced Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => {
            const colorClass = getCategoryColor(project.category);
            
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 25px 50px rgba(213, 170, 255, 0.2)"
                }}
                className="group relative bg-gradient-to-br from-white/80 to-pastel-peach/10 dark:from-gray-800/50 dark:to-purple-900/20 backdrop-blur-sm rounded-2xl border border-pastel-lavender/20 dark:border-purple-400/30 hover:border-pastel-pink/40 dark:hover:border-pink-400/60 overflow-hidden transition-all duration-500"
              >
                {/* Soft Animated Border Effect */}
                <motion.div
                  animate={{ 
                    background: [
                      "linear-gradient(0deg, transparent, transparent)",
                      `linear-gradient(180deg, rgba(213,170,255,0.2), transparent)`,
                      "linear-gradient(360deg, transparent, transparent)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity dark:opacity-30 dark:group-hover:opacity-100"
                />

                {/* Enhanced Project Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-pastel-peach/20 to-pastel-cream/20 dark:from-orange-500/20 dark:to-yellow-500/20 flex items-center justify-center text-gray-500 dark:text-gray-400 overflow-hidden">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-center p-6"
                  >
                    <Camera className="w-16 h-16 mx-auto mb-4 group-hover:text-pastel-lavender dark:group-hover:text-purple-400 transition-colors" />
                    <p className="font-bold text-sm">Project Showcase</p>
                    <p className="text-xs opacity-70 mt-1">Upload demo or screenshot</p>
                  </motion.div>
                  
                  {/* Gentle Scanning Effect */}
                  <motion.div
                    animate={{ x: [-100, 300] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-pastel-lavender/20 dark:via-purple-400/30 to-transparent skew-x-12"
                  />
                </div>

                {/* Enhanced Project Content */}
                <div className="relative p-6 space-y-4">
                  <div className="flex justify-between items-start mb-4">
                    <motion.span 
                      className={`px-3 py-1 bg-gradient-to-r ${colorClass} text-white text-xs font-bold rounded-full shadow-lg`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {project.category}
                    </motion.span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium bg-white/50 dark:bg-gray-700/50 px-2 py-1 rounded-lg">
                      {project.year}
                    </span>
                  </div>

                  <motion.h3 
                    className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-3 group-hover:text-pastel-lavender dark:group-hover:text-purple-400 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {project.title}
                  </motion.h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Enhanced Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.slice(0, 3).map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        whileHover={{ scale: 1.1 }}
                        className="bg-pastel-peach/20 dark:bg-orange-500/20 backdrop-blur-sm text-gray-600 dark:text-gray-300 text-xs px-3 py-1 rounded-lg border border-pastel-peach/30 dark:border-orange-400/50 hover:border-pastel-lavender/50 dark:hover:border-purple-400/70 transition-colors"
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="bg-gradient-to-r from-pastel-lavender/20 to-pastel-pink/20 dark:from-purple-500/20 dark:to-pink-500/20 text-pastel-lavender dark:text-purple-400 text-xs px-3 py-1 rounded-lg border border-pastel-lavender/30 dark:border-purple-400/50">
                        +{project.techStack.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Enhanced Action Button */}
                  <motion.button
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 10px 30px rgba(213, 170, 255, 0.3)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500 hover:from-pastel-pink hover:to-pastel-orange dark:hover:from-pink-500 dark:hover:to-orange-500 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center group/btn overflow-hidden relative"
                  >
                    <motion.div
                      animate={{ x: [-100, 100] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    />
                    <Code className="w-4 h-4 mr-2 relative z-10" />
                    <span className="relative z-10">View Project</span>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500 rounded-full flex items-center justify-center"
            >
              <Code className="w-12 h-12 text-white" />
            </motion.div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No projects found for the selected category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;