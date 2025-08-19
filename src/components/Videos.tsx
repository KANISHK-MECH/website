import React, { useState, memo, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink, Plus, X, Lock, Calendar, Clock, Tag, Rocket, Settings, Zap, Plane } from 'lucide-react';
import { useDatabase } from '../hooks/useDatabase';
import { useAuth } from '../hooks/useAuth';
import { Video } from '../types';
import AuthModal from './AuthModal';

interface NewVideo {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
  projectLink?: string;
  category: 'UAV' | 'CAD' | 'Software' | 'Hardware';
  year: string;
  duration?: string;
  tags: string[];
}

const Videos: React.FC = memo(() => {
  const { videos, addItem, loading } = useDatabase();
  const { isAuthenticated, user } = useAuth();
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [newVideo, setNewVideo] = useState<NewVideo>({
    title: '',
    description: '',
    videoUrl: '',
    thumbnailUrl: '',
    projectLink: '',
    category: 'UAV',
    year: new Date().getFullYear().toString(),
    duration: '',
    tags: []
  });

  const categories = useMemo(() => ['All', 'UAV', 'CAD', 'Software', 'Hardware'], []);

  const filteredVideos = useMemo(() =>
    activeFilter === 'All'
      ? videos
      : videos.filter(video => video.category === activeFilter),
    [activeFilter, videos]
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
      case 'UAV': return 'from-pastel-orange to-pastel-peach dark:from-orange-500 dark:to-pink-500';
      case 'CAD': return 'from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500';
      case 'Software': return 'from-pastel-pink to-pastel-cream dark:from-pink-500 dark:to-yellow-500';
      case 'Hardware': return 'from-pastel-cream to-pastel-orange dark:from-yellow-500 dark:to-orange-500';
      default: return 'from-pastel-peach to-pastel-lavender dark:from-pink-500 dark:to-purple-500';
    }
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

  const addTag = useCallback((tag: string) => {
    if (tag.trim() && !newVideo.tags.includes(tag.trim())) {
      setNewVideo(prev => ({ ...prev, tags: [...prev.tags, tag.trim()] }));
    }
  }, [newVideo.tags]);

  const removeTag = useCallback((tagToRemove: string) => {
    setNewVideo(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  }, []);

  const extractVideoId = useCallback((url: string): string | null => {
    // YouTube URL patterns
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch) return youtubeMatch[1];

    // Vimeo URL patterns
    const vimeoRegex = /(?:vimeo\.com\/)([0-9]+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch) return vimeoMatch[1];

    return null;
  }, []);

  const getEmbedUrl = useCallback((url: string): string => {
    const videoId = extractVideoId(url);
    if (!videoId) return url;

    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('vimeo.com')) {
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  }, [extractVideoId]);

  const getThumbnailUrl = useCallback((video: Video): string => {
    if (video.thumbnailUrl) return video.thumbnailUrl;
    
    const videoId = extractVideoId(video.videoUrl);
    if (!videoId) return '';

    if (video.videoUrl.includes('youtube.com') || video.videoUrl.includes('youtu.be')) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return '';
  }, [extractVideoId]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    if (!newVideo.title.trim() || !newVideo.description.trim() || !newVideo.videoUrl.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const videoToAdd: Video = {
      id: `video-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: newVideo.title.trim(),
      description: newVideo.description.trim(),
      videoUrl: newVideo.videoUrl.trim(),
      thumbnailUrl: newVideo.thumbnailUrl?.trim() || undefined,
      projectLink: newVideo.projectLink?.trim() || undefined,
      category: newVideo.category,
      year: newVideo.year,
      duration: newVideo.duration?.trim() || undefined,
      tags: newVideo.tags
    };

    const success = await addItem('videos', videoToAdd);
    if (success) {
      resetForm();
      alert('Video added successfully!');
    } else {
      alert('Failed to add video. Please try again.');
    }
  }, [newVideo, addItem, isAuthenticated]);

  const resetForm = useCallback(() => {
    setNewVideo({
      title: '',
      description: '',
      videoUrl: '',
      thumbnailUrl: '',
      projectLink: '',
      category: 'UAV',
      year: new Date().getFullYear().toString(),
      duration: '',
      tags: []
    });
    setShowAddForm(false);
  }, []);

  return (
    <section id="videos" className="py-20 bg-gradient-to-br from-pastel-peach/10 via-white to-pastel-lavender/10 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(213,170,255,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(250,208,201,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_60%,rgba(168,85,247,0.1),transparent_50%)]" />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 opacity-10 dark:opacity-15"
      >
        <Play className="w-20 h-20 text-pastel-lavender dark:text-purple-400" />
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
            Work Videos
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pastel-lavender to-pastel-orange dark:from-purple-500 dark:to-orange-500 mx-auto mb-6" />
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Visual demonstrations of engineering projects, UAV operations, and technical innovations
          </p>
        </motion.div>

        {/* Filter and Add Video Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-3 mb-16"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const IconComponent = getCategoryIcon(category);
              const colorClass = getCategoryColor(category);

              return (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveFilter(category)}
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
          <div className="flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddClick}
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500 hover:from-pastel-pink hover:to-pastel-orange dark:hover:from-pink-500 dark:hover:to-orange-500 text-white font-bold rounded-xl transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
            >
              {isAuthenticated ? <Plus className="w-4 h-4 mr-2" /> : <Lock className="w-4 h-4 mr-2" />}
              {isAuthenticated ? 'Add Video' : 'Sign In to Add'}
            </motion.button>

            {isAuthenticated && user && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Signed in as {user.email}
              </p>
            )}
          </div>
        </motion.div>

        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />

        {/* Add Video Form Modal */}
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
                    Add New Video
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
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Video Title *
                        </label>
                        <input
                          type="text"
                          value={newVideo.title}
                          onChange={(e) => setNewVideo(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                          placeholder="Enter video title..."
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Video URL * (YouTube/Vimeo)
                        </label>
                        <input
                          type="url"
                          value={newVideo.videoUrl}
                          onChange={(e) => setNewVideo(prev => ({ ...prev, videoUrl: e.target.value }))}
                          className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                          placeholder="https://youtube.com/watch?v=..."
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Category *
                          </label>
                          <select
                            value={newVideo.category}
                            onChange={(e) => setNewVideo(prev => ({ ...prev, category: e.target.value as any }))}
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
                            value={newVideo.year}
                            onChange={(e) => setNewVideo(prev => ({ ...prev, year: e.target.value }))}
                            className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                            min="2020"
                            max="2030"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Description *
                        </label>
                        <textarea
                          value={newVideo.description}
                          onChange={(e) => setNewVideo(prev => ({ ...prev, description: e.target.value }))}
                          rows={4}
                          className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100 resize-none"
                          placeholder="Describe what this video demonstrates..."
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Duration (optional)
                          </label>
                          <input
                            type="text"
                            value={newVideo.duration}
                            onChange={(e) => setNewVideo(prev => ({ ...prev, duration: e.target.value }))}
                            className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                            placeholder="e.g., 2:30"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Project Link (optional)
                          </label>
                          <input
                            type="url"
                            value={newVideo.projectLink}
                            onChange={(e) => setNewVideo(prev => ({ ...prev, projectLink: e.target.value }))}
                            className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                            placeholder="Link to related project"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tags ({newVideo.tags.length} added)
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {newVideo.tags.map((tag, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-gradient-to-r from-pastel-lavender to-pastel-pink text-white px-3 py-1 rounded-full text-sm font-medium flex items-center"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
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
                          addTag(e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                      placeholder="Type a tag and press Enter..."
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
                      {loading ? 'Adding...' : 'Add Video'}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Player Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl w-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
                <div className="aspect-video">
                  <iframe
                    src={getEmbedUrl(selectedVideo.videoUrl)}
                    title={selectedVideo.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedVideo.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {selectedVideo.description}
                  </p>
                  {selectedVideo.projectLink && (
                    <motion.a
                      href={selectedVideo.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pastel-lavender to-pastel-pink text-white rounded-lg font-medium hover:from-pastel-pink hover:to-pastel-orange transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Project
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Videos Grid */}
        {filteredVideos.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredVideos.map((video, index) => {
              const colorClass = getCategoryColor(video.category);
              const thumbnailUrl = getThumbnailUrl(video);

              return (
                <motion.div
                  key={video.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group relative bg-gradient-to-br from-white/80 to-pastel-peach/10 dark:from-gray-800/50 dark:to-purple-900/20 backdrop-blur-sm rounded-2xl border border-pastel-lavender/20 dark:border-purple-400/30 hover:border-pastel-pink/40 dark:hover:border-pink-400/60 overflow-hidden transition-all duration-300"
                >
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video overflow-hidden cursor-pointer" onClick={() => setSelectedVideo(video)}>
                    {thumbnailUrl ? (
                      <img
                        src={thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-pastel-peach/20 to-pastel-cream/20 dark:from-orange-500/20 dark:to-yellow-500/20 flex items-center justify-center">
                        <Play className="w-16 h-16 text-gray-400 group-hover:text-pastel-lavender dark:group-hover:text-purple-400 transition-colors" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Play className="w-8 h-8 text-pastel-lavender dark:text-purple-400 ml-1" />
                      </motion.div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 bg-gradient-to-r ${colorClass} text-white text-xs font-bold rounded-full shadow-lg`}>
                        {video.category}
                      </span>
                    </div>
                    {video.duration && (
                      <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {video.duration}
                      </div>
                    )}
                  </div>

                  {/* Video Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-pastel-lavender dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                      {video.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                      {video.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {video.year}
                      </div>
                      {video.tags.length > 0 && (
                        <div className="flex items-center">
                          <Tag className="w-4 h-4 mr-1" />
                          {video.tags.length} tags
                        </div>
                      )}
                    </div>

                    {video.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {video.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="bg-pastel-peach/20 dark:bg-orange-500/20 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-lg border border-pastel-peach/30 dark:border-orange-400/50"
                          >
                            {tag}
                          </span>
                        ))}
                        {video.tags.length > 3 && (
                          <span className="bg-gradient-to-r from-pastel-lavender/20 to-pastel-pink/20 dark:from-purple-500/20 dark:to-pink-500/20 text-pastel-lavender dark:text-purple-400 text-xs px-2 py-1 rounded-lg border border-pastel-lavender/30 dark:border-purple-400/50">
                            +{video.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {video.projectLink && (
                      <motion.a
                        href={video.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        className="inline-flex items-center text-pastel-lavender dark:text-purple-400 hover:text-pastel-pink dark:hover:text-pink-400 text-sm font-medium transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        View Project
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No videos found for the selected category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
});

Videos.displayName = 'Videos';

export default Videos;