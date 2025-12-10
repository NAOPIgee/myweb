export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  content: string;
  images: string[];
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
  createdAt?: string;
}

export type CreateProjectDto = Omit<Project, 'id' | 'createdAt'>;