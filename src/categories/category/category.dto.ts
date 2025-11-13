/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CategoryDTO {
  @IsString()
  @IsNotEmpty({ message: 'Category name is required.' })
  @MaxLength(254, {
    message: 'Category name must have at most 254 characters.',
  })
  name: string;
}
