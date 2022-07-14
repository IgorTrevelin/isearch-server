import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Plan from 'src/entities/Plan';
import { AuthModule } from '../auth/auth.module';
import { PlanAccessModule } from '../planAccess/plan-access.module';
import { ManagementGuard } from './management.guard';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';

@Module({
  imports: [TypeOrmModule.forFeature([Plan]), AuthModule, PlanAccessModule],
  providers: [PlansService, ManagementGuard],
  exports: [PlansService],
  controllers: [PlansController],
})
export class PlansModule {}
