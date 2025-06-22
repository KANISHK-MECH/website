/*
  # Add Certification Data to Database

  1. Data Migration
    - Insert initial certification records
    - Include DGCA certification and other professional credentials
    - Use proper UUID generation for database compatibility

  2. Data Structure
    - Professional certifications with issuing organizations
    - Years of completion and credential IDs where applicable
    - Ready for image uploads through the UI
*/

-- Insert initial certifications with proper UUIDs
INSERT INTO certifications (id, title, issuer, year, credential_id) VALUES
(
  gen_random_uuid(),
  'DGCA Remote Pilot License',
  'Directorate General of Civil Aviation',
  '2024',
  '21240104D81KR'
),
(
  gen_random_uuid(),
  'UAV Operations Certificate',
  'Sri Eshwar DroneTech',
  '2024',
  NULL
),
(
  gen_random_uuid(),
  'Advanced CAD Design Certification',
  'Autodesk',
  '2023',
  NULL
),
(
  gen_random_uuid(),
  'Flight Controller Programming',
  'ArduPilot Foundation',
  '2024',
  NULL
),
(
  gen_random_uuid(),
  'Precision Manufacturing Certificate',
  'KSB Limited',
  '2024',
  NULL
),
(
  gen_random_uuid(),
  'FPV Racing Pilot License',
  'Indian FPV Racing Association',
  '2024',
  NULL
);