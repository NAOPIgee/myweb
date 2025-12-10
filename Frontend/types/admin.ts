export interface UserProfile {
  id: number;
  name: string;
  title: string;
  email: string;
  location: string;
  avatarUrl: string;
  newspaperTitle: string;
  heroTitle: string;
  bioContent: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export interface Project {
  imageUrl: string;
  id: number;
  title: string;
  category: string;
  description: string;
  content: string;
  images: string[];
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
  createdAt: string;
}

export type CreateProjectDto = Omit<Project, 'id' | 'createdAt'>;

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  sentAt: string;
}

export interface ResumeData {
  profile: {
    name: string;
    title: string;
    email: string;
    github: string;
    linkedin: string;
    location: string;
    avatar: string;
    bioContent: string;
  };
  preferences: {
    jobType: string;
    role: string;
    location: string;
    salary: string;
    availability: string;
  };
  skills: { id?: number; category: string; items: string[] }[];
  experience: { id?: number; company: string; role: string; period: string; description: string }[];
  education: { id?: number; school: string; degree: string; period: string }[];
}