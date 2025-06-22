import { Project, Internship, Certification, Achievement, Skill } from '../types';

// These are now just default/seed data - actual data comes from Supabase
export const projects: Project[] = [];

export const internships: Internship[] = [];

export const certifications: Certification[] = [];

export const achievements: Achievement[] = [];

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