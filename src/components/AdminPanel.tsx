import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, X, Save, Settings, Database, Users, Award, Briefcase, Code } from 'lucide-react';
import { useDatabase } from '../hooks/useDatabase';
import { useAuth } from '../hooks/useAuth';
import { Project, Internship, Certification, Achievement } from '../types';
import ImageUpload from './ImageUpload';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { projects, internships, certifications, achievements, addItem, updateItem, deleteItem, loading } = useDatabase();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'projects' | 'internships' | 'certifications' | 'achievements'>('projects');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const tabs = [
    { id: 'projects', label: 'Projects', icon: Code, count: projects.length },
    { id: 'internships', label: 'Experience', icon: Briefcase, count: internships.length },
    { id: 'certifications', label: 'Certifications', icon: Award, count: certifications.length },
    { id: 'achievements', label: 'Achievements', icon: Award, count: achievements.length }
  ];

  const [formData, setFormData] = useState<any>({});

  const resetForm = () => {
    setFormData({});
    setShowAddForm(false);
    setEditingItem(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let success = false;
    if (editingItem) {
      success = await updateItem(activeTab, editingItem.id, formData);
    } else {
      const itemToAdd = {
        ...formData,
        id: `${activeTab}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };
      success = await addItem(activeTab, itemToAdd);
    }
    
    if (success) {
      resetForm();
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData(item);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      await deleteItem(activeTab, id);
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'projects':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Project Title"
                value={formData.title || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <select
                value={formData.category || 'UAV'}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="UAV">UAV</option>
                <option value="CAD">CAD</option>
                <option value="Software">Software</option>
                <option value="Hardware">Hardware</option>
              </select>
            </div>
            <input
              type="number"
              placeholder="Year"
              value={formData.year || new Date().getFullYear()}
              onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
            <textarea
              placeholder="Project Description"
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              required
            />
            <input
              type="text"
              placeholder="Tech Stack (comma separated)"
              value={formData.techStack?.join(', ') || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, techStack: e.target.value.split(',').map(s => s.trim()) }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="url"
                placeholder="GitHub URL (optional)"
                value={formData.githubUrl || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <input
                type="url"
                placeholder="Demo URL (optional)"
                value={formData.demoUrl || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, demoUrl: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        );

      case 'internships':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Company Name"
                value={formData.company || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                placeholder="Role/Position"
                value={formData.role || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Duration (e.g., 6 months)"
                value={formData.duration || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <input
                type="number"
                placeholder="Year"
                value={formData.year || new Date().getFullYear()}
                onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <textarea
              placeholder="Brief Description"
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              required
            />
            <textarea
              placeholder="Detailed Description"
              value={formData.fullDescription || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, fullDescription: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              required
            />
            <input
              type="text"
              placeholder="Skills (comma separated)"
              value={formData.skills?.join(', ') || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value.split(',').map(s => s.trim()) }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        );

      case 'certifications':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Certification Title"
                value={formData.title || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                placeholder="Issuing Organization"
                value={formData.issuer || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, issuer: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Year"
                value={formData.year || new Date().getFullYear()}
                onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                placeholder="Credential ID (optional)"
                value={formData.credentialId || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, credentialId: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        );

      case 'achievements':
        return (
          <div className="space-y-6">
            <input
              type="text"
              placeholder="Achievement Title"
              value={formData.title || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={formData.category || 'Competition'}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="Competition">Competition</option>
                <option value="Publication">Publication</option>
                <option value="Award">Award</option>
                <option value="Certification">Certification</option>
              </select>
              <input
                type="number"
                placeholder="Year"
                value={formData.year || new Date().getFullYear()}
                onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <textarea
              placeholder="Achievement Description"
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              required
            />
          </div>
        );

      default:
        return null;
    }
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'projects': return projects;
      case 'internships': return internships;
      case 'certifications': return certifications;
      case 'achievements': return achievements;
      default: return [];
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Settings className="w-8 h-8 mr-3" />
                <div>
                  <h2 className="text-2xl font-bold">Admin Panel</h2>
                  <p className="text-purple-100">Manage your portfolio content</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-purple-100">Signed in as</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>

          <div className="flex h-[calc(90vh-120px)]">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setActiveTab(tab.id as any);
                        resetForm();
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-purple-100 text-purple-700 border border-purple-200'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center">
                        <IconComponent className="w-5 h-5 mr-3" />
                        <span className="font-medium">{tab.label}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        activeTab === tab.id
                          ? 'bg-purple-200 text-purple-700'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {tab.count}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* Content Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900 capitalize">
                    Manage {activeTab}
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddForm(true)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium flex items-center shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New
                  </motion.button>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-6">
                {showAddForm ? (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="text-lg font-bold text-gray-900">
                        {editingItem ? 'Edit' : 'Add New'} {activeTab.slice(0, -1)}
                      </h4>
                      <button
                        onClick={resetForm}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                      {renderForm()}
                      
                      <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
                        <button
                          type="button"
                          onClick={resetForm}
                          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={loading}
                          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 flex items-center"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {loading ? 'Saving...' : editingItem ? 'Update' : 'Save'}
                        </motion.button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {getCurrentData().length === 0 ? (
                      <div className="text-center py-12">
                        <Database className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500 text-lg">No {activeTab} found</p>
                        <p className="text-gray-400">Click "Add New" to create your first entry</p>
                      </div>
                    ) : (
                      getCurrentData().map((item: any) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h5 className="font-bold text-gray-900 mb-1">
                                {item.title || item.company || item.name}
                              </h5>
                              <p className="text-gray-600 text-sm mb-2">
                                {item.description || item.role || item.issuer}
                              </p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span>{item.year}</span>
                                {item.category && <span className="px-2 py-1 bg-gray-100 rounded">{item.category}</span>}
                              </div>
                            </div>
                            <div className="flex space-x-2 ml-4">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleEdit(item)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleDelete(item.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminPanel;