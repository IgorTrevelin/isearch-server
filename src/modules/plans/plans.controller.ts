import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreatePlanDto, UpdatePlanDto } from 'src/dto';
import { AccessGuard } from '../auth/access.guard';
import { AdminGuard } from '../auth/admin.guard';
import { Admin, Management } from '../auth/decorators';
import { ManagementGuard } from '../auth/management.guard';
import { PlansService } from './plans.service';

@UseGuards(AdminGuard, ManagementGuard, AccessGuard)
@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get(':id')
  public async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.plansService.getById(id);
  }

  @Admin()
  @Post()
  public async create(@Body() createPlanDto: CreatePlanDto) {
    return await this.plansService.create(createPlanDto);
  }

  @Management()
  @Put(':id')
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePlanDto: UpdatePlanDto,
  ) {
    return await this.plansService.update(id, updatePlanDto);
  }

  @Admin()
  @Delete(':id')
  public async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.plansService.delete(id);
  }
}
