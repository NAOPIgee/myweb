import api from '@/lib/api';
import { Project, CreateProjectDto } from '@/types/admin';

export const projectService = {
  getAll: async () => {
    const response = await api.get<Project[]>('/projects');
    return response.data;
  },
  getHome: async () => {
    const response = await api.get<Project[]>('/projects/home');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get<Project>(`/projects/${id}`);
    return response.data;
  },
  create: async (data: CreateProjectDto) => {
    const response = await api.post<Project>('/projects', data);
    return response.data;
  },
  delete: async (id: number) => {
    await api.delete(`/projects/${id}`);
  }
};