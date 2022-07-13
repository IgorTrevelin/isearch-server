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

@Injectable()
export class ManagementGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly plansService: PlansService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const manageable = this.reflector.get<boolean>(
      'management',
      context.getHandler(),
    );

    if (!manageable) return true;

    const req = context.switchToHttp().getRequest();
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
