import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, ExternalLink, X } from 'lucide-react';
import { useDatabase } from '../hooks/useDatabase';

const Certifications: React.FC = () => {
  const { certifications, loading } = useDatabase();
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleViewCertificate = (cert: any) => {
    if (cert.imageUrl) {
      setSelectedImage(cert.imageUrl);
      setShowImageModal(true);
    }
  };

  if (loading) {
    return (
      <section id="certifications" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-pastel-lavender border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading certifications...</p>
          </div>
        </div>
      </section>
    );
  }

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
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-warning-500 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Professional certifications and credentials in engineering, design, and technology
          </p>
        </motion.div>

        {/* Image Modal for Viewing Certificates */}
        <AnimatePresence>
          {showImageModal && selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowImageModal(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowImageModal(false)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
                <img
                  src={selectedImage}
                  alt="Certificate"
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Certifications Grid */}
        {certifications.length > 0 ? (
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
                    onClick={() => handleViewCertificate(cert)}
                    disabled={!cert.imageUrl}
                    className={`w-full px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center text-sm font-medium ${
                      cert.imageUrl
                        ? 'bg-gradient-to-r from-primary-500 to-warning-500 hover:from-primary-600 hover:to-warning-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {cert.imageUrl ? 'View Certificate' : 'No Image Available'}
                  </motion.button>
                </div>
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
              <Award className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No certifications found.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Certifications;