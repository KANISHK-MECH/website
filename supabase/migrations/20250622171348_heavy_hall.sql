/*
  # Add Initial Projects Data

  1. New Data
    - Sample projects showcasing UAV, CAD, Software, and Hardware categories
    - Includes tech stacks and descriptions for each project
    - Covers various years from 2023-2025

  2. Projects Added
    - Agricultural Spray Drone (UAV)
    - Vintage RC Aircraft (UAV) 
    - Smart Glass Cleaning Robot (Software/Hardware)
    - FPV Racing Drone (UAV)
    - Precision CAD Models (CAD)
    - Autonomous Navigation System (Software)
*/

-- Insert initial projects with proper UUIDs
INSERT INTO projects (id, title, description, category, year, tech_stack, image_url) VALUES
(
  gen_random_uuid(),
  'Agricultural Spray Drone',
  'Advanced UAV system designed for precision agriculture with automated spray control, GPS navigation, and real-time monitoring capabilities for crop protection and fertilizer application.',
  'UAV',
  '2025',
  ARRAY['Pixhawk Cube', 'Mission Planner', 'GPS Navigation', 'Spray System', 'Telemetry', 'Carbon Fiber'],
  NULL
),
(
  gen_random_uuid(),
  'Vintage RC Aircraft',
  'Classic remote-controlled aircraft featuring traditional design with modern flight control systems. Combines nostalgic aesthetics with contemporary UAV technology for recreational flying.',
  'UAV',
  '2024',
  ARRAY['Radio Control', 'FPV System', 'Camera Gimbal', 'Betaflight', 'Ducted Props'],
  '/WhatsApp Image 2025-06-22 at 8.24.50 PM.jpeg'
),
(
  gen_random_uuid(),
  'Smart Glass Cleaning Robot',
  'Autonomous robotic system for high-rise building glass cleaning. Features computer vision, path planning, and safety mechanisms. Finalist project in Smart India Hackathon 2023.',
  'Software',
  '2023',
  ARRAY['Python', 'Computer Vision', 'Arduino', 'Sensors', 'Motors', 'Autonomous Navigation'],
  NULL
),
(
  gen_random_uuid(),
  'FPV Racing Drone',
  'High-performance first-person view racing drone optimized for speed and agility. Custom frame design with advanced flight controller tuning for competitive racing.',
  'UAV',
  '2024',
  ARRAY['Speedybee F405', 'Betaflight', 'FPV System', 'Carbon Fiber', 'Racing Props', 'Telemetry'],
  NULL
),
(
  gen_random_uuid(),
  'Precision CAD Assembly Models',
  'Complex mechanical assemblies designed using advanced CAD software. Includes detailed technical drawings, stress analysis, and manufacturing specifications.',
  'CAD',
  '2024',
  ARRAY['Fusion 360', 'SolidWorks', 'PTC Creo', 'Technical Drawing', 'Stress Analysis', 'Manufacturing'],
  NULL
),
(
  gen_random_uuid(),
  'Thermal Imaging UAV System',
  'Specialized drone equipped with thermal imaging capabilities for industrial inspections, search and rescue operations, and agricultural monitoring.',
  'UAV',
  '2025',
  ARRAY['Pixhawk Cube', 'Thermal Camera', 'Mission Planner', 'Data Analytics', 'GPS Navigation'],
  NULL
),
(
  gen_random_uuid(),
  'Mechatronic Control System',
  'Integrated hardware and software solution for automated manufacturing processes. Combines sensors, actuators, and intelligent control algorithms.',
  'Hardware',
  '2024',
  ARRAY['Arduino', 'Sensors', 'Motors', 'C Programming', 'Control Systems', 'Automation'],
  NULL
),
(
  gen_random_uuid(),
  'Advanced Drone Frame Design',
  'Lightweight yet robust drone frame optimized for payload capacity and flight stability. Designed using advanced CAD tools with aerodynamic considerations.',
  'CAD',
  '2023',
  ARRAY['Siemens NX', 'Aerodynamics', 'Structural Analysis', 'Carbon Fiber', 'Weight Optimization'],
  NULL
);