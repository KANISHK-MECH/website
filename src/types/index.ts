export interface Project {
  id: string;
  title: string;
  year: string;
  techStack: string[];
  description: string;
  githubUrl?: string;
  demoUrl?: string;
  category: 'UAV' | 'CAD' | 'Software' | 'Hardware';
  imageUrl?: string; // Add imageUrl field for storing uploaded images
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  duration: string;
  year: string;
  description: string;
  fullDescription: string;
  skills: string[];
  imageUrl?: string; // Add imageUrl field for storing uploaded images
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialId?: string;
  // imageUrl removed to prevent localStorage quota issues
  // For production, implement cloud storage and store only the URL
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  year: string;
  category: 'Competition' | 'Publication' | 'Award' | 'Certification';
  imageUrl?: string; // Add imageUrl field for storing uploaded images
}

export interface Skill {
  name: string;
  category: 'Flight Controllers' | 'UAV Software' | 'Design Software' | 'Programming';
  proficiency: number;
}