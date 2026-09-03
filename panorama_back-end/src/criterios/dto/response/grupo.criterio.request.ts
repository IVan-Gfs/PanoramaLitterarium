// create-grupo-criterio.dto.ts

import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCriterioDTO } from '../request/criterio.request';

export class CreateGrupoCriterioDTO {
  @IsString()
  @IsNotEmpty()
  nome!: string;

   @IsOptional()
   @IsString()
  organizacaoId!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCriterioDTO)
  criterios!: CreateCriterioDTO[];
}
