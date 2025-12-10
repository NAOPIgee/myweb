import api from '@/lib/api';
import { UserProfile, Project, ContactMessage, ResumeData } from '@/types/admin';

export const adminService = {
  getProfile: async (isPublic: boolean = false) => {
    const response = await api.get<UserProfile>('/profile', {
      params: { isPublic }
    });
    return response.data;
  },
  updateProfile: async (data: Partial<UserProfile>) => (await api.put('/profile', data)).data,
  getProjects: async () => (await api.get<Project[]>('/projects')).data,
  createProject: async (data: Omit<Project, 'id' | 'createdAt'>) => (await api.post('/projects', data)).data,
  deleteProject: async (id: number) => (await api.delete(`/projects/${id}`)),
  getResume: async () => (await api.get<ResumeData>('/resume')).data,
  updateResume: async (data: ResumeData) => (await api.put('/resume', data)).data,
  getMessages: async () => (await api.get<ContactMessage[]>('/contact')).data,
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<{ url: string }>('/upload', formData);
    return response.data.url;
  },
};