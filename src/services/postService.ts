import { api } from './api';
import { ApiResponse, PaginatedResponse, Post } from '@/types';

interface CreatePostData {
  title: string;
  content?: string;
  published?: boolean;
}

interface UpdatePostData {
  title?: string;
  content?: string;
  published?: boolean;
}

export const postService = {
  async getAllPosts(page = 1, limit = 10): Promise<PaginatedResponse<Post>> {
    const response = await api.get(`/posts?page=${page}&limit=${limit}`);
    return response.data;
  },

  async getPostById(id: string): Promise<ApiResponse<Post>> {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  async createPost(data: CreatePostData): Promise<ApiResponse<Post>> {
    const response = await api.post('/posts', data);
    return response.data;
  },

  async updatePost(id: string, data: UpdatePostData): Promise<ApiResponse<Post>> {
    const response = await api.put(`/posts/${id}`, data);
    return response.data;
  },

  async deletePost(id: string): Promise<ApiResponse> {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },
};