import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';

export class WrongPassword extends UnauthorizedException {
  constructor() {
    super(
      new HttpException('Wrong password', HttpStatus.UNAUTHORIZED),
      'Wrong password',
    );
  }
}

export class UserNotActive extends UnauthorizedException {
  constructor() {
    super(
      new HttpException('User not active', HttpStatus.UNAUTHORIZED),
      'User not active',
    );
  }
}
