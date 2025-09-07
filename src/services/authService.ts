import { api } from './api';
import { ApiResponse, User, AuthTokens } from '@/types';

interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

interface RegisterResponse {
  user: User;
  tokens: AuthTokens;
}

export const authService = {
  async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async register(name: string, email: string, password: string): Promise<ApiResponse<RegisterResponse>> {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },
};