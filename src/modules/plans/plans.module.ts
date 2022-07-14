import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Plan from 'src/entities/Plan';
import PlanAccess from 'src/entities/PlanAccess';
import { UsersModule } from '../users/users.module';
import { PlanAccessService } from './plan-access.service';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';

@Module({
  imports: [TypeOrmModule.forFeature([Plan, PlanAccess]), UsersModule],
  providers: [PlansService, PlanAccessService],
  exports: [PlansService, PlanAccessService],
  controllers: [PlansController],
})
export class PlansModule {}
