import { SetMetadata } from '@nestjs/common';

export const MANAGEMENT = 'PLAN_MANAGEMENT';

export const Management = () => SetMetadata(MANAGEMENT, true);
