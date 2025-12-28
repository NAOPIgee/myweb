import api, { ApiResponse } from '@/lib/api';
import {
  UserProfile,
  Project,
  ContactMessage,
  ResumeData
} from '@/types/admin';

export const adminService = {
  getProfile: async (isPublic: boolean = false) => {
    const response = await api.get<ApiResponse<UserProfile>>('/profile', {
      params: { isPublic }
    });
    return response.data.data;
  },

  updateProfile: async (data: Partial<UserProfile>) => {
    const response = await api.put<ApiResponse<UserProfile>>('/profile', data);
    return response.data.data;
  },

  getProjects: async () => {
    const response = await api.get<ApiResponse<Project[]>>('/projects');
    return response.data.data;
  },

  createProject: async (data: Omit<Project, 'id' | 'createdAt'>) => {
    const response = await api.post<ApiResponse<Project>>('/projects', data);
    return response.data.data;
  },

  deleteProject: async (id: number) => {
    const response = await api.delete<ApiResponse<string>>(`/projects/${id}`);
    return response.data;
  },

  getResume: async () => {
    const response = await api.get<ApiResponse<ResumeData>>('/resume');
    return response.data.data;
  },

  updateResume: async (data: ResumeData) => {
    const response = await api.put<ApiResponse<null>>('/resume', data);
    return response.data;
  },

  getMessages: async () => {
    const response = await api.get<ApiResponse<ContactMessage[]>>('/contact');
    return response.data.data;
  },

  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post<{ url: string }>('/upload', formData);
    return response.data.url;
  },
};