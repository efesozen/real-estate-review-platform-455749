import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateReviewDto {
  @IsUUID()
  propertyId!: string;

  @IsUUID()
  userId!: string;

  @IsNumber()
  rating!: number;

  @IsOptional()
  @IsString()
  comment?: string;
}

export class UpdateReviewDto {
  @IsOptional()
  @IsUUID()
  propertyId?: string | undefined;

  @IsOptional()
  @IsUUID()
  userId?: string | undefined;

  @IsOptional()
  @IsNumber()
  rating?: number | undefined;

  @IsOptional()
  @IsOptional()
  @IsString()
  comment?: string | undefined;
}

export class ReviewResponseDto {
  id!: string;
  propertyId!: string;
  userId!: string;
  rating!: number;
  comment?: string;
  createdAt!: Date;
  updatedAt!: Date;
}
