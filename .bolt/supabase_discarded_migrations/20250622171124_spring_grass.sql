/*
  # Seed Initial Portfolio Data

  1. Insert initial internships data
  2. Insert initial achievements data
  
  Note: Projects and certifications start empty as requested
*/

-- Insert initial internships
INSERT INTO internships (id, company, role, duration, year, description, full_description, skills) VALUES
(
  'internship-1',
  'Sri Eshwar Drone Tech Pvt Ltd',
  'Research & Development Intern',
  '6 months',
  '2025',
  'Pixhawk Cube integration, thermal imaging systems, UAV surveying and mapping operations',
  'Conducted comprehensive research and development in UAV technologies, specializing in Pixhawk Cube flight controller integration, thermal imaging system implementation, and advanced surveying and mapping operations for various commercial applications.',
  ARRAY['Pixhawk Cube', 'Thermal Imaging', 'UAV Survey', 'Mapping', 'Flight Testing']
),
(
  'internship-2',
  'Pumo Technovation India Pvt Ltd',
  'CAD Design Intern',
  '1 months',
  '2025',
  'PTC Creo Drafting & AutoCAD Assembly Drawing',
  'Developed technical drawings and assembly designs using PTC Creo and AutoCAD, focusing on precision manufacturing and design optimization.',
  ARRAY['PTC Creo', 'AutoCAD', 'Technical Drawing', 'Assembly Design', 'Manufacturing']
),
(
  'internship-3',
  'Coimbatore CAD Solutions Pvt Ltd',
  'CAD Designer',
  '15 DAYS',
  '2024',
  'Siemens NX CAD FPV Drone Design',
  'Specialized in FPV drone frame design using Siemens NX, focusing on aerodynamic optimization and structural analysis.',
  ARRAY['Siemens NX', 'FPV Design', 'Aerodynamics', 'Structural Analysis', 'CAD Modeling']
),
(
  'internship-4',
  'KSB Limited',
  'Manufacturing Intern',
  '15 DAYS',
  '2024',
  'Valves Division – Precision Manufacturing Workflows',
  'Exposure to industrial valve manufacturing processes, quality control systems, and precision engineering workflows.',
  ARRAY['Manufacturing', 'Quality Control', 'Industrial Processes', 'Precision Engineering', 'Valve Systems']
);

-- Insert initial achievements
INSERT INTO achievements (id, title, description, year, category) VALUES
(
  'achievement-1',
  'DGCA Certified Pilot',
  'Remote Pilot Certificate No: 21240104D81KR',
  '2024',
  'Certification'
),
(
  'achievement-2',
  'Paper Publications',
  'Published research papers in MEICON and ICAAM conferences',
  '2024',
  'Publication'
),
(
  'achievement-3',
  'Roborg 24 - 5th Place',
  'Secured 5th position in FPV Racing competition',
  '2024',
  'Competition'
),
(
  'achievement-4',
  'Wing & Wheels - 3rd Place',
  'Achieved 3rd position in FPV Racing competition',
  '2024',
  'Competition'
),
(
  'achievement-5',
  'SIH 2023 Top 6 Finalist',
  'Smart Glass Cleaning Robot project reached national finals',
  '2023',
  'Competition'
),
(
  'achievement-6',
  'Project Expo - 1st Prize',
  'Winner of college project exhibition',
  '2023',
  'Award'
);