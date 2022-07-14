import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PlanAccess from 'src/entities/PlanAccess';
import { PlanAccessService } from './plan-access.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlanAccess])],
  providers: [PlanAccessService],
  exports: [PlanAccessService],
})
export class PlanAccessModule {}
