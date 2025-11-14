/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CategoryDTO {
  @IsString()
  @IsNotEmpty({ message: 'Category name is required.' })
  @MinLength(1, { message: 'Category must have at least 1 character.' })
  @MaxLength(254, {
    message: 'Category name must have at most 254 characters.',
  })
  @Matches(/^(?!\s+$).+$/, {
    message: 'Category name cannot be only whitespace.',
  })
  name: string;
}
