import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PlanAccess from 'src/entities/PlanAccess';
import { Repository } from 'typeorm';

@Injectable()
export class PlanAccessService {
  constructor(
    @InjectRepository(PlanAccess)
    private readonly planAccessRepo: Repository<PlanAccess>,
  ) {}

  public async getByUser(userId: string) {
    return await this.planAccessRepo.findBy({
      user: {
        id: userId,
      },
    });
  }

  public async getByPlan(planId: string) {
    return await this.planAccessRepo.findBy({
      plan: {
        id: planId,
      },
    });
  }
}
