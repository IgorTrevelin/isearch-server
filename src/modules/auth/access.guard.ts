import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isUUID } from 'class-validator';
import { PlanAccessService } from '../plans/plan-access.service';
import { PlansController } from '../plans/plans.controller';
import { RESTRICTED_ACCESS } from './decorators';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly planAccessSerice: PlanAccessService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAccess = this.reflector.get<boolean>(
      RESTRICTED_ACCESS,
      context.getHandler(),
    );

    const req = context.switchToHttp().getRequest();

    if (!isAccess || req.user.admin) return true;

    const controllerClass = context.getClass();

    if (controllerClass == PlansController) {
      const id = context.getArgByIndex(0);
      if (isUUID(id)) {
        const accesses = await this.planAccessSerice.getByPlan(id);
        const userIds = accesses.map((a) => a.user.id);

        if (userIds.indexOf(req.user.id) !== -1) return true;
      }
    }

    return false;
  }
}
