import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlanDto, UpdatePlanDto } from 'src/dto';
import Plan from 'src/entities/Plan';
import { Repository } from 'typeorm';
import { PlanAccessService } from '../planAccess/plan-access.service';
import { PlanNotExists } from './error';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan) private readonly plansRepo: Repository<Plan>,
    private readonly planAccessService: PlanAccessService,
  ) {}

  public async getById(id: string) {
    const plan = await this.plansRepo.findOneBy({ id });

    if (!plan) {
      throw new PlanNotExists();
    }

    return plan;
  }

  public async create(data: CreatePlanDto) {
    const plan = this.plansRepo.create({
      name: data.name,
      description: data.name,
    });

    return await this.plansRepo.save(plan);
  }

  public async update(id: string, data: UpdatePlanDto) {
    const plan = await this.getById(id);

    plan.name = data.name;
    plan.description = data.description;

    return await this.plansRepo.save(plan);
  }

  public async delete(id: string) {
    const plan = await this.getById(id);

    await this.plansRepo.softDelete(plan);

    return plan;
  }

  public async getPlanUsers(planId: string) {
    const plan = await this.getById(planId);

    const access = await this.planAccessService.getByPlan(plan.id);
    return access.filter((a) => a.endDate >= new Date()).map((a) => a.user);
  }
}
