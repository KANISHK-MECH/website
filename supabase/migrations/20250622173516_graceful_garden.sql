/*
  # Restrict all operations to single user

  1. Security Changes
    - Update all RLS policies to only allow kanishk.r2022mech@sece.ac.in
    - Remove general authenticated user access
    - Ensure only the specific user can create, update, or delete content
  
  2. Tables affected
    - projects
    - internships  
    - certifications
    - achievements
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert their own projects" ON projects;
DROP POLICY IF EXISTS "Users can update their own projects" ON projects;
DROP POLICY IF EXISTS "Users can delete their own projects" ON projects;

DROP POLICY IF EXISTS "Users can insert their own internships" ON internships;
DROP POLICY IF EXISTS "Users can update their own internships" ON internships;
DROP POLICY IF EXISTS "Users can delete their own internships" ON internships;

DROP POLICY IF EXISTS "Users can insert their own certifications" ON certifications;
DROP POLICY IF EXISTS "Users can update their own certifications" ON certifications;
DROP POLICY IF EXISTS "Users can delete their own certifications" ON certifications;

DROP POLICY IF EXISTS "Users can insert their own achievements" ON achievements;
DROP POLICY IF EXISTS "Users can update their own achievements" ON achievements;
DROP POLICY IF EXISTS "Users can delete their own achievements" ON achievements;

-- Create new restrictive policies for projects
CREATE POLICY "Only Kanishk can insert projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.jwt() ->> 'email' = 'kanishk.r2022mech@sece.ac.in'
  );

CREATE POLICY "Only Kanishk can update projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (
    auth.jwt() ->> 'email' = 'kanishk.r2022mech@sece.ac.in'
  )
  WITH CHECK (
    auth.jwt() ->> 'email' = 'kanishk.r2022mech@sece.ac.in'
  );

CREATE POLICY "Only Kanishk can delete projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (
    auth.jwt() ->> 'email' = 'kanishk.r2022mech@sece.ac.in'
  );

-- Create new restrictive policies for internships
CREATE POLICY "Only Kanishk can insert internships"
  ON internships
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.jwt() ->> 'email' = 'kanishk.r2022mech@sece.ac.in'
  );

CREATE POLICY "Only Kanishk can update internships"
  ON internships
  FOR UPDATE
  TO authenticated
  USING (
    auth.jwt() ->> 'email' = 'kanishk.r2022mech@sece.ac.in'
  )
  WITH CHECK (
    auth.jwt() ->> 'email' = 'kanishk.r2022mech@sece.ac.in'
  );

CREATE POLICY "Only Kanishk can delete internships"
  ON internships
  FOR DELETE
  TO authenticated
  USING (
    auth.jwt() ->> 'email' = 'kanishk.r2022mech@sece.ac.in'
  );

-- Create new restrictive policies for certifications
CREATE POLICY "Only Kanishk can insert certifications"
  ON certifications
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.jwt() ->> 'email' = 'kanishk.r2022mech@sece.ac.in'
  );

CREATE POLICY "Only Kanishk can update certifications"
  ON certifications
  FOR UPDATE
  TO authenticated
  USING (
    auth.jwt() ->> 'email' = 'kanishk.r2022mech@sece.ac.in'
  )
  WITH CHECK (
    auth.jwt() ->> 'email' = 'kanishk.r2022mech@sece.ac.in'
  );

CREATE POLICY "Only Kanishk can delete certifications"
  ON certifications
  FOR DELETE
  TO authenticated
  USING (
    auth.jwt() ->> 'email' = 'kanishk.r2022mech@sece.ac.in'
  );

-- Create new restrictive policies for achievements
CREATE POLICY "Only Kanishk can insert achievements"
  ON achievements
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.jwt() ->> 'email' = 'kanishk.r2022mech@sece.ac.in'
  );

CREATE POLICY "Only Kanishk can update achievements"
  ON achievements
  FOR UPDATE
  TO authenticated
  USING (
    auth.jwt() ->> 'email' = 'kanishk.r2022mech@sece.ac.in'
  )
  WITH CHECK (
    auth.jwt() ->> 'email' = 'kanishk.r2022mech@sece.ac.in'
  );

CREATE POLICY "Only Kanishk can delete achievements"
  ON achievements
  FOR DELETE
  TO authenticated
  USING (
    auth.jwt() ->> 'email' = 'kanishk.r2022mech@sece.ac.in'
  );