import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto, ListUsersParams, UpdateMeDto } from 'src/dto';
import User from 'src/entities/User';
import { stripUsersPasswordHash } from 'src/utils';
import { Admin } from '../auth/admin.decorator';
import { AdminGuard } from '../auth/admin.guard';
import { UsersService } from './users.service';

@UseGuards(AdminGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('me/')
  public async getMe(@Req() req: Request) {
    const user: any = req.user;
    return stripUsersPasswordHash(user);
  }

  @Put('me/')
  public async updateMe(@Req() req: Request, @Body() updateMeDto: UpdateMeDto) {
    const user: User = req.user as User;

    return stripUsersPasswordHash(
      await this.userService.update(user.id, updateMeDto),
    );
  }

  @Admin()
  @Get()
  public async findMany(@Query() query: ListUsersParams) {
    const [users, total] = await this.userService.findMany(query);

    return {
      data: stripUsersPasswordHash(users),
      total,
    };
  }

  @Admin()
  @Get(':id')
  public async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return stripUsersPasswordHash(await this.userService.getById(id));
  }

  @Admin()
  @Post()
  public async create(@Body() CreateUserDto: CreateUserDto) {
    return stripUsersPasswordHash(await this.userService.create(CreateUserDto));
  }

  @Admin()
  @Put(':id')
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: CreateUserDto,
  ) {
    return stripUsersPasswordHash(
      await this.userService.update(id, updateUserDto),
    );
  }
}
