import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, Upload, ExternalLink, Plus } from 'lucide-react';
import { certifications } from '../data/portfolio';

const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-warning-500 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Professional certifications and credentials in engineering, design, and technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-600 group"
            >
              {/* Certificate badge */}
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-warning-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-10 h-10 text-white" />
                </div>
                
                {/* Upload overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <div className="text-center text-white">
                    <Upload className="w-6 h-6 mx-auto mb-1" />
                    <p className="text-xs">Upload Certificate</p>
                  </div>
                </motion.div>
              </div>

              {/* Certificate info */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium text-sm mb-3">
                  {cert.issuer}
                </p>

                <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  {cert.year}
                </div>

                {cert.credentialId && (
                  <div className="bg-gray-100 dark:bg-gray-600 rounded-lg p-3 mb-4">
                    <p className="text-gray-600 dark:text-gray-300 text-xs font-medium">
                      Credential ID
                    </p>
                    <p className="text-gray-800 dark:text-gray-200 text-sm font-mono">
                      {cert.credentialId}
                    </p>
                  </div>
                )}

                {/* Action button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-primary-500 to-warning-500 hover:from-primary-600 hover:to-warning-600 text-white rounded-lg transition-all duration-300 flex items-center justify-center text-sm font-medium"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Certificate
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* New Certification Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500 hover:from-pastel-pink hover:to-pastel-orange dark:hover:from-pink-500 dark:hover:to-orange-500 text-white rounded-xl font-bold transition-all duration-300 flex items-center mx-auto shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Certification
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;