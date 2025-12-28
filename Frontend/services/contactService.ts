import api, { ApiResponse } from '@/lib/api';

export type CreateMessageDto = {
  name: string;
  email: string;
  message: string;
};

export const contactService = {
  sendMessage: async (data: CreateMessageDto) => {
    const response = await api.post<ApiResponse<CreateMessageDto>>('/contact', data);
    return response.data;
  }
};