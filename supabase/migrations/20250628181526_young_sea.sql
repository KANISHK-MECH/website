/*
  # Revert Database to Clean State

  1. Data Cleanup
    - Delete all existing projects
    - Delete all existing internships
    - Delete all existing certifications
    - Delete all existing achievements
    - Reset database to clean state

  2. Purpose
    - Remove all sample/test data
    - Prepare database for fresh data entry
    - Clean slate for portfolio content
*/

-- Delete all data from all tables
DELETE FROM projects;
DELETE FROM internships;
DELETE FROM certifications;
DELETE FROM achievements;

-- Reset any sequences if they exist (PostgreSQL auto-increment handling)
-- Note: Since we're using UUIDs, there are no sequences to reset

-- Verify tables are empty by checking counts
-- This is just for verification - the actual deletion happens above