import type { CreateReviewDto, UpdateReviewDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { reviewsService } from '../services';

const REVIEW_KEY = ['reviews'];

export function useReviews() {
  return useQuery({
    queryKey: REVIEW_KEY,
    queryFn: () => reviewsService.getAll(),
  });
}

export function useReview(id: string) {
  return useQuery({
    queryKey: [...REVIEW_KEY, id],
    queryFn: () => reviewsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReviewDto) => reviewsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REVIEW_KEY });
    },
  });
}

export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateReviewDto }) =>
      reviewsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REVIEW_KEY });
    },
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => reviewsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REVIEW_KEY });
    },
  });
}
