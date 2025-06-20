export interface Project {
  id: string;
  title: string;
  year: string;
  techStack: string[];
  description: string;
  githubUrl?: string;
  demoUrl?: string;
  category: 'UAV' | 'CAD' | 'Software' | 'Hardware';
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
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialId?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  year: string;
  category: 'Competition' | 'Publication' | 'Award' | 'Certification';
}

export interface Skill {
  name: string;
  category: 'Flight Controllers' | 'UAV Software' | 'Design Software' | 'Programming';
  proficiency: number;
}