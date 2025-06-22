import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Award, FileText, Calendar, Plus, X } from 'lucide-react';
import { useDatabase } from '../hooks/useDatabase';
import { Achievement } from '../types';
import ImageUpload from './ImageUpload';

interface NewAchievement {
  title: string;
  description: string;
  year: string;
  category: 'Competition' | 'Publication' | 'Award' | 'Certification';
  image?: File;
  imagePreview?: string;
}

const Achievements: React.FC = () => {
  const { achievements, addItem, loading } = useDatabase();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAchievement, setNewAchievement] = useState<NewAchievement>({
    title: '',
    description: '',
    year: new Date().getFullYear().toString(),
    category: 'Competition',
    image: undefined,
    imagePreview: undefined
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Competition':
        return Trophy;
      case 'Award':
        return Medal;
      case 'Certification':
        return Award;
      case 'Publication':
        return FileText;
      default:
        return Trophy;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Competition':
        return 'from-yellow-500 to-orange-500';
      case 'Award':
        return 'from-blue-500 to-purple-500';
      case 'Certification':
        return 'from-green-500 to-teal-500';
      case 'Publication':
        return 'from-pink-500 to-red-500';
      default:
        return 'from-primary-500 to-warning-500';
    }
  };

  const handleImageSelect = (file: File, preview: string) => {
    setNewAchievement(prev => ({ ...prev, image: file, imagePreview: preview }));
  };

  const handleImageRemove = () => {
    setNewAchievement(prev => ({ ...prev, image: undefined, imagePreview: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const achievementToAdd: Achievement = {
      id: `achievement-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: newAchievement.title,
      description: newAchievement.description,
      year: newAchievement.year,
      category: newAchievement.category
    };
    
    const success = await addItem('achievements', achievementToAdd);
    if (success) {
      resetForm();
    }
  };

  const resetForm = () => {
    setNewAchievement({
      title: '',
      description: '',
      year: new Date().getFullYear().toString(),
      category: 'Competition',
      image: undefined,
      imagePreview: undefined
    });
    setShowAddForm(false);
  };

  return (
    <section id="achievements" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Achievements
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-warning-500 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Recognition for excellence in competitions, publications, and professional development
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(true)}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500 hover:from-pastel-pink hover:to-pastel-orange dark:hover:from-pink-500 dark:hover:to-orange-500 text-white font-bold rounded-xl transition-all duration-300 flex items-center mx-auto shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Achievement
          </motion.button>
        </motion.div>

        {/* Add Achievement Form Modal */}
        <AnimatePresence>
          {showAddForm && (
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
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-pastel-lavender/20 dark:border-purple-400/30"
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-400 dark:to-pink-400">
                    Add New Achievement
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
                  {/* Achievement Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Achievement Image
                    </label>
                    <ImageUpload
                      onImageSelect={handleImageSelect}
                      onImageRemove={handleImageRemove}
                      preview={newAchievement.imagePreview}
                      placeholder="Upload certificate, trophy, or achievement photo"
                    />
                  </div>

                  {/* Basic Information */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Achievement Title
                    </label>
                    <input
                      type="text"
                      value={newAchievement.title}
                      onChange={(e) => setNewAchievement(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                      placeholder="e.g., SIH 2023 Top 6 Finalist"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newAchievement.description}
                      onChange={(e) => setNewAchievement(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100 resize-none"
                      placeholder="Describe your achievement..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        value={newAchievement.category}
                        onChange={(e) => setNewAchievement(prev => ({ ...prev, category: e.target.value as any }))}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                      >
                        <option value="Competition">Competition</option>
                        <option value="Award">Award</option>
                        <option value="Certification">Certification</option>
                        <option value="Publication">Publication</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Year
                      </label>
                      <input
                        type="number"
                        value={newAchievement.year}
                        onChange={(e) => setNewAchievement(prev => ({ ...prev, year: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                        min="2020"
                        max="2030"
                        required
                      />
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
                      {loading ? 'Adding...' : 'Add Achievement'}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => {
            const IconComponent = getCategoryIcon(achievement.category);
            const colorClass = getCategoryColor(achievement.category);

            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 group relative overflow-hidden"
              >
                {/* Background gradient */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${colorClass}`}></div>

                {/* Icon and category */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${colorClass} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <span className={`bg-gradient-to-r ${colorClass} bg-clip-text text-transparent text-sm font-medium`}>
                    {achievement.category}
                  </span>
                </div>

                {/* Achievement content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {achievement.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {achievement.description}
                  </p>

                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {achievement.year}
                  </div>
                </div>

                {/* Award ribbon effect */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute top-4 right-4 w-12 h-16 bg-gradient-to-b from-yellow-400 to-yellow-500 transform rotate-12 rounded-sm shadow-lg"
                >
                  <div className="w-full h-full bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-sm flex items-center justify-center">
                    <span className="text-yellow-800 text-xs font-bold transform -rotate-12">
                      {index + 1}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-0 h-0 border-l-6 border-r-6 border-t-8 border-l-transparent border-r-transparent border-t-yellow-600"></div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-primary-500 to-warning-500 rounded-2xl p-8 text-white"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">{achievements.length}+</div>
              <div className="text-primary-100 text-sm uppercase tracking-wide">Total Achievements</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">
                {achievements.filter(a => a.category === 'Competition').length}
              </div>
              <div className="text-primary-100 text-sm uppercase tracking-wide">Competition Wins</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">
                {achievements.filter(a => a.category === 'Publication').length}
              </div>
              <div className="text-primary-100 text-sm uppercase tracking-wide">Publications</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">
                {achievements.filter(a => a.title.toLowerCase().includes('finalist')).length}
              </div>
              <div className="text-primary-100 text-sm uppercase tracking-wide">National Finalist</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;