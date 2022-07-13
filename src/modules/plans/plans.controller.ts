import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ManagementGuard } from '../auth/management.guard';
import { PlansService } from './plans.service';

@UseGuards(ManagementGuard)
@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get(':id')
  public async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.plansService.getById(id);
  }
}
