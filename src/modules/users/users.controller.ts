import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto, ListUsersParams } from 'src/dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  public async findMany(@Query() query: ListUsersParams) {
    const [users, total] = await this.userService.findMany(query);

    return {
      data: users,
      total,
    };
  }

  @Get(':id')
  public async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  public async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
    return 'success';
  }
}
