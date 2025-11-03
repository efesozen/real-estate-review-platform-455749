import { api } from '@/lib/api';
import type { ReviewResponseDto, CreateReviewDto, UpdateReviewDto } from '@saas-template/core';

export const reviewsService = {
  async getAll(): Promise<ReviewResponseDto[]> {
    const response = await api.get('/reviews');
    return response.data;
  },

  async getById(id: string): Promise<ReviewResponseDto> {
    const response = await api.get(`/reviews/${id}`);
    return response.data;
  },

  async create(data: CreateReviewDto): Promise<ReviewResponseDto> {
    const response = await api.post('/reviews', data);
    return response.data;
  },

  async update(id: string, data: UpdateReviewDto): Promise<ReviewResponseDto> {
    const response = await api.put(`/reviews/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/reviews/${id}`);
  },
};
