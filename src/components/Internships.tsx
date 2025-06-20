import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, Calendar, ChevronDown, ChevronUp, ExternalLink, Camera } from 'lucide-react';
import { internships } from '../data/portfolio';

const Internships: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
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
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-warning-500 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Hands-on experience across UAV technology, CAD design, and precision manufacturing
          </p>
        </motion.div>

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

                      {/* Media placeholder */}
                      <div className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-lg p-8 text-center text-gray-600 dark:text-gray-300 cursor-pointer group hover:scale-[1.02] transition-transform">
                        <Camera className="w-12 h-12 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                        <p className="font-medium mb-1">Upload Internship Photos</p>
                        <p className="text-sm opacity-70">Add certificates, workplace photos, or project images</p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-3 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm rounded-lg transition-colors flex items-center mx-auto"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Choose Files
                        </motion.button>
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