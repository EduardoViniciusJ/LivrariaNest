/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CategoryDTO {
  @IsString()
  @IsNotEmpty({ message: 'Category name is required.' })
  @MinLength(1, { message: 'Category must have at least 1 character.' })
  @MaxLength(254, {
    message: 'Category name must have at most 254 characters.',
  })
  name: string;
}
