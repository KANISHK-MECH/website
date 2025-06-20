import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Camera, Rocket, Plane, Zap, Settings } from 'lucide-react';
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
      case 'UAV': return 'from-emerald-500 to-mint-500';
      case 'CAD': return 'from-forest-500 to-emerald-500';
      case 'Software': return 'from-mint-500 to-sage-500';
      case 'Hardware': return 'from-sage-500 to-cream-600';
      default: return 'from-emerald-500 to-forest-500';
    }
  };

  return (
    <section id="projects" className="py-20 bg-sage-50 dark:bg-forest-800 relative overflow-hidden">
      {/* Minimalist Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(136,212,152,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_20%_50%,rgba(26,147,111,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(198,218,191,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(17,75,95,0.1),transparent_50%)]" />
      </div>

      {/* Floating Element */}
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -30, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-20 opacity-10 dark:opacity-20"
      >
        <Rocket className="w-24 h-24 text-emerald-500" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-forest-800 dark:text-cream-100 mb-6">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-mint-500 mx-auto mb-6"></div>
          <p className="text-forest-600 dark:text-sage-300 text-lg max-w-3xl mx-auto">
            Innovative solutions in UAV technology, precision CAD design, and automation systems
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => {
            const IconComponent = getCategoryIcon(category);
            const colorClass = getCategoryColor(category);
            
            return (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(category)}
                className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center ${
                  activeFilter === category
                    ? `bg-gradient-to-r ${colorClass} text-white shadow-lg`
                    : 'bg-white dark:bg-forest-700 border border-sage-200 dark:border-forest-600 text-forest-600 dark:text-sage-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-600'
                }`}
              >
                {activeFilter === category && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-mint-500/20 rounded-xl"
                  />
                )}
                <IconComponent className="w-4 h-4 mr-2 relative z-10" />
                <span className="relative z-10">{category}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
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
                whileHover={{ y: -8 }}
                className="group relative bg-white dark:bg-forest-900 rounded-2xl border border-sage-200 dark:border-forest-700 hover:border-emerald-300 dark:hover:border-emerald-600 overflow-hidden transition-all duration-500 shadow-lg hover:shadow-xl"
              >
                {/* Project Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-sage-100 to-mint-100 dark:from-forest-700 dark:to-emerald-800 flex items-center justify-center text-forest-500 dark:text-sage-400 overflow-hidden">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-center p-6"
                  >
                    <Camera className="w-12 h-12 mx-auto mb-3 group-hover:text-emerald-500 transition-colors" />
                    <p className="font-medium text-sm">Project Showcase</p>
                    <p className="text-xs opacity-70 mt-1">Upload demo or screenshot</p>
                  </motion.div>
                </div>

                {/* Project Content */}
                <div className="relative p-6 space-y-4">
                  <div className="flex justify-between items-start mb-4">
                    <motion.span 
                      className={`px-3 py-1 bg-gradient-to-r ${colorClass} text-white text-xs font-medium rounded-full shadow-md`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {project.category}
                    </motion.span>
                    <span className="text-forest-500 dark:text-sage-400 text-sm font-medium bg-sage-100 dark:bg-forest-700 px-2 py-1 rounded-lg">
                      {project.year}
                    </span>
                  </div>

                  <motion.h3 
                    className="text-xl font-bold text-forest-700 dark:text-cream-200 mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {project.title}
                  </motion.h3>

                  <p className="text-forest-600 dark:text-sage-300 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.slice(0, 3).map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        whileHover={{ scale: 1.05 }}
                        className="bg-sage-100 dark:bg-forest-700 text-forest-600 dark:text-sage-300 text-xs px-3 py-1 rounded-lg border border-sage-200 dark:border-forest-600 hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors"
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="bg-gradient-to-r from-emerald-100 to-mint-100 dark:from-emerald-800/30 dark:to-mint-800/30 text-emerald-600 dark:text-emerald-400 text-xs px-3 py-1 rounded-lg border border-emerald-200 dark:border-emerald-700">
                        +{project.techStack.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-colors duration-300 flex items-center justify-center"
                  >
                    <Code className="w-4 h-4 mr-2" />
                    View Project
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
              className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-emerald-500 to-mint-500 rounded-full flex items-center justify-center"
            >
              <Code className="w-10 h-10 text-white" />
            </motion.div>
            <p className="text-forest-500 dark:text-sage-400 text-lg">
              No projects found for the selected category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;