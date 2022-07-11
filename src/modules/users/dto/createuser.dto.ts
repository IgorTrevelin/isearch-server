import { Gender } from 'src/types';

export class CreateUserDto {
  email: string;
  password: string;
  fullName: string;
  document: string;
  birthday: Date;
  gender: Gender;
}
