import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_project_url' || supabaseAnonKey === 'your_supabase_anon_key') {
  console.error('Supabase environment variables are missing or not configured properly.');
  console.error('Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file');
  // Use dummy values to prevent the Invalid URL error
  const dummyUrl = 'https://dummy.supabase.co';
  const dummyKey = 'dummy-key';
  supabase = createClient(dummyUrl, dummyKey);
} else {
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
    };
  };
}