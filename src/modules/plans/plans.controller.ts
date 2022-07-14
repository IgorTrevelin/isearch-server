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
import { AccessGuard } from '../planAccess/access.guard';
import { AdminGuard } from '../auth/admin.guard';
import { Management } from './decorators';
import { PlansService } from './plans.service';
import { ManagementGuard } from './management.guard';
import { Admin } from '../auth/decorators';

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
