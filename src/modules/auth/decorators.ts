import { SetMetadata } from '@nestjs/common';

export const PUBLIC_ROUTE = 'PUBLIC_ROUTE';
export const ADMIN_ONLY = 'ADMIN_ONLY';

export const Admin = () => SetMetadata(ADMIN_ONLY, true);
export const Public = () => SetMetadata(PUBLIC_ROUTE, true);
