import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if the current user is the authorized user
  const isAuthorizedUser = (user: User | null): boolean => {
    return user?.email === 'kanishk.r2022mech@sece.ac.in';
  };

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      
      // Only set user if they are the authorized user
      if (currentUser && isAuthorizedUser(currentUser)) {
        setUser(currentUser);
      } else {
        setUser(null);
        // Sign out unauthorized users
        if (currentUser && !isAuthorizedUser(currentUser)) {
          await supabase.auth.signOut();
        }
      }
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null;
        
        // Only allow the authorized user
        if (currentUser && isAuthorizedUser(currentUser)) {
          setUser(currentUser);
        } else {
          setUser(null);
          // Sign out unauthorized users
          if (currentUser && !isAuthorizedUser(currentUser)) {
            await supabase.auth.signOut();
          }
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return {
    user,
    loading,
    signOut,
    isAuthenticated: !!user && isAuthorizedUser(user),
    isAuthorizedUser: user ? isAuthorizedUser(user) : false
  };
}