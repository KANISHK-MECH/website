/*
  # Remove All Sample Data

  1. Data Cleanup
    - Delete all existing projects
    - Delete all existing internships
    - Delete all existing certifications
    - Delete all existing achievements
    - Clean slate for fresh data entry

  2. Purpose
    - Remove all sample/test data
    - Prepare database for real portfolio content
*/

-- Delete all sample data from all tables
DELETE FROM projects;
DELETE FROM internships;
DELETE FROM certifications;
DELETE FROM achievements;