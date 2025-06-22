import { useState, useEffect, useCallback } from 'react';
import { Project, Internship, Certification, Achievement } from '../types';
import { projects as initialProjects, internships as initialInternships, certifications as initialCertifications, achievements as initialAchievements } from '../data/portfolio';

export interface DatabaseState {
  projects: Project[];
  internships: Internship[];
  certifications: Certification[];
  achievements: Achievement[];
  loading: boolean;
  error: string | null;
}

export function useDatabase() {
  const [state, setState] = useState<DatabaseState>({
    projects: [],
    internships: [],
    certifications: [],
    achievements: [],
    loading: false,
    error: null
  });

  // Initialize data from localStorage or use defaults
  const initializeData = useCallback(() => {
    try {
      const storedProjects = localStorage.getItem('portfolio_projects');
      const storedInternships = localStorage.getItem('portfolio_internships');
      const storedCertifications = localStorage.getItem('portfolio_certifications');
      const storedAchievements = localStorage.getItem('portfolio_achievements');

      setState({
        projects: storedProjects ? JSON.parse(storedProjects) : initialProjects,
        internships: storedInternships ? JSON.parse(storedInternships) : initialInternships,
        certifications: storedCertifications ? JSON.parse(storedCertifications) : initialCertifications,
        achievements: storedAchievements ? JSON.parse(storedAchievements) : initialAchievements,
        loading: false,
        error: null
      });

      // Save initial data if not exists
      if (!storedProjects) localStorage.setItem('portfolio_projects', JSON.stringify(initialProjects));
      if (!storedInternships) localStorage.setItem('portfolio_internships', JSON.stringify(initialInternships));
      if (!storedCertifications) localStorage.setItem('portfolio_certifications', JSON.stringify(initialCertifications));
      if (!storedAchievements) localStorage.setItem('portfolio_achievements', JSON.stringify(initialAchievements));
    } catch (error) {
      console.error('Error initializing data:', error);
      setState(prev => ({ ...prev, error: 'Failed to load data', loading: false }));
    }
  }, []);

  // Save data to localStorage
  const saveToStorage = useCallback((type: keyof Omit<DatabaseState, 'loading' | 'error'>, data: any[]) => {
    try {
      localStorage.setItem(`portfolio_${type}`, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error(`Error saving ${type}:`, error);
      return false;
    }
  }, []);

  // Add new item
  const addItem = useCallback(async (type: keyof Omit<DatabaseState, 'loading' | 'error'>, item: any) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const currentData = state[type];
      const newData = [item, ...currentData];
      
      const saved = saveToStorage(type, newData);
      if (saved) {
        setState(prev => ({ 
          ...prev, 
          [type]: newData,
          loading: false,
          error: null 
        }));
        return true;
      } else {
        setState(prev => ({ ...prev, loading: false, error: `Failed to save ${type}` }));
        return false;
      }
    } catch (error) {
      setState(prev => ({ ...prev, loading: false, error: `Error adding ${type}` }));
      return false;
    }
  }, [state, saveToStorage]);

  // Update item
  const updateItem = useCallback(async (type: keyof Omit<DatabaseState, 'loading' | 'error'>, id: string, updates: any) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const currentData = state[type];
      const newData = currentData.map((item: any) => 
        item.id === id ? { ...item, ...updates } : item
      );
      
      const saved = saveToStorage(type, newData);
      if (saved) {
        setState(prev => ({ 
          ...prev, 
          [type]: newData,
          loading: false,
          error: null 
        }));
        return true;
      } else {
        setState(prev => ({ ...prev, loading: false, error: `Failed to update ${type}` }));
        return false;
      }
    } catch (error) {
      setState(prev => ({ ...prev, loading: false, error: `Error updating ${type}` }));
      return false;
    }
  }, [state, saveToStorage]);

  // Delete item
  const deleteItem = useCallback(async (type: keyof Omit<DatabaseState, 'loading' | 'error'>, id: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const currentData = state[type];
      const newData = currentData.filter((item: any) => item.id !== id);
      
      const saved = saveToStorage(type, newData);
      if (saved) {
        setState(prev => ({ 
          ...prev, 
          [type]: newData,
          loading: false,
          error: null 
        }));
        return true;
      } else {
        setState(prev => ({ ...prev, loading: false, error: `Failed to delete ${type}` }));
        return false;
      }
    } catch (error) {
      setState(prev => ({ ...prev, loading: false, error: `Error deleting ${type}` }));
      return false;
    }
  }, [state, saveToStorage]);

  // Initialize data on mount
  useEffect(() => {
    initializeData();
  }, [initializeData]);

  return {
    ...state,
    addItem,
    updateItem,
    deleteItem,
    refresh: initializeData
  };
}