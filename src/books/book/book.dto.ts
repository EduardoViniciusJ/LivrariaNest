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
  @IsNotEmpty({ message: 'O título é obrigatório.' })
  @MinLength(1, { message: 'O título deve ter no mínimo 1 caractere.' })
  @MaxLength(254, { message: 'O título deve ter no máximo 254 caracteres.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'O autor é obrigatório.' })
  @MaxLength(254, { message: 'O autor deve ter no máximo 254 caracteres.' })
  author: string;

  @IsOptional()
  @IsString()
  @Matches(/\.(jpg|jpeg|png)$/i, {
    message: 'A imagem deve estar no formato JPG ou PNG.',
  })
  imageUrl?: string;

  @IsNumber()
  @IsPositive({ message: 'O preço deve ser maior que zero.' })
  @Type(() => Number)
  price: number;

  @IsArray({ message: 'As categorias devem estar em um array.' })
  @ArrayMinSize(1, {
    message: 'O livro deve ter no mínimo 1 categoria.',
  })
  @ArrayMaxSize(3, {
    message: 'O livro deve ter no máximo 3 categorias.',
  })
  @IsInt({
    each: true,
    message: 'Cada categoria deve ser representada por um ID.',
  })
  @Type(() => Number)
  categories: number[];
}
