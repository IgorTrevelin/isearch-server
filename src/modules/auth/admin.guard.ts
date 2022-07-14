import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ADMIN_ONLY } from './decorators';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const admin = this.reflector.get<boolean>(ADMIN_ONLY, context.getHandler());

    const env = this.configService.get('NODE_ENV');

    if (!admin || env === 'development') return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (user.admin) return true;

    return false;
  }
}
