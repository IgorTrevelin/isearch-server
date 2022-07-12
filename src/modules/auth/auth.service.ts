import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import User from 'src/entities/User';
import { checkPassword } from 'src/utils';
import { UsersService } from '../users/users.service';
import { UserNotActive, WrongPassword } from './error';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.getByEmail(email);

      if (!checkPassword(password, user.passwordHash)) {
        throw new WrongPassword();
      }

      if (!user.active) {
        throw new UserNotActive();
      }
      return user;
    } catch (err) {}

    return null;
  }

  async login(user: User) {
    const payload = {
      userId: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
