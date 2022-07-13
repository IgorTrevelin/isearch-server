import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entities/User';
import UserProfile from 'src/entities/UserProfile';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto, ListParams, UpdateUserDto } from 'src/dto';
import { hashPassword } from 'src/utils';
import { UserNotFound } from './error';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  public async findMany(params: ListParams) {
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

    options.where = where;

    return await this.userRepo.findAndCount(options);
  }

  public async create(userData: CreateUserDto): Promise<User> {
    const user = new User();
    user.profile = new UserProfile();

    user.email = userData.email;
    user.passwordHash = hashPassword(userData.password);

    if (userData.fullName !== undefined) {
      user.profile.fullName = userData.fullName;
    }

    if (userData.document !== undefined) {
      user.profile.document = userData.document;
    }

    if (userData.birthday !== undefined) {
      user.profile.birthday = userData.birthday;
    }

    if (userData.gender !== undefined) {
      user.profile.gender = userData.gender;
    }

    if (userData.active !== undefined) {
      user.active = userData.active;
    }

    if (userData.admin !== undefined) {
      user.admin = userData.admin;
    }

    return await this.userRepo.save(user);
  }

  public async getById(id: string) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) {
      throw new UserNotFound();
    }

    return user;
  }

  public async getByEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email });

    if (!user) {
      throw new UserNotFound();
    }

    return user;
  }

  public async update(id: string, userData: UpdateUserDto) {
    const user = await this.getById(id);

    if (userData.email !== undefined) {
      user.email = userData.email;
    }

    if (userData.password !== undefined) {
      user.passwordHash = hashPassword(userData.password);
    }

    if (userData.fullName !== undefined) {
      user.profile.fullName = userData.fullName;
    }

    if (userData.document !== undefined) {
      user.profile.document = userData.document;
    }

    if (userData.birthday !== undefined) {
      user.profile.birthday = userData.birthday;
    }

    if (userData.gender !== undefined) {
      user.profile.gender = userData.gender;
    }

    if (userData.active !== undefined) {
      user.active = userData.active;
    }

    if (userData.admin !== undefined) {
      user.admin = userData.admin;
    }

    return await this.userRepo.save(user);
  }
}
