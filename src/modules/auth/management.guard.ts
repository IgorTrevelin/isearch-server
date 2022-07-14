import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isUUID } from 'class-validator';
import { PlansController } from '../plans/plans.controller';
import { PlansService } from '../plans/plans.service';
import { MANAGEMENT_ACCESS } from './decorators';

@Injectable()
export class ManagementGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly plansService: PlansService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const management = this.reflector.get<boolean>(
      MANAGEMENT_ACCESS,
      context.getHandler(),
    );

    const req = context.switchToHttp().getRequest();

    if (!management || req.user.admin) return true;

    const controllerClass = context.getClass();

    if (controllerClass == PlansController) {
      const id = context.getArgByIndex(0);
      if (isUUID(id)) {
        const plan = await this.plansService.getById(id);
        const managers = plan.managers.map((manager) => manager.id);

        if (managers.indexOf(req.user.id) !== -1) return true;
      }
    }

    throw new UnauthorizedException();
  }
}
