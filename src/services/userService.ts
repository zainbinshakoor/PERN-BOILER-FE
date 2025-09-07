import { api } from './api';
import { ApiResponse, User } from '@/types';

export const userService = {
  async getProfile(): Promise<ApiResponse<User>> {
    const response = await api.get('/users/profile');
    return response.data;
  },

  async getAllUsers(): Promise<ApiResponse<User[]>> {
    const response = await api.get('/users');
    return response.data;
  },
};