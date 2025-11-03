import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { PropertysController } from './properties.controller';
import { PropertysService } from './properties.service';
import { PropertysRepository } from './properties.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property]),
    DatabaseModule,
  ],
  controllers: [PropertysController],
  providers: [PropertysService, PropertysRepository],
  exports: [PropertysService],
})
export class PropertysModule {}
