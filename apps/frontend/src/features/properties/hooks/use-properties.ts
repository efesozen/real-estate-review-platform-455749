import type { CreatePropertyDto, UpdatePropertyDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { propertiesService } from '../services';

const PROPERTY_KEY = ['properties'];

export function useProperties() {
  return useQuery({
    queryKey: PROPERTY_KEY,
    queryFn: () => propertiesService.getAll(),
  });
}

export function useProperty(id: string) {
  return useQuery({
    queryKey: [...PROPERTY_KEY, id],
    queryFn: () => propertiesService.getById(id),
    enabled: !!id,
  });
}

export function useCreateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePropertyDto) => propertiesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPERTY_KEY });
    },
  });
}

export function useUpdateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePropertyDto }) =>
      propertiesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPERTY_KEY });
    },
  });
}

export function useDeleteProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => propertiesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPERTY_KEY });
    },
  });
}
