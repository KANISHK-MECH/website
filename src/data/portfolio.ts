import { Project, Internship, Certification, Achievement, Skill } from '../types';

export const projects: Project[] = [
  // All projects removed
];

export const internships: Internship[] = [
  {
    id: '1',
    company: 'Sri Eshwar Drone Tech Pvt Ltd',
    role: 'Research & Development Intern',
    duration: '6 months',
    year: '2025',
    description: 'Pixhawk Cube integration, thermal imaging systems, UAV surveying and mapping operations',
    fullDescription: 'Conducted comprehensive research and development in UAV technologies, specializing in Pixhawk Cube flight controller integration, thermal imaging system implementation, and advanced surveying and mapping operations for various commercial applications.',
    skills: ['Pixhawk Cube', 'Thermal Imaging', 'UAV Survey', 'Mapping', 'Flight Testing']
  },
  {
    id: '2',
    company: 'Pumo Technovation India Pvt Ltd',
    role: 'CAD Design Intern',
    duration: '1 months',
    year: '2025',
    description: 'PTC Creo Drafting & AutoCAD Assembly Drawing',
    fullDescription: 'Developed technical drawings and assembly designs using PTC Creo and AutoCAD, focusing on precision manufacturing and design optimization.',
    skills: ['PTC Creo', 'AutoCAD', 'Technical Drawing', 'Assembly Design', 'Manufacturing']
  },
  {
    id: '3',
    company: 'Coimbatore CAD Solutions Pvt Ltd',
    role: 'CAD Designer',
    duration: '15 DAYS',
    year: '2024',
    description: 'Siemens NX CAD FPV Drone Design',
    fullDescription: 'Specialized in FPV drone frame design using Siemens NX, focusing on aerodynamic optimization and structural analysis.',
    skills: ['Siemens NX', 'FPV Design', 'Aerodynamics', 'Structural Analysis', 'CAD Modeling']
  },
  {
    id: '4',
    company: 'KSB Limited',
    role: 'Manufacturing Intern',
    duration: '15 DAYS',
    year: '2024',
    description: 'Valves Division – Precision Manufacturing Workflows',
    fullDescription: 'Exposure to industrial valve manufacturing processes, quality control systems, and precision engineering workflows.',
    skills: ['Manufacturing', 'Quality Control', 'Industrial Processes', 'Precision Engineering', 'Valve Systems']
  }
];

export const certifications: Certification[] = [
  // All certifications removed - start with empty array
];

export const achievements: Achievement[] = [
  {
    id: '1',
    title: 'DGCA Certified Pilot',
    description: 'Remote Pilot Certificate No: 21240104D81KR',
    year: '2024',
    category: 'Certification'
  },
  {
    id: '2',
    title: 'Paper Publications',
    description: 'Published research papers in MEICON and ICAAM conferences',
    year: '2024',
    category: 'Publication'
  },
  {
    id: '3',
    title: 'Roborg 24 - 5th Place',
    description: 'Secured 5th position in FPV Racing competition',
    year: '2024',
    category: 'Competition'
  },
  {
    id: '4',
    title: 'Wing & Wheels - 3rd Place',
    description: 'Achieved 3rd position in FPV Racing competition',
    year: '2024',
    category: 'Competition'
  },
  {
    id: '5',
    title: 'SIH 2023 Top 6 Finalist',
    description: 'Smart Glass Cleaning Robot project reached national finals',
    year: '2023',
    category: 'Competition'
  },
  {
    id: '6',
    title: 'Project Expo - 1st Prize',
    description: 'Winner of college project exhibition',
    year: '2023',
    category: 'Award'
  }
];

export const skills: Skill[] = [
  // Flight Controllers
  { name: 'Pixhawk', category: 'Flight Controllers', proficiency: 95 },
  { name: 'Pixhawk Cube', category: 'Flight Controllers', proficiency: 92 },
  { name: 'K++', category: 'Flight Controllers', proficiency: 88 },
  { name: 'HC Robotics E504', category: 'Flight Controllers', proficiency: 85 },
  { name: 'Speedybee Wing F405', category: 'Flight Controllers', proficiency: 90 },
  { name: 'KK 2.1.5', category: 'Flight Controllers', proficiency: 90 },
  { name: 'DJI Naza', category: 'Flight Controllers', proficiency: 85 },
  { name: 'ArduCopter', category: 'Flight Controllers', proficiency: 88 },
  { name: 'K++ Controller', category: 'Flight Controllers', proficiency: 80 },
  { name: 'Speedybee F405', category: 'Flight Controllers', proficiency: 85 },
  { name: 'APM 2.8', category: 'Flight Controllers', proficiency: 82 },

  // UAV Software
  { name: 'Betaflight', category: 'UAV Software', proficiency: 92 },
  { name: 'Mission Planner', category: 'UAV Software', proficiency: 90 },
  { name: 'ArduPilot', category: 'UAV Software', proficiency: 88 },
  { name: 'Jiyi', category: 'UAV Software', proficiency: 85 },
  { name: 'Impulse RC', category: 'UAV Software', proficiency: 82 },
  { name: 'DJI Assistant', category: 'UAV Software', proficiency: 88 },
  { name: 'CleanFlight', category: 'UAV Software', proficiency: 85 },
  { name: 'Pix4D', category: 'UAV Software', proficiency: 75 },
  { name: 'Skydeck', category: 'UAV Software', proficiency: 70 },
  { name: 'INAV', category: 'UAV Software', proficiency: 80 },
  { name: 'QGroundControl', category: 'UAV Software', proficiency: 85 },

  // Design Software
  { name: 'Fusion 360', category: 'Design Software', proficiency: 95 },
  { name: 'NX CAD', category: 'Design Software', proficiency: 90 },
  { name: 'PTC Creo', category: 'Design Software', proficiency: 92 },
  { name: 'SolidWorks', category: 'Design Software', proficiency: 88 },
  { name: 'Solid Edge', category: 'Design Software', proficiency: 85 },
  { name: 'AutoCAD', category: 'Design Software', proficiency: 92 },
  { name: 'Photoshop', category: 'Design Software', proficiency: 75 },
  { name: 'Illustrator', category: 'Design Software', proficiency: 70 },

  // Programming
  { name: 'Python', category: 'Programming', proficiency: 85 },
  { name: 'C', category: 'Programming', proficiency: 88 },
  { name: 'HTML', category: 'Programming', proficiency: 80 },
  { name: 'CSS', category: 'Programming', proficiency: 75 }
];