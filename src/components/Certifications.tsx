import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-warning-500 mx-auto mb-6"></div>
          
          {/* Empty State */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500 rounded-full flex items-center justify-center">
              <Award className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">
              Certifications Section
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              This section has been completely cleared.
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm max-w-md mx-auto">
              All certifications have been removed from the frontend as requested. 
              The section is now empty and ready for future content.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;