// create-criterio.dto.ts

import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCriterioDTO {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsString()
  @IsOptional()
  descricao?: string | null;

  @IsNumber()
  @IsOptional()
  pontuacaoMax?: number | null;
}
