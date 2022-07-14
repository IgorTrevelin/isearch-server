import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isUUID } from 'class-validator';
import { MANAGEMENT } from './decorators';
import { PlansService } from './plans.service';

@Injectable()
export class ManagementGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly plansService: PlansService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const management = this.reflector.get<boolean>(
      MANAGEMENT,
      context.getHandler(),
    );

    const req = context.switchToHttp().getRequest();

    if (!management || (req.user && req.user.admin)) return true;

    const id = context.getArgByIndex(0);
    if (isUUID(id)) {
      const plan = await this.plansService.getById(id);
      const managers = plan.managers.map((manager) => manager.id);

      if (managers.indexOf(req.user.id) !== -1) return true;
    }

    throw new UnauthorizedException();
  }
}
