import { IsAscii } from 'class-validator';

export class CreatePlanDto {
  @IsAscii()
  name: string;

  @IsAscii()
  description: string;
}
