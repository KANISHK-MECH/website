import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { useDatabase } from '../hooks/useDatabase';

const Internships: React.FC = () => {
  const { internships, loading } = useDatabase();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <section id="internships" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-pastel-lavender border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading experience...</p>
          </div>
        </div>
      </section>
    );
  }

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
        </motion.div>

        {/* Internships Grid */}
        {internships.length > 0 ? (
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
                        {internship.imageUrl ? (
                          <div className="rounded-lg overflow-hidden">
                            <img
                              src={internship.imageUrl}
                              alt={`${internship.company} experience`}
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        ) : (
                          <div className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-lg p-8 text-center text-gray-600 dark:text-gray-300">
                            <Building className="w-12 h-12 mx-auto mb-3" />
                            <p className="font-medium mb-1">Experience Documentation</p>
                            <p className="text-sm opacity-70">Certificates, workplace photos, or project images</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500 rounded-full flex items-center justify-center">
              <Building className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No experience entries found.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Internships;