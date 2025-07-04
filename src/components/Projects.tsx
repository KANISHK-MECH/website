import React, { useState, memo, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Rocket, Plane, Zap, Settings, Plus, X, Upload, Check, Lock } from 'lucide-react';
import { useDatabase } from '../hooks/useDatabase';
import { useAuth } from '../hooks/useAuth';
import { skills } from '../data/portfolio';
import { Project } from '../types';
import ImageUpload from './ImageUpload';
import AuthModal from './AuthModal';

interface NewProject {
  title: string;
  description: string;
  category: 'UAV' | 'CAD' | 'Software' | 'Hardware';
  year: string;
  techStack: string[];
  image?: File;
  imagePreview?: string;
}

const Projects: React.FC = memo(() => {
  const { projects, addItem, loading } = useDatabase();
  const { isAuthenticated, user } = useAuth();
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [newProject, setNewProject] = useState<NewProject>({
    title: '',
    description: '',
    category: 'UAV',
    year: new Date().getFullYear().toString(),
    techStack: [],
    image: undefined,
    imagePreview: undefined
  });
  
  const categories = useMemo(() => ['All', 'UAV', 'CAD', 'Software', 'Hardware'], []);
  
  const filteredProjects = useMemo(() => 
    activeFilter === 'All' 
      ? projects 
      : projects.filter(project => project.category === activeFilter),
    [activeFilter, projects]
  );

  // Get all available technologies from skills data
  const availableTechnologies = useMemo(() => {
    const allTechs = skills.map(skill => skill.name);
    const additionalTechs = [
      'Carbon Fiber', 'Telemetry', 'GPS Navigation', 'Spray System',
      'Radio Control', 'FPV System', 'Camera Gimbal', 'Ducted Props',
      'Optical Systems', 'Signal Processing', 'Arduino', 'Sensors',
      'Motors', 'Autonomous Navigation', 'Thermal Camera', 'Data Analytics'
    ];
    return [...new Set([...allTechs, ...additionalTechs])].sort();
  }, []);

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

  const handleAddClick = useCallback(() => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      setShowAddForm(true);
    }
  }, [isAuthenticated]);

  const handleAuthSuccess = useCallback(() => {
    setShowAuthModal(false);
    setShowAddForm(true);
  }, []);

  const handleImageSelect = useCallback((file: File, preview: string) => {
    setNewProject(prev => ({ ...prev, image: file, imagePreview: preview }));
  }, []);

  const handleImageRemove = useCallback(() => {
    setNewProject(prev => ({ ...prev, image: undefined, imagePreview: undefined }));
  }, []);

  const toggleTechnology = useCallback((tech: string) => {
    setNewProject(prev => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter(t => t !== tech)
        : [...prev.techStack, tech]
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    
    if (!newProject.title.trim() || !newProject.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const projectToAdd: Project & { imageUrl?: string } = {
      id: `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: newProject.title.trim(),
      description: newProject.description.trim(),
      category: newProject.category,
      year: newProject.year,
      techStack: newProject.techStack,
      // Store the image preview URL for display
      imageUrl: newProject.imagePreview
    };
    
    const success = await addItem('projects', projectToAdd);
    if (success) {
      resetForm();
      alert('Project added successfully!');
    } else {
      alert('Failed to add project. Please try again.');
    }
  }, [newProject, addItem, isAuthenticated]);

  const resetForm = useCallback(() => {
    setNewProject({
      title: '',
      description: '',
      category: 'UAV',
      year: new Date().getFullYear().toString(),
      techStack: [],
      image: undefined,
      imagePreview: undefined
    });
    setShowAddForm(false);
  }, []);

  // Function to get project image - check for uploaded image first, then fallback to static images
  const getProjectImage = useCallback((project: Project & { imageUrl?: string }) => {
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

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-pastel-cream/10 via-white to-pastel-lavender/10 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/50 relative overflow-hidden">
      {/* Simplified Background */}
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

        {/* Filter Buttons and Add Project Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-3 mb-16"
        >
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
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
          </div>

          {/* Add Project Button */}
          <div className="flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddClick}
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500 hover:from-pastel-pink hover:to-pastel-orange dark:hover:from-pink-500 dark:hover:to-orange-500 text-white font-bold rounded-xl transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
            >
              {isAuthenticated ? <Plus className="w-4 h-4 mr-2" /> : <Lock className="w-4 h-4 mr-2" />}
              {isAuthenticated ? 'Add Project' : 'Sign In to Add'}
            </motion.button>
            
            {isAuthenticated && user && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Signed in as {user.email}
              </p>
            )}
          </div>
        </motion.div>

        {/* Authentication Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />

        {/* Add Project Form Modal */}
        <AnimatePresence>
          {showAddForm && isAuthenticated && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={(e) => e.target === e.currentTarget && resetForm()}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-pastel-lavender/20 dark:border-purple-400/30"
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-400 dark:to-pink-400">
                    Add New Project
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={resetForm}
                    className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Image Upload */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Project Image
                        </label>
                        <ImageUpload
                          onImageSelect={handleImageSelect}
                          onImageRemove={handleImageRemove}
                          preview={newProject.imagePreview}
                          placeholder="Upload project image or screenshot"
                        />
                      </div>
                    </div>

                    {/* Right Column - Project Details */}
                    <div className="space-y-6">
                      {/* Project Title */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Project Title *
                        </label>
                        <input
                          type="text"
                          value={newProject.title}
                          onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                          placeholder="Enter project title..."
                          required
                        />
                      </div>

                      {/* Category and Year */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Category *
                          </label>
                          <select
                            value={newProject.category}
                            onChange={(e) => setNewProject(prev => ({ ...prev, category: e.target.value as any }))}
                            className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                          >
                            <option value="UAV">UAV</option>
                            <option value="CAD">CAD</option>
                            <option value="Software">Software</option>
                            <option value="Hardware">Hardware</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Year *
                          </label>
                          <input
                            type="number"
                            value={newProject.year}
                            onChange={(e) => setNewProject(prev => ({ ...prev, year: e.target.value }))}
                            className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                            min="2020"
                            max="2030"
                            required
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Description *
                        </label>
                        <textarea
                          value={newProject.description}
                          onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                          rows={4}
                          className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                          placeholder="Describe your project..."
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Technology Stack Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                      Technology Stack ({newProject.techStack.length} selected)
                    </label>
                    <div className="max-h-60 overflow-y-auto bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {availableTechnologies.map((tech) => (
                          <motion.button
                            key={tech}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => toggleTechnology(tech)}
                            className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                              newProject.techStack.includes(tech)
                                ? 'bg-gradient-to-r from-pastel-lavender to-pastel-pink text-white shadow-md'
                                : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500 border border-gray-200 dark:border-gray-500'
                            }`}
                          >
                            <span className="truncate">{tech}</span>
                            {newProject.techStack.includes(tech) && (
                              <Check className="w-4 h-4 ml-2 flex-shrink-0" />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-600">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={resetForm}
                      className="px-6 py-3 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                      className="px-8 py-3 bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500 hover:from-pastel-pink hover:to-pastel-orange dark:hover:from-pink-500 dark:hover:to-orange-500 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                    >
                      {loading ? 'Adding...' : 'Add Project'}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => {
            const colorClass = getCategoryColor(project.category);
            const projectWithImage = project as Project & { imageUrl?: string };
            const projectImage = getProjectImage(projectWithImage);
            
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
                          // Fallback to placeholder if image fails to load
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
                  
                  {/* Fallback placeholder - shown when no image or image fails to load */}
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
                  <div className="flex flex-wrap gap-2">
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