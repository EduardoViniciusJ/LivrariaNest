import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CategoryDTO {
  @IsString()
  @IsNotEmpty({ message: 'O nome da categoria é obrigatório.' })
  @MinLength(1, { message: 'A categoria deve ter no mínimo 1 caractere.' })
  @MaxLength(254, {
    message: 'O nome da categoria deve ter no máximo 254 caracteres.',
  })
  @Matches(/^(?!\s+$).+$/, {
    message: 'O nome da categoria não pode conter apenas espaços em branco.',
  })
  name: string;
}
