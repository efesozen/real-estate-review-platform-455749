import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Review } from '@saas-template/database';
import type { CreateReviewDto, UpdateReviewDto } from '@saas-template/core';

@Injectable()
export class ReviewsRepository extends Repository<Review> {
  constructor(private dataSource: DataSource) {
    super(Review, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Review[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Review | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateReviewDto): Promise<Review> {
    const review = this.create({
      ...dto,
      userId,
    });
    return this.save(review);
  }

  async update(id: string, userId: string, dto: UpdateReviewDto): Promise<Review | null> {
    const review = await this.findById(id, userId);
    if (!review) {
      return null;
    }

    Object.assign(review, dto);
    return this.save(review);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const review = await this.findById(id, userId);
    if (!review) {
      return false;
    }

    await this.softRemove(review);
    return true;
  }
}
