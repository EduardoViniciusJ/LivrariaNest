/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class BookDTO {
  @IsString()
  @IsNotEmpty({ message: 'Title is required.' })
  @MinLength(1, { message: 'Title must have at least 1 character.' })
  @MaxLength(254, { message: 'Title must have at most 254 characters.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Author is required.' })
  @MaxLength(254, { message: 'Author must have at most 254 characters.' })
  author: string;

  @IsOptional()
  @IsString()
  @Matches(/\.(jpg|jpeg|png)$/i, {
    message: 'Image must be in JPG or PNG format.',
  })
  imageUrl?: string;

  @IsNumber()
  @IsPositive({ message: 'Price must be greater than zero.' })
  @Type(() => Number)
  price: number;

  @IsArray({ message: 'Categories must be in an array.' })
  @ArrayMinSize(1, {
    message: 'Book can have a minimum of 1 category.',
  })
  @ArrayMaxSize(3, {
    message: 'Book can have a maximum of 3 categories.',
  })
  @IsInt({
    each: true,
    message: 'Each category must be represented by ID.',
  })
  @Type(() => Number)
  categories: number[];
}
