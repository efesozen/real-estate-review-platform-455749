import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @MinLength(1)
  title!: string;

  @IsString()
  @MinLength(1)
  description!: string;

  @IsString()
  @MinLength(1)
  location!: string;

  @IsNumber()
  price!: number;

  @IsUUID()
  userId!: string;
}

export class UpdatePropertyDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  description?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  location?: string | undefined;

  @IsOptional()
  @IsNumber()
  price?: number | undefined;

  @IsOptional()
  @IsUUID()
  userId?: string | undefined;
}

export class PropertyResponseDto {
  id!: string;
  title!: string;
  description!: string;
  location!: string;
  price!: number;
  userId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
