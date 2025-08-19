import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase;

// Check if environment variables are properly configured
const isConfigured = supabaseUrl && 
                    supabaseAnonKey && 
                    supabaseUrl !== 'your_supabase_project_url' && 
                    supabaseAnonKey !== 'your_supabase_anon_key' &&
                    supabaseUrl.startsWith('https://') &&
                    supabaseUrl.includes('.supabase.co');

if (!isConfigured) {
  console.error('Supabase environment variables are missing or not configured properly.');
  console.error('Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file');
  console.error('Current values:', { supabaseUrl, supabaseAnonKey: supabaseAnonKey ? '[HIDDEN]' : 'undefined' });
  
  // Create a mock client that throws helpful errors
  supabase = {
    from: () => ({
      select: () => Promise.reject(new Error('Supabase not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file')),
      insert: () => Promise.reject(new Error('Supabase not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file')),
      update: () => Promise.reject(new Error('Supabase not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file')),
      delete: () => Promise.reject(new Error('Supabase not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file')),
    }),
    auth: {
      signUp: () => Promise.reject(new Error('Supabase not configured')),
      signInWithPassword: () => Promise.reject(new Error('Supabase not configured')),
      signOut: () => Promise.reject(new Error('Supabase not configured')),
      getUser: () => Promise.reject(new Error('Supabase not configured')),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    }
  };
} else {
  console.log('Supabase configured successfully');
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

// Database types
export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          category: 'UAV' | 'CAD' | 'Software' | 'Hardware';
          year: string;
          tech_stack: string[];
          image_url: string | null;
          github_url: string | null;
          demo_url: string | null;
          user_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          category: 'UAV' | 'CAD' | 'Software' | 'Hardware';
          year: string;
          tech_stack?: string[];
          image_url?: string | null;
          github_url?: string | null;
          demo_url?: string | null;
          user_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          category?: 'UAV' | 'CAD' | 'Software' | 'Hardware';
          year?: string;
          tech_stack?: string[];
          image_url?: string | null;
          github_url?: string | null;
          demo_url?: string | null;
          user_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      internships: {
        Row: {
          id: string;
          company: string;
          role: string;
          duration: string;
          year: string;
          description: string;
          full_description: string;
          skills: string[];
          location: string | null;
          image_url: string | null;
          user_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company: string;
          role: string;
          duration: string;
          year: string;
          description: string;
          full_description: string;
          skills?: string[];
          location?: string | null;
          image_url?: string | null;
          user_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company?: string;
          role?: string;
          duration?: string;
          year?: string;
          description?: string;
          full_description?: string;
          skills?: string[];
          location?: string | null;
          image_url?: string | null;
          user_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      certifications: {
        Row: {
          id: string;
          title: string;
          issuer: string;
          year: string;
          credential_id: string | null;
          image_url: string | null;
          user_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          issuer: string;
          year: string;
          credential_id?: string | null;
          image_url?: string | null;
          user_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          issuer?: string;
          year?: string;
          credential_id?: string | null;
          image_url?: string | null;
          user_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      achievements: {
        Row: {
          id: string;
          title: string;
          description: string;
          year: string;
          category: 'Competition' | 'Publication' | 'Award' | 'Certification';
          image_url: string | null;
          user_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          year: string;
          category: 'Competition' | 'Publication' | 'Award' | 'Certification';
          image_url?: string | null;
          user_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          year?: string;
          category?: 'Competition' | 'Publication' | 'Award' | 'Certification';
          image_url?: string | null;
          user_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      videos: {
        Row: {
          id: string;
          title: string;
          description: string;
          video_url: string;
          thumbnail_url: string | null;
          project_link: string | null;
          category: 'UAV' | 'CAD' | 'Software' | 'Hardware';
          year: string;
          duration: string | null;
          tags: string[];
          user_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          video_url: string;
          thumbnail_url?: string | null;
          project_link?: string | null;
          category: 'UAV' | 'CAD' | 'Software' | 'Hardware';
          year: string;
          duration?: string | null;
          tags?: string[];
          user_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          video_url?: string;
          thumbnail_url?: string | null;
          project_link?: string | null;
          category?: 'UAV' | 'CAD' | 'Software' | 'Hardware';
          year?: string;
          duration?: string | null;
          tags?: string[];
          user_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}