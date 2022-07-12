import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  Length,
} from 'class-validator';
import { Gender } from 'src/types';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @Length(8, 20)
  password: string;

  @IsOptional()
  @Length(0, 120)
  fullName?: string;

  @IsOptional()
  @Length(0, 255)
  document?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  birthday?: Date;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsBoolean()
  admin?: boolean;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
