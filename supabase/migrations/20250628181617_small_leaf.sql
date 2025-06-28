/*
  # Restore Complete Portfolio Data

  1. Data Restoration
    - Restore all internships with detailed descriptions
    - Restore all achievements including competitions and certifications
    - Restore all certifications with credential IDs
    - Restore all projects with tech stacks and descriptions

  2. Complete Portfolio Content
    - 4 professional internship experiences
    - 6 major achievements and awards
    - 4 professional certifications
    - 6 innovative projects across different categories
*/

-- Insert internships data
INSERT INTO internships (id, company, role, duration, year, description, full_description, skills, location) VALUES
(
  gen_random_uuid(),
  'Sri Eshwar Drone Tech Pvt Ltd',
  'Research & Development Intern',
  '6 months',
  '2025',
  'Pixhawk Cube integration, thermal imaging systems, UAV surveying and mapping operations',
  'Conducted comprehensive research and development in UAV technologies, specializing in Pixhawk Cube flight controller integration, thermal imaging system implementation, and advanced surveying and mapping operations for various commercial applications. Worked on cutting-edge drone technologies including autonomous flight systems, payload integration, and real-time data processing for commercial surveying applications.',
  ARRAY['Pixhawk Cube', 'Thermal Imaging', 'UAV Survey', 'Mapping', 'Flight Testing', 'Autonomous Systems', 'Data Processing'],
  'Coimbatore, Tamil Nadu'
),
(
  gen_random_uuid(),
  'Pumo Technovation India Pvt Ltd',
  'CAD Design Intern',
  '1 month',
  '2025',
  'PTC Creo Drafting & AutoCAD Assembly Drawing',
  'Developed technical drawings and assembly designs using PTC Creo and AutoCAD, focusing on precision manufacturing and design optimization. Created detailed engineering drawings, performed design validation, and collaborated with manufacturing teams to ensure design feasibility and cost-effectiveness.',
  ARRAY['PTC Creo', 'AutoCAD', 'Technical Drawing', 'Assembly Design', 'Manufacturing', 'Design Validation'],
  'Coimbatore, Tamil Nadu'
),
(
  gen_random_uuid(),
  'Coimbatore CAD Solutions Pvt Ltd',
  'CAD Designer',
  '15 days',
  '2024',
  'Siemens NX CAD FPV Drone Design',
  'Specialized in FPV drone frame design using Siemens NX, focusing on aerodynamic optimization and structural analysis. Designed lightweight yet robust drone frames, performed CFD analysis for aerodynamic efficiency, and optimized designs for racing performance.',
  ARRAY['Siemens NX', 'FPV Design', 'Aerodynamics', 'Structural Analysis', 'CAD Modeling', 'CFD Analysis'],
  'Coimbatore, Tamil Nadu'
),
(
  gen_random_uuid(),
  'KSB Limited',
  'Manufacturing Intern',
  '15 days',
  '2024',
  'Valves Division – Precision Manufacturing Workflows',
  'Gained exposure to industrial valve manufacturing processes, quality control systems, and precision engineering workflows. Learned about industrial automation, quality assurance protocols, and lean manufacturing principles in a world-class manufacturing environment.',
  ARRAY['Manufacturing', 'Quality Control', 'Industrial Processes', 'Precision Engineering', 'Valve Systems', 'Automation'],
  'Coimbatore, Tamil Nadu'
);

-- Insert achievements data
INSERT INTO achievements (id, title, description, year, category) VALUES
(
  gen_random_uuid(),
  'DGCA Certified Remote Pilot',
  'Remote Pilot Certificate No: 21240104D81KR - Licensed for Small Category UAV operations',
  '2024',
  'Certification'
),
(
  gen_random_uuid(),
  'Research Paper Publications',
  'Published research papers in MEICON and ICAAM international conferences on UAV technologies and automation',
  '2024',
  'Publication'
),
(
  gen_random_uuid(),
  'Roborg 24 - 5th Place',
  'Secured 5th position in FPV Racing competition among 50+ participants',
  '2024',
  'Competition'
),
(
  gen_random_uuid(),
  'Wing & Wheels - 3rd Place',
  'Achieved 3rd position in FPV Racing competition with custom-built racing drone',
  '2024',
  'Competition'
),
(
  gen_random_uuid(),
  'Smart India Hackathon 2023 - Top 6 Finalist',
  'Smart Glass Cleaning Robot project reached national finals, competing against 10,000+ teams nationwide',
  '2023',
  'Competition'
),
(
  gen_random_uuid(),
  'College Project Expo - 1st Prize',
  'Winner of college project exhibition for innovative UAV-based agricultural monitoring system',
  '2023',
  'Award'
);

-- Insert certifications data
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
  'Advanced CAD Design Certification',
  'Autodesk',
  '2024',
  'ADV-CAD-2024-KR'
),
(
  gen_random_uuid(),
  'UAV Flight Operations Certificate',
  'Indian Institute of Technology',
  '2023',
  'IIT-UAV-2023-015'
),
(
  gen_random_uuid(),
  'Fusion 360 Professional Certification',
  'Autodesk',
  '2023',
  'F360-PRO-2023-KR'
);

-- Insert projects data
INSERT INTO projects (id, title, description, category, year, tech_stack, github_url, demo_url) VALUES
(
  gen_random_uuid(),
  'Agricultural Surveillance Drone',
  'Advanced UAV system for crop monitoring with thermal imaging and GPS navigation capabilities',
  'UAV',
  '2024',
  ARRAY['Pixhawk Cube', 'Thermal Camera', 'GPS Navigation', 'Telemetry', 'Carbon Fiber'],
  'https://github.com/KANISHK-MECH/agri-drone',
  NULL
),
(
  gen_random_uuid(),
  'Smart Glass Cleaning Robot',
  'Autonomous robot for high-rise building glass cleaning with IoT integration and safety systems',
  'Hardware',
  '2023',
  ARRAY['Arduino', 'IoT Sensors', 'Motor Control', 'Safety Systems', 'Autonomous Navigation'],
  'https://github.com/KANISHK-MECH/glass-cleaner',
  NULL
),
(
  gen_random_uuid(),
  'FPV Racing Drone Frame',
  'Lightweight carbon fiber frame design optimized for high-speed FPV racing with aerodynamic efficiency',
  'CAD',
  '2024',
  ARRAY['Siemens NX', 'Carbon Fiber', 'Aerodynamics', 'Structural Analysis', 'Racing Optimization'],
  NULL,
  NULL
),
(
  gen_random_uuid(),
  'Vintage RC Aircraft',
  'Classic remote-controlled aircraft with modern flight control systems and telemetry',
  'UAV',
  '2024',
  ARRAY['Radio Control', 'Flight Control', 'Telemetry', 'Vintage Design', 'Modern Electronics'],
  NULL,
  NULL
),
(
  gen_random_uuid(),
  'Precision Manufacturing CAD Models',
  'Industrial valve and component designs using advanced CAD software for manufacturing optimization',
  'CAD',
  '2024',
  ARRAY['PTC Creo', 'AutoCAD', 'Manufacturing', 'Precision Engineering', 'Technical Drawing'],
  NULL,
  NULL
),
(
  gen_random_uuid(),
  'Drone Fleet Management System',
  'Software solution for managing multiple UAVs with real-time monitoring and mission planning',
  'Software',
  '2024',
  ARRAY['Python', 'Mission Planning', 'Real-time Monitoring', 'Fleet Management', 'Data Analytics'],
  'https://github.com/KANISHK-MECH/drone-fleet',
  NULL
);