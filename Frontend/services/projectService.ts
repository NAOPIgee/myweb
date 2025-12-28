import api, { ApiResponse } from '@/lib/api';
import { Project, CreateProjectDto } from '@/types/admin';

export const projectService = {
  getAll: async () => {
    const response = await api.get<ApiResponse<Project[]>>('/projects');
    return response.data.data;
  },
  getHome: async () => {
    const response = await api.get<ApiResponse<Project[]>>('/projects/home');
    return response.data.data;
  },
  getById: async (id: number) => {
    const response = await api.get<ApiResponse<Project>>(`/projects/${id}`);
    return response.data.data;
  },
  create: async (data: CreateProjectDto) => {
    const response = await api.post<ApiResponse<Project>>('/projects', data);
    return response.data.data;
  },
  delete: async (id: number) => {
    const response = await api.delete<ApiResponse<string>>(`/projects/${id}`);
    return response.data;
  }
};