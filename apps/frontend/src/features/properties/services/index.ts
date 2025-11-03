import { api } from '@/lib/api';
import type { PropertyResponseDto, CreatePropertyDto, UpdatePropertyDto } from '@saas-template/core';

export const propertiesService = {
  async getAll(): Promise<PropertyResponseDto[]> {
    const response = await api.get('/properties');
    return response.data;
  },

  async getById(id: string): Promise<PropertyResponseDto> {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },

  async create(data: CreatePropertyDto): Promise<PropertyResponseDto> {
    const response = await api.post('/properties', data);
    return response.data;
  },

  async update(id: string, data: UpdatePropertyDto): Promise<PropertyResponseDto> {
    const response = await api.put(`/properties/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/properties/${id}`);
  },
};
