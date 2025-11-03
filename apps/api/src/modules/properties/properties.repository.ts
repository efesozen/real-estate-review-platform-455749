import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Property } from '@saas-template/database';
import type { CreatePropertyDto, UpdatePropertyDto } from '@saas-template/core';

@Injectable()
export class PropertysRepository extends Repository<Property> {
  constructor(private dataSource: DataSource) {
    super(Property, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Property[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Property | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreatePropertyDto): Promise<Property> {
    const property = this.create({
      ...dto,
      userId,
    });
    return this.save(property);
  }

  async update(id: string, userId: string, dto: UpdatePropertyDto): Promise<Property | null> {
    const property = await this.findById(id, userId);
    if (!property) {
      return null;
    }

    Object.assign(property, dto);
    return this.save(property);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const property = await this.findById(id, userId);
    if (!property) {
      return false;
    }

    await this.softRemove(property);
    return true;
  }
}
