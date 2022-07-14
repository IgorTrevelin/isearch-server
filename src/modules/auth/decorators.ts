import { SetMetadata } from '@nestjs/common';

export const PUBLIC_ROUTE = 'PUBLIC_ROUTE';
export const ADMIN_ONLY = 'ADMIN_ONLY';
export const MANAGEMENT_ACCESS = 'MANAGEMENT_ACCESS';
export const RESTRICTED_ACCESS = 'RESTRICTED_ACCESS';

export const Admin = () => SetMetadata(ADMIN_ONLY, true);
export const Public = () => SetMetadata(PUBLIC_ROUTE, true);
export const Management = () => SetMetadata(MANAGEMENT_ACCESS, true);
export const Access = () => SetMetadata(RESTRICTED_ACCESS, true);
