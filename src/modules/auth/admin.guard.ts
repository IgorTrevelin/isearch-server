import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ADMIN_ONLY } from './decorators';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const admin = this.reflector.get<boolean>(ADMIN_ONLY, context.getHandler());

    if (admin) {
      const req = context.switchToHttp().getRequest();
      const user = req.user;
      if (user.admin) return true;

      return false;
    }

    return true;
  }
}
