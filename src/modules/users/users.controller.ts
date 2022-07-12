import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto, ListUsersParams } from 'src/dto';
import { stripUsersPasswordHash } from 'src/utils';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  public async findMany(@Query() query: ListUsersParams) {
    const [users, total] = await this.userService.findMany(query);

    return {
      data: stripUsersPasswordHash(users),
      total,
    };
  }

  @Get(':id')
  public async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return stripUsersPasswordHash(await this.userService.getById(id));
  }

  @Post()
  public async create(@Body() CreateUserDto: CreateUserDto) {
    return stripUsersPasswordHash(await this.userService.create(CreateUserDto));
  }

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
