import { useState, useCallback } from 'react';

export interface ImageUploadState {
  file: File | null;
  preview: string | null;
  uploading: boolean;
  error: string | null;
}

export function useImageUpload() {
  const [state, setState] = useState<ImageUploadState>({
    file: null,
    preview: null,
    uploading: false,
    error: null
  });

  const uploadImage = useCallback((file: File) => {
    setState(prev => ({ ...prev, uploading: true, error: null }));
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setState(prev => ({ ...prev, error: 'Please select a valid image file', uploading: false }));
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setState(prev => ({ ...prev, error: 'File size must be less than 10MB', uploading: false }));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      setState({
        file,
        preview,
        uploading: false,
        error: null
      });
    };
    reader.onerror = () => {
      setState(prev => ({ ...prev, error: 'Failed to read file', uploading: false }));
    };
    reader.readAsDataURL(file);
  }, []);

  const clearImage = useCallback(() => {
    setState({
      file: null,
      preview: null,
      uploading: false,
      error: null
    });
  }, []);

  const resetError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    uploadImage,
    clearImage,
    resetError
  };
}