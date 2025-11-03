import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateReviewDto, ReviewResponseDto, UpdateReviewDto } from '@saas-template/core';
import type { Review } from '@saas-template/database';
import { ReviewsRepository } from './reviews.repository';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly reviewsRepository: ReviewsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<ReviewResponseDto[]> {
    const reviews = await this.reviewsRepository.findAll(userId);
    return reviews.map((review: Review) => this.toResponseDto(review));
  }

  async findOne(id: string, userId: string): Promise<ReviewResponseDto> {
    const review = await this.reviewsRepository.findById(id, userId);
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return this.toResponseDto(review);
  }

  async create(userId: string, dto: CreateReviewDto): Promise<ReviewResponseDto> {
    return this.uow.execute(async () => {
      const review = await this.reviewsRepository.create(userId, dto);
      return this.toResponseDto(review);
    });
  }

  async update(id: string, userId: string, dto: UpdateReviewDto): Promise<ReviewResponseDto> {
    return this.uow.execute(async () => {
      const review = await this.reviewsRepository.update(id, userId, dto);
      if (!review) {
        throw new NotFoundException('Review not found');
      }
      return this.toResponseDto(review);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.reviewsRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Review not found');
      }
    });
  }

  private toResponseDto(review: Review): ReviewResponseDto {
    return {
      id: review.id,
      propertyId: review.propertyId,
      userId: review.userId,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };
  }
}
