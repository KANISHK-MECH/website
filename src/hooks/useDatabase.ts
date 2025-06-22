import { useState, useEffect, useCallback } from 'react';
import { Project, Internship, Certification, Achievement } from '../types';

// Simulated database operations - replace with actual API calls
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

  // Load data from localStorage (simulating database)
  const loadData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const projects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
      const internships = JSON.parse(localStorage.getItem('portfolio_internships') || '[]');
      const certifications = JSON.parse(localStorage.getItem('portfolio_certifications') || '[]');
      const achievements = JSON.parse(localStorage.getItem('portfolio_achievements') || '[]');
      
      setState({
        projects,
        internships,
        certifications,
        achievements,
        loading: false,
        error: null
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load data'
      }));
    }
  }, []);

  // Save data to localStorage (simulating database)
  const saveData = useCallback(async (type: keyof Omit<DatabaseState, 'loading' | 'error'>, data: any[]) => {
    try {
      localStorage.setItem(`portfolio_${type}`, JSON.stringify(data));
      setState(prev => ({ ...prev, [type]: data }));
      return true;
    } catch (error) {
      setState(prev => ({ ...prev, error: `Failed to save ${type}` }));
      return false;
    }
  }, []);

  // Add new item
  const addItem = useCallback(async (type: keyof Omit<DatabaseState, 'loading' | 'error'>, item: any) => {
    const currentData = state[type];
    const newData = [item, ...currentData];
    return await saveData(type, newData);
  }, [state, saveData]);

  // Update item
  const updateItem = useCallback(async (type: keyof Omit<DatabaseState, 'loading' | 'error'>, id: string, updates: any) => {
    const currentData = state[type];
    const newData = currentData.map((item: any) => 
      item.id === id ? { ...item, ...updates } : item
    );
    return await saveData(type, newData);
  }, [state, saveData]);

  // Delete item
  const deleteItem = useCallback(async (type: keyof Omit<DatabaseState, 'loading' | 'error'>, id: string) => {
    const currentData = state[type];
    const newData = currentData.filter((item: any) => item.id !== id);
    return await saveData(type, newData);
  }, [state, saveData]);

  // Initialize data on mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    ...state,
    loadData,
    addItem,
    updateItem,
    deleteItem
  };
}