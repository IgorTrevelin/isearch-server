import { Length } from 'class-validator';

export class ListParams {
  page?: number;
  perPage?: number;

  @Length(0, 100)
  search?: string;
}
