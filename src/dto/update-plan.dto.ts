import { IsAlphanumeric, IsAscii, IsOptional } from 'class-validator';

export class UpdatePlanDto {
  @IsOptional()
  @IsAlphanumeric()
  name?: string;

  @IsOptional()
  @IsAscii()
  description?: string;
}
