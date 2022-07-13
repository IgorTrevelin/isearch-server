import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Plan from 'src/entities/Plan';
import { Repository } from 'typeorm';
import { PlanNotExists } from './error';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan) private readonly plansRepo: Repository<Plan>,
  ) {}

  public async getById(id: string) {
    const plan = await this.plansRepo.findOneBy({ id });

    if (!plan) {
      throw new PlanNotExists();
    }

    return plan;
  }
}
