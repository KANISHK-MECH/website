import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Camera, Check, AlertCircle } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (file: File, preview: string) => void;
  onImageRemove: () => void;
  preview?: string | null;
  className?: string;
  placeholder?: string;
  accept?: string;
  maxSize?: number; // in MB
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  onImageRemove,
  preview,
  className = '',
  placeholder = 'Drop your image here, or click to browse',
  accept = 'image/*',
  maxSize = 10
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const validateFile = useCallback((file: File): string | null => {
    if (!file.type.startsWith('image/')) {
      return 'Please select a valid image file (PNG, JPG, GIF)';
    }
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }
    return null;
  }, [maxSize]);

  const handleFile = useCallback((file: File) => {
    setUploading(true);
    setError(null);

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      setUploading(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      onImageSelect(file, preview);
      setUploading(false);
    };
    reader.onerror = () => {
      setError('Failed to read file. Please try again.');
      setUploading(false);
    };
    reader.readAsDataURL(file);
  }, [validateFile, onImageSelect]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  const handleRemove = useCallback(() => {
    setError(null);
    onImageRemove();
  }, [onImageRemove]);

  return (
    <div className={className}>
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer ${
          dragActive
            ? 'border-pastel-lavender bg-pastel-lavender/10 dark:border-purple-400 dark:bg-purple-400/10 scale-105'
            : error
            ? 'border-red-400 bg-red-50 dark:border-red-500 dark:bg-red-900/20'
            : preview
            ? 'border-green-400 bg-green-50 dark:border-green-500 dark:bg-green-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-pastel-lavender dark:hover:border-purple-400 hover:bg-pastel-lavender/5 dark:hover:bg-purple-400/5'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-lg"
            >
              <X className="w-4 h-4" />
            </motion.button>
            <div className="absolute bottom-2 left-2 bg-green-500 rounded-full p-1 shadow-lg">
              <Check className="w-4 h-4 text-white" />
            </div>
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md">
              Image uploaded
            </div>
          </div>
        ) : (
          <div>
            <motion.div
              animate={{ 
                scale: dragActive ? 1.1 : uploading ? [1, 1.1, 1] : 1,
                rotate: uploading ? 360 : 0
              }}
              transition={{ 
                duration: uploading ? 1 : 0.2,
                repeat: uploading ? Infinity : 0,
                ease: uploading ? "linear" : "easeOut"
              }}
            >
              {error ? (
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-400" />
              ) : uploading ? (
                <div className="w-12 h-12 mx-auto mb-4 border-4 border-pastel-lavender border-t-transparent rounded-full animate-spin" />
              ) : (
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400 group-hover:text-pastel-lavender dark:group-hover:text-purple-400 transition-colors" />
              )}
            </motion.div>
            
            <p className={`font-medium mb-2 ${
              error 
                ? 'text-red-600 dark:text-red-400' 
                : uploading
                ? 'text-pastel-lavender dark:text-purple-400'
                : 'text-gray-600 dark:text-gray-300'
            }`}>
              {error || (uploading ? 'Processing image...' : placeholder)}
            </p>
            
            <p className="text-gray-400 text-sm mb-4">
              PNG, JPG, GIF up to {maxSize}MB
            </p>
            
            {!uploading && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block px-4 py-2 bg-gradient-to-r from-pastel-lavender to-pastel-pink text-white rounded-lg text-sm font-medium shadow-md"
              >
                Choose File
              </motion.div>
            )}
            
            <input
              type="file"
              accept={accept}
              onChange={handleInputChange}
              disabled={uploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
          </div>
        )}
      </div>
      
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center"
        >
          <AlertCircle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        </motion.div>
      )}
      
      {preview && !error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center"
        >
          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
          <p className="text-green-600 dark:text-green-400 text-sm">Image uploaded successfully!</p>
        </motion.div>
      )}
    </div>
  );
};

export default ImageUpload;