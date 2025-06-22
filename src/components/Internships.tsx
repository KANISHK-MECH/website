import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, Calendar, ChevronDown, ChevronUp, Plus, X, MapPin, Clock, Lock } from 'lucide-react';
import { useDatabase } from '../hooks/useDatabase';
import { useAuth } from '../hooks/useAuth';
import { Internship } from '../types';
import ImageUpload from './ImageUpload';
import AuthModal from './AuthModal';

interface NewInternship {
  company: string;
  role: string;
  duration: string;
  year: string;
  description: string;
  fullDescription: string;
  skills: string[];
  location?: string;
  image?: File;
  imagePreview?: string;
}

const Internships: React.FC = () => {
  const { internships, addItem, loading } = useDatabase();
  const { isAuthenticated, user } = useAuth();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [newInternship, setNewInternship] = useState<NewInternship>({
    company: '',
    role: '',
    duration: '',
    year: new Date().getFullYear().toString(),
    description: '',
    fullDescription: '',
    skills: [],
    location: '',
    image: undefined,
    imagePreview: undefined
  });

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAddClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      setShowAddForm(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setShowAddForm(true);
  };

  const handleImageSelect = (file: File, preview: string) => {
    setNewInternship(prev => ({ ...prev, image: file, imagePreview: preview }));
  };

  const handleImageRemove = () => {
    setNewInternship(prev => ({ ...prev, image: undefined, imagePreview: undefined }));
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !newInternship.skills.includes(skill.trim())) {
      setNewInternship(prev => ({ ...prev, skills: [...prev.skills, skill.trim()] }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setNewInternship(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    
    const internshipToAdd: Internship = {
      id: `internship-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      company: newInternship.company,
      role: newInternship.role,
      duration: newInternship.duration,
      year: newInternship.year,
      description: newInternship.description,
      fullDescription: newInternship.fullDescription,
      skills: newInternship.skills
    };
    
    const success = await addItem('internships', internshipToAdd);
    if (success) {
      resetForm();
    }
  };

  const resetForm = () => {
    setNewInternship({
      company: '',
      role: '',
      duration: '',
      year: new Date().getFullYear().toString(),
      description: '',
      fullDescription: '',
      skills: [],
      location: '',
      image: undefined,
      imagePreview: undefined
    });
    setShowAddForm(false);
  };

  return (
    <section id="internships" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-warning-500 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Hands-on experience across UAV technology, CAD design, and precision manufacturing
          </p>
          
          <div className="flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddClick}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500 hover:from-pastel-pink hover:to-pastel-orange dark:hover:from-pink-500 dark:hover:to-orange-500 text-white font-bold rounded-xl transition-all duration-300 flex items-center mx-auto shadow-lg hover:shadow-xl"
            >
              {isAuthenticated ? <Plus className="w-5 h-5 mr-2" /> : <Lock className="w-5 h-5 mr-2" />}
              {isAuthenticated ? 'Add Experience' : 'Sign In to Add'}
            </motion.button>

            {isAuthenticated && user && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
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

        {/* Add Internship Form Modal */}
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
                    Add New Experience
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

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column - Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Company Logo / Certificate
                      </label>
                      <ImageUpload
                        onImageSelect={handleImageSelect}
                        onImageRemove={handleImageRemove}
                        preview={newInternship.imagePreview}
                        placeholder="Upload company logo or certificate"
                      />
                    </div>

                    {/* Right Column - Basic Info */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Company
                          </label>
                          <input
                            type="text"
                            value={newInternship.company}
                            onChange={(e) => setNewInternship(prev => ({ ...prev, company: e.target.value }))}
                            className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                            placeholder="Company name..."
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Role
                          </label>
                          <input
                            type="text"
                            value={newInternship.role}
                            onChange={(e) => setNewInternship(prev => ({ ...prev, role: e.target.value }))}
                            className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                            placeholder="Your role..."
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Duration
                          </label>
                          <input
                            type="text"
                            value={newInternship.duration}
                            onChange={(e) => setNewInternship(prev => ({ ...prev, duration: e.target.value }))}
                            className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                            placeholder="e.g., 6 months"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Year
                          </label>
                          <input
                            type="number"
                            value={newInternship.year}
                            onChange={(e) => setNewInternship(prev => ({ ...prev, year: e.target.value }))}
                            className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                            min="2020"
                            max="2030"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Location
                          </label>
                          <input
                            type="text"
                            value={newInternship.location}
                            onChange={(e) => setNewInternship(prev => ({ ...prev, location: e.target.value }))}
                            className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                            placeholder="City, State"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Brief Description
                    </label>
                    <textarea
                      value={newInternship.description}
                      onChange={(e) => setNewInternship(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100 resize-none"
                      placeholder="Brief overview of your role and responsibilities..."
                      required
                    />
                  </div>

                  {/* Full Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Detailed Description
                    </label>
                    <textarea
                      value={newInternship.fullDescription}
                      onChange={(e) => setNewInternship(prev => ({ ...prev, fullDescription: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100 resize-none"
                      placeholder="Detailed description of your experience, achievements, and learnings..."
                      required
                    />
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Skills & Technologies
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {newInternship.skills.map((skill, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-gradient-to-r from-pastel-lavender to-pastel-pink text-white px-3 py-1 rounded-full text-sm font-medium flex items-center"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-2 w-4 h-4 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.span>
                      ))}
                    </div>
                    <input
                      type="text"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSkill(e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                      placeholder="Type a skill and press Enter..."
                    />
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
                      {loading ? 'Adding...' : 'Add Experience'}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Internships Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {internships.map((internship, index) => (
            <motion.div
              key={internship.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-warning-500 rounded-lg flex items-center justify-center">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {internship.role}
                      </h3>
                      <p className="text-primary-600 dark:text-primary-400 font-medium">
                        {internship.company}
                      </p>
                    </div>
                  </div>
                  <span className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm font-medium px-3 py-1 rounded-full">
                    {internship.year}
                  </span>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  {internship.duration}
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                  {internship.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {internship.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Expand button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleExpanded(internship.id)}
                  className="flex items-center justify-between w-full text-primary-600 dark:text-primary-400 font-medium text-sm hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                >
                  <span>Read More</span>
                  {expandedId === internship.id ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </motion.button>
              </div>

              {/* Expanded content */}
              <AnimatePresence>
                {expandedId === internship.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                        Detailed Experience
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                        {internship.fullDescription}
                      </p>

                      {/* Image placeholder for certificates/photos */}
                      <div className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-lg p-8 text-center text-gray-600 dark:text-gray-300">
                        <Building className="w-12 h-12 mx-auto mb-3" />
                        <p className="font-medium mb-1">Experience Documentation</p>
                        <p className="text-sm opacity-70">Certificates, workplace photos, or project images</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Internships;