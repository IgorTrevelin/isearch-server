import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PlanAccess from 'src/entities/PlanAccess';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { PlansService } from './plans.service';

@Injectable()
export class PlanAccessService {
  constructor(
    @InjectRepository(PlanAccess)
    private readonly planAccessRepo: Repository<PlanAccess>,
    private readonly userService: UsersService,
    private readonly plansService: PlansService,
  ) {}

  public async getByUser(userId: string) {
    const user = await this.userService.getById(userId);

    return await this.planAccessRepo.findBy({
      user: {
        id: user.id,
      },
    });
  }

  public async getByPlan(planId: string) {
    const plan = await this.plansService.getById(planId);

    return await this.planAccessRepo.findBy({
      plan: {
        id: plan.id,
      },
    });
  }
}
