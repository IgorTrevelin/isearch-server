import { Controller, Get, Query } from '@nestjs/common';
import { ListUsersParams } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  public async findMany(@Query() query: ListUsersParams) {
    const [users, total] = await this.userService.getMany(query);

    return {
      data: users,
      total,
    };
  }
}
