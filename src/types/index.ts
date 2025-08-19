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
  imageUrl?: string; // Add imageUrl field for storing uploaded images
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  year: string;
  category: 'Competition' | 'Publication' | 'Award' | 'Certification';
  imageUrl?: string; // Add imageUrl field for storing uploaded images
}

export interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string; // YouTube/Vimeo embed URL
  thumbnailUrl?: string; // Custom thumbnail
  projectLink?: string; // Link to related project
  category: 'UAV' | 'CAD' | 'Software' | 'Hardware';
  year: string;
  duration?: string; // Video duration
  tags: string[]; // Video tags
}

export interface Skill {
  name: string;
  category: 'Flight Controllers' | 'UAV Software' | 'Design Software' | 'Programming';
  proficiency: number;
}