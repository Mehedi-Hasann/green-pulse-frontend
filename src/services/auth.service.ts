import axiosInstance from '@/lib/axios';
import { AuthResponse } from '@/types/auth';

const login = async (data: any): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/auth/login', data);
  return response.data;
};

const register = async (data: FormData): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/auth/register', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const getMe = async (): Promise<AuthResponse> => {
  const response = await axiosInstance.get<AuthResponse>('/auth/me');
  return response.data;
};

export const authService = {
  login,
  register,
  getMe,
};
