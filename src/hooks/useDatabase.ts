import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Project, Internship, Certification, Achievement } from '../types';

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
    loading: true,
    error: null
  });

  // Fetch all data from Supabase
  const fetchData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      // Fetch all data in parallel
      const [projectsRes, internshipsRes, certificationsRes, achievementsRes] = await Promise.all([
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('internships').select('*').order('created_at', { ascending: false }),
        supabase.from('certifications').select('*').order('created_at', { ascending: false }),
        supabase.from('achievements').select('*').order('created_at', { ascending: false })
      ]);

      // Check for errors
      if (projectsRes.error) throw projectsRes.error;
      if (internshipsRes.error) throw internshipsRes.error;
      if (certificationsRes.error) throw certificationsRes.error;
      if (achievementsRes.error) throw achievementsRes.error;

      // Transform data to match frontend types
      const projects: Project[] = projectsRes.data.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description,
        category: p.category,
        year: p.year,
        techStack: p.tech_stack || [],
        imageUrl: p.image_url || undefined,
        githubUrl: p.github_url || undefined,
        demoUrl: p.demo_url || undefined
      }));

      const internships: Internship[] = internshipsRes.data.map(i => ({
        id: i.id,
        company: i.company,
        role: i.role,
        duration: i.duration,
        year: i.year,
        description: i.description,
        fullDescription: i.full_description,
        skills: i.skills || [],
        imageUrl: i.image_url || undefined
      }));

      const certifications: Certification[] = certificationsRes.data.map(c => ({
        id: c.id,
        title: c.title,
        issuer: c.issuer,
        year: c.year,
        credentialId: c.credential_id || undefined,
        imageUrl: c.image_url || undefined
      }));

      const achievements: Achievement[] = achievementsRes.data.map(a => ({
        id: a.id,
        title: a.title,
        description: a.description,
        year: a.year,
        category: a.category,
        imageUrl: a.image_url || undefined
      }));

      setState({
        projects,
        internships,
        certifications,
        achievements,
        loading: false,
        error: null
      });

    } catch (error) {
      console.error('Error fetching data:', error);
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch data' 
      }));
    }
  }, []);

  // Add new item
  const addItem = useCallback(async (type: keyof Omit<DatabaseState, 'loading' | 'error'>, item: any) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('You must be signed in to add items');
      }

      let insertData: any;
      let tableName: string;

      switch (type) {
        case 'projects':
          tableName = 'projects';
          insertData = {
            title: item.title,
            description: item.description,
            category: item.category,
            year: item.year,
            tech_stack: item.techStack || [],
            image_url: item.imageUrl || null,
            github_url: item.githubUrl || null,
            demo_url: item.demoUrl || null
          };
          break;
        case 'internships':
          tableName = 'internships';
          insertData = {
            company: item.company,
            role: item.role,
            duration: item.duration,
            year: item.year,
            description: item.description,
            full_description: item.fullDescription,
            skills: item.skills || [],
            location: item.location || null,
            image_url: item.imageUrl || null
          };
          break;
        case 'certifications':
          tableName = 'certifications';
          insertData = {
            title: item.title,
            issuer: item.issuer,
            year: item.year,
            credential_id: item.credentialId || null,
            image_url: item.imageUrl || null
          };
          break;
        case 'achievements':
          tableName = 'achievements';
          insertData = {
            title: item.title,
            description: item.description,
            year: item.year,
            category: item.category,
            image_url: item.imageUrl || null
          };
          break;
        default:
          throw new Error(`Unknown type: ${type}`);
      }

      const { error } = await supabase
        .from(tableName)
        .insert([insertData]);

      if (error) throw error;

      // Refresh data after successful insert
      await fetchData();
      return true;

    } catch (error) {
      console.error(`Error adding ${type}:`, error);
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error instanceof Error ? error.message : `Failed to add ${type}` 
      }));
      return false;
    }
  }, [fetchData]);

  // Update item
  const updateItem = useCallback(async (type: keyof Omit<DatabaseState, 'loading' | 'error'>, id: string, updates: any) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('You must be signed in to update items');
      }

      let updateData: any;
      let tableName: string;

      switch (type) {
        case 'projects':
          tableName = 'projects';
          updateData = {
            ...(updates.title && { title: updates.title }),
            ...(updates.description && { description: updates.description }),
            ...(updates.category && { category: updates.category }),
            ...(updates.year && { year: updates.year }),
            ...(updates.techStack && { tech_stack: updates.techStack }),
            ...(updates.imageUrl !== undefined && { image_url: updates.imageUrl }),
            ...(updates.githubUrl !== undefined && { github_url: updates.githubUrl }),
            ...(updates.demoUrl !== undefined && { demo_url: updates.demoUrl })
          };
          break;
        case 'internships':
          tableName = 'internships';
          updateData = {
            ...(updates.company && { company: updates.company }),
            ...(updates.role && { role: updates.role }),
            ...(updates.duration && { duration: updates.duration }),
            ...(updates.year && { year: updates.year }),
            ...(updates.description && { description: updates.description }),
            ...(updates.fullDescription && { full_description: updates.fullDescription }),
            ...(updates.skills && { skills: updates.skills }),
            ...(updates.location !== undefined && { location: updates.location }),
            ...(updates.imageUrl !== undefined && { image_url: updates.imageUrl })
          };
          break;
        case 'certifications':
          tableName = 'certifications';
          updateData = {
            ...(updates.title && { title: updates.title }),
            ...(updates.issuer && { issuer: updates.issuer }),
            ...(updates.year && { year: updates.year }),
            ...(updates.credentialId !== undefined && { credential_id: updates.credentialId }),
            ...(updates.imageUrl !== undefined && { image_url: updates.imageUrl })
          };
          break;
        case 'achievements':
          tableName = 'achievements';
          updateData = {
            ...(updates.title && { title: updates.title }),
            ...(updates.description && { description: updates.description }),
            ...(updates.year && { year: updates.year }),
            ...(updates.category && { category: updates.category }),
            ...(updates.imageUrl !== undefined && { image_url: updates.imageUrl })
          };
          break;
        default:
          throw new Error(`Unknown type: ${type}`);
      }

      const { error } = await supabase
        .from(tableName)
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      // Refresh data after successful update
      await fetchData();
      return true;

    } catch (error) {
      console.error(`Error updating ${type}:`, error);
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error instanceof Error ? error.message : `Failed to update ${type}` 
      }));
      return false;
    }
  }, [fetchData]);

  // Delete item
  const deleteItem = useCallback(async (type: keyof Omit<DatabaseState, 'loading' | 'error'>, id: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('You must be signed in to delete items');
      }

      let tableName: string;
      switch (type) {
        case 'projects':
          tableName = 'projects';
          break;
        case 'internships':
          tableName = 'internships';
          break;
        case 'certifications':
          tableName = 'certifications';
          break;
        case 'achievements':
          tableName = 'achievements';
          break;
        default:
          throw new Error(`Unknown type: ${type}`);
      }

      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Refresh data after successful delete
      await fetchData();
      return true;

    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error instanceof Error ? error.message : `Failed to delete ${type}` 
      }));
      return false;
    }
  }, [fetchData]);

  // Initialize data on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    addItem,
    updateItem,
    deleteItem,
    refresh: fetchData
  };
}