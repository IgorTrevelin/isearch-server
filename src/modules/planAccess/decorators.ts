import { SetMetadata } from '@nestjs/common';

export const RESTRICTED_ACCESS = 'RESTRICTED_ACCESS';
export const Access = () => SetMetadata(RESTRICTED_ACCESS, true);
