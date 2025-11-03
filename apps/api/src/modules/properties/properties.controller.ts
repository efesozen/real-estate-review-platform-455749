import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import type { CreatePropertyDto, PropertyResponseDto, UpdatePropertyDto } from '@saas-template/core';
import type { User } from '@saas-template/database';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PropertysService } from './properties.service';

@Controller('properties')
@UseGuards(JwtAuthGuard)
export class PropertysController {
  constructor(private readonly propertysService: PropertysService) {}

  @Get()
  async findAll(@CurrentUser() user: User): Promise<PropertyResponseDto[]> {
    return this.propertysService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: User): Promise<PropertyResponseDto> {
    return this.propertysService.findOne(id, user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreatePropertyDto,
    @CurrentUser() user: User
  ): Promise<PropertyResponseDto> {
    return this.propertysService.create(user.id, dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePropertyDto,
    @CurrentUser() user: User
  ): Promise<PropertyResponseDto> {
    return this.propertysService.update(id, user.id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser() user: User): Promise<void> {
    return this.propertysService.remove(id, user.id);
  }
}
