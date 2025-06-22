/*
  # Remove All Projects

  1. Changes
    - Delete all existing projects from the projects table
    - This will clear the projects table completely

  2. Security
    - No changes to RLS policies
    - Table structure remains intact
*/

-- Delete all projects from the database
DELETE FROM projects;