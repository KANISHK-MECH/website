import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Camera, Check } from 'lucide-react';

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

  const validateFile = useCallback((file: File): string | null => {
    if (!file.type.startsWith('image/')) {
      return 'Please select a valid image file';
    }
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }
    return null;
  }, [maxSize]);

  const handleFile = useCallback((file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      onImageSelect(file, preview);
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
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
          dragActive
            ? 'border-pastel-lavender bg-pastel-lavender/10 dark:border-purple-400 dark:bg-purple-400/10'
            : error
            ? 'border-red-400 bg-red-50 dark:border-red-500 dark:bg-red-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-pastel-lavender dark:hover:border-purple-400'
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
              className="w-full h-48 object-cover rounded-lg"
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
            <div className="absolute bottom-2 left-2 bg-green-500 rounded-full p-1">
              <Check className="w-4 h-4 text-white" />
            </div>
          </div>
        ) : (
          <div>
            <motion.div
              animate={{ scale: dragActive ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {error ? (
                <Camera className="w-12 h-12 mx-auto mb-4 text-red-400" />
              ) : (
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              )}
            </motion.div>
            <p className={`font-medium mb-2 ${error ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-300'}`}>
              {error || placeholder}
            </p>
            <p className="text-gray-400 text-sm">
              PNG, JPG, GIF up to {maxSize}MB
            </p>
            <input
              type="file"
              accept={accept}
              onChange={handleInputChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-2"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default ImageUpload;