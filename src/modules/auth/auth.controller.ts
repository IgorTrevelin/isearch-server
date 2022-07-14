import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import User from 'src/entities/User';
import { AuthService } from './auth.service';
import { Public } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.login(user);
  }
}
