import { NotFoundException } from '@nestjs/common';

export class PlanNotExists extends NotFoundException {
  constructor() {
    super('Plan not exists');
  }
}
