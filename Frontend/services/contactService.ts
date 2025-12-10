import api from '@/lib/api';

export type CreateMessageDto = {
  name: string;
  email: string;
  message: string;
};

export const contactService = {
  sendMessage: async (data: CreateMessageDto) => {
    const response = await api.post<CreateMessageDto>('/contact', data);
    return response.data;
  }
};