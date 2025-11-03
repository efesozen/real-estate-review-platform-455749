import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreatePropertyDto, PropertyResponseDto, UpdatePropertyDto } from '@saas-template/core';
import type { Property } from '@saas-template/database';
import { PropertysRepository } from './properties.repository';

@Injectable()
export class PropertysService {
  constructor(
    private readonly propertysRepository: PropertysRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<PropertyResponseDto[]> {
    const properties = await this.propertysRepository.findAll(userId);
    return properties.map((property: Property) => this.toResponseDto(property));
  }

  async findOne(id: string, userId: string): Promise<PropertyResponseDto> {
    const property = await this.propertysRepository.findById(id, userId);
    if (!property) {
      throw new NotFoundException('Property not found');
    }
    return this.toResponseDto(property);
  }

  async create(userId: string, dto: CreatePropertyDto): Promise<PropertyResponseDto> {
    return this.uow.execute(async () => {
      const property = await this.propertysRepository.create(userId, dto);
      return this.toResponseDto(property);
    });
  }

  async update(id: string, userId: string, dto: UpdatePropertyDto): Promise<PropertyResponseDto> {
    return this.uow.execute(async () => {
      const property = await this.propertysRepository.update(id, userId, dto);
      if (!property) {
        throw new NotFoundException('Property not found');
      }
      return this.toResponseDto(property);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.propertysRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Property not found');
      }
    });
  }

  private toResponseDto(property: Property): PropertyResponseDto {
    return {
      id: property.id,
      title: property.title,
      description: property.description,
      location: property.location,
      price: property.price,
      userId: property.userId,
      createdAt: property.createdAt,
      updatedAt: property.updatedAt,
    };
  }
}
