import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entities/User';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { ListUsersParams } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  public async getMany(params: ListUsersParams) {
    const options: FindManyOptions<User> = {
      skip: 0,
      take: 25,
    };

    const where: FindOptionsWhere<User> = {};

    if (params.perPage) {
      options.take = params.perPage;
    }

    if (params.page) {
      params.page = Math.max(0, params.page);
      options.skip = (params.page - 1) * params.perPage;
    }

    if (params.email) {
      where.email = params.email;
    }

    options.where = where;

    return await this.userRepo.findAndCount(options);
  }
}
