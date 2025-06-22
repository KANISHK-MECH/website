-- Create a specific user account for Kanishk
-- This will be handled through the auth system, but we can set up the user manually

-- Insert user into auth.users (this would normally be done through Supabase Auth)
-- For development purposes, we'll create a test user
-- In production, this should be done through the Supabase Auth signup process

-- Note: This is a placeholder migration. The actual user creation should be done through:
-- 1. Supabase Auth signup with email: kanishk.r2022mech@sece.ac.in
-- 2. Password: gliss@12345

-- For now, we'll just ensure our RLS policies are working correctly
-- The user will need to sign up through the application interface