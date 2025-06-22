import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, ExternalLink, Plus, X, Eye, Download } from 'lucide-react';
import { useDatabase } from '../hooks/useDatabase';
import { Certification } from '../types';
import ImageUpload from './ImageUpload';

interface NewCertification {
  title: string;
  issuer: string;
  year: string;
  credentialId?: string;
  image?: File;
  imagePreview?: string;
}

const Certifications: React.FC = () => {
  const { certifications, addItem, loading } = useDatabase();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCertTitle, setSelectedCertTitle] = useState<string>('');
  const [newCertification, setNewCertification] = useState<NewCertification>({
    title: '',
    issuer: '',
    year: new Date().getFullYear().toString(),
    credentialId: '',
    image: undefined,
    imagePreview: undefined
  });

  const handleImageSelect = (file: File, preview: string) => {
    setNewCertification(prev => ({ ...prev, image: file, imagePreview: preview }));
  };

  const handleImageRemove = () => {
    setNewCertification(prev => ({ ...prev, image: undefined, imagePreview: undefined }));
  };

  const handleViewCertificate = (cert: Certification & { imageUrl?: string }) => {
    if (cert.imageUrl) {
      setSelectedImage(cert.imageUrl);
      setSelectedCertTitle(cert.title);
      setShowImageModal(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCertification.title.trim() || !newCertification.issuer.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const certificationToAdd: Certification & { imageUrl?: string } = {
      id: `cert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: newCertification.title.trim(),
      issuer: newCertification.issuer.trim(),
      year: newCertification.year,
      credentialId: newCertification.credentialId?.trim() || undefined,
      imageUrl: newCertification.imagePreview
    };
    
    const success = await addItem('certifications', certificationToAdd);
    if (success) {
      resetForm();
      alert('Certification added successfully!');
    } else {
      alert('Failed to add certification. Please try again.');
    }
  };

  const resetForm = () => {
    setNewCertification({
      title: '',
      issuer: '',
      year: new Date().getFullYear().toString(),
      credentialId: '',
      image: undefined,
      imagePreview: undefined
    });
    setShowAddForm(false);
  };

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
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(true)}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500 hover:from-pastel-pink hover:to-pastel-orange dark:hover:from-pink-500 dark:hover:to-orange-500 text-white font-bold rounded-xl transition-all duration-300 flex items-center mx-auto shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Certification
          </motion.button>
        </motion.div>

        {/* Add Certification Form Modal */}
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
                    Add New Certification
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
                  {/* Certificate Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Certificate Image *
                    </label>
                    <ImageUpload
                      onImageSelect={handleImageSelect}
                      onImageRemove={handleImageRemove}
                      preview={newCertification.imagePreview}
                      placeholder="Upload your certificate image"
                    />
                  </div>

                  {/* Basic Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Certification Title *
                      </label>
                      <input
                        type="text"
                        value={newCertification.title}
                        onChange={(e) => setNewCertification(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                        placeholder="e.g., DGCA Remote Pilot License"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Issuing Organization *
                      </label>
                      <input
                        type="text"
                        value={newCertification.issuer}
                        onChange={(e) => setNewCertification(prev => ({ ...prev, issuer: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                        placeholder="e.g., Sri Eshwar DroneTech"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Year Obtained *
                      </label>
                      <input
                        type="number"
                        value={newCertification.year}
                        onChange={(e) => setNewCertification(prev => ({ ...prev, year: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                        min="2020"
                        max="2030"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Credential ID (Optional)
                      </label>
                      <input
                        type="text"
                        value={newCertification.credentialId}
                        onChange={(e) => setNewCertification(prev => ({ ...prev, credentialId: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                        placeholder="e.g., 21240104D81KR"
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
                      disabled={loading || !newCertification.imagePreview}
                      className="px-8 py-3 bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500 hover:from-pastel-pink hover:to-pastel-orange dark:hover:from-pink-500 dark:hover:to-orange-500 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                    >
                      {loading ? 'Adding...' : 'Add Certification'}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image Modal */}
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
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-600">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedCertTitle}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = selectedImage;
                        link.download = `${selectedCertTitle}.jpg`;
                        link.click();
                      }}
                      className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white transition-colors"
                      title="Download Certificate"
                    >
                      <Download className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowImageModal(false)}
                      className="w-10 h-10 bg-gray-500 hover:bg-gray-600 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Certificate Image */}
                <div className="p-6">
                  <img
                    src={selectedImage}
                    alt={selectedCertTitle}
                    className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-lg"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Certifications Grid */}
        {certifications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => {
              const certWithImage = cert as Certification & { imageUrl?: string };
              
              return (
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
                      onClick={() => handleViewCertificate(certWithImage)}
                      disabled={!certWithImage.imageUrl}
                      className={`w-full px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center text-sm font-medium ${
                        certWithImage.imageUrl
                          ? 'bg-gradient-to-r from-primary-500 to-warning-500 hover:from-primary-600 hover:to-warning-600 text-white'
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {certWithImage.imageUrl ? 'View Certificate' : 'No Image Available'}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
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
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              No certifications added yet.
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Click "Add Certification" to get started!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Certifications;