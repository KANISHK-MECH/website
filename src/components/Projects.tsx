import React, { useState, memo, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Rocket, Plane, Zap, Settings, Github, ExternalLink } from 'lucide-react';
import { useDatabase } from '../hooks/useDatabase';

const Projects: React.FC = memo(() => {
  const { projects, loading } = useDatabase();
  const [activeFilter, setActiveFilter] = useState<string>('All');
  
  const categories = useMemo(() => ['All', 'UAV', 'CAD', 'Software', 'Hardware'], []);
  
  const filteredProjects = useMemo(() => 
    activeFilter === 'All' 
      ? projects 
      : projects.filter(project => project.category === activeFilter),
    [activeFilter, projects]
  );

  const getCategoryIcon = useCallback((category: string) => {
    switch (category) {
      case 'UAV': return Rocket;
      case 'CAD': return Settings;
      case 'Software': return Zap;
      case 'Hardware': return Zap;
      default: return Plane;
    }
  }, []);

  const getCategoryColor = useCallback((category: string) => {
    switch (category) {
      case 'UAV': return 'from-pastel-orange to-pastel-peach';
      case 'CAD': return 'from-pastel-lavender to-pastel-pink';
      case 'Software': return 'from-pastel-pink to-pastel-cream';
      case 'Hardware': return 'from-pastel-cream to-pastel-orange';
      default: return 'from-pastel-peach to-pastel-lavender';
    }
  }, []);

  const handleFilterChange = useCallback((category: string) => {
    setActiveFilter(category);
  }, []);

  // Function to get project image
  const getProjectImage = useCallback((project: any) => {
    // If project has uploaded image, use it
    if (project.imageUrl) {
      return project.imageUrl;
    }
    
    // For specific projects, use static images
    if (project.title === 'Vintage RC Aircraft' || project.id === '4') {
      return '/WhatsApp Image 2025-06-22 at 8.24.50 PM.jpeg';
    }
    
    return null;
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gradient-to-br from-pastel-cream/10 via-white to-pastel-lavender/10 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-pastel-lavender border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-pastel-cream/10 via-white to-pastel-lavender/10 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(213,170,255,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_20%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(250,208,201,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_50%)]" />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -25, 0],
          rotate: [0, 90, 180]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-20 opacity-10 dark:opacity-15"
      >
        <Rocket className="w-20 h-20 text-pastel-lavender dark:text-purple-400" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pastel-lavender via-pastel-pink to-pastel-orange dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 mb-6">
            Elite Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pastel-lavender to-pastel-orange dark:from-purple-500 dark:to-orange-500 mx-auto mb-6" />
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Revolutionary solutions in UAV technology, precision CAD design, and cutting-edge automation systems
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => {
            const IconComponent = getCategoryIcon(category);
            const colorClass = getCategoryColor(category);
            
            return (
              <motion.button
                key={category}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleFilterChange(category)}
                className={`group relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center ${
                  activeFilter === category
                    ? `bg-gradient-to-r ${colorClass} text-white shadow-lg`
                    : 'bg-white/50 backdrop-blur-sm border border-pastel-lavender/20 dark:border-purple-400/30 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:border-pastel-pink/40 dark:hover:border-pink-400/60'
                }`}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                <span>{category}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => {
            const colorClass = getCategoryColor(project.category);
            const projectImage = getProjectImage(project);
            
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative bg-gradient-to-br from-white/80 to-pastel-peach/10 dark:from-gray-800/50 dark:to-purple-900/20 backdrop-blur-sm rounded-2xl border border-pastel-lavender/20 dark:border-purple-400/30 hover:border-pastel-pink/40 dark:hover:border-pink-400/60 overflow-hidden transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative h-40 overflow-hidden">
                  {projectImage ? (
                    <div className="relative w-full h-full">
                      <img
                        src={projectImage}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full p-2">
                        <Camera className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  ) : null}
                  
                  {/* Fallback placeholder */}
                  <div className={`w-full h-full bg-gradient-to-br from-pastel-peach/20 to-pastel-cream/20 dark:from-orange-500/20 dark:to-yellow-500/20 flex items-center justify-center text-gray-500 dark:text-gray-400 ${projectImage ? 'hidden' : ''}`}>
                    <div className="text-center p-4">
                      <Camera className="w-12 h-12 mx-auto mb-3 group-hover:text-pastel-lavender dark:group-hover:text-purple-400 transition-colors" />
                      <p className="font-bold text-sm">Project Showcase</p>
                      <p className="text-xs opacity-70 mt-1">Upload demo or screenshot</p>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="relative p-5 space-y-3">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`px-3 py-1 bg-gradient-to-r ${colorClass} text-white text-xs font-bold rounded-full shadow-lg`}>
                      {project.category}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium bg-white/50 dark:bg-gray-700/50 px-2 py-1 rounded-lg">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-2 group-hover:text-pastel-lavender dark:group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-pastel-peach/20 dark:bg-orange-500/20 backdrop-blur-sm text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-lg border border-pastel-peach/30 dark:border-orange-400/50"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="bg-gradient-to-r from-pastel-lavender/20 to-pastel-pink/20 dark:from-purple-500/20 dark:to-pink-500/20 text-pastel-lavender dark:text-purple-400 text-xs px-2 py-1 rounded-lg border border-pastel-lavender/30 dark:border-purple-400/50">
                        +{project.techStack.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Project Links */}
                  {(project.githubUrl || project.demoUrl) && (
                    <div className="flex space-x-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          <Github className="w-3 h-3 mr-1" />
                          Code
                        </motion.a>
                      )}
                      {project.demoUrl && (
                        <motion.a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center px-3 py-2 bg-gradient-to-r from-pastel-lavender to-pastel-pink text-white rounded-lg text-xs font-medium hover:from-pastel-pink hover:to-pastel-orange transition-all duration-300"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Demo
                        </motion.a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500 rounded-full flex items-center justify-center">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No projects found for the selected category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';

export default Projects;