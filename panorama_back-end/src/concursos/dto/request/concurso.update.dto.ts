import { PartialType } from '@nestjs/mapped-types';
import { ConcursoCreateDto } from './concurso.create.dto';
import { IsEnum, IsNotEmpty, IsOptional, IsString, Length, ValidateIf } from 'class-validator';
import { StatusConcurso } from '@prisma/client';

export class ConcursoUpdateDto extends PartialType(ConcursoCreateDto) {

  @IsOptional()
  @IsEnum(StatusConcurso)
  status?: StatusConcurso;


  @ValidateIf((obj) => obj.status === StatusConcurso.CANCELADO)
  @IsNotEmpty({message: 'O motivo do cancelamento é obrigatório'})
  @IsString({ message: 'O motivo do cancelamento deve ser um texto' })
  @Length(10, 500, { message: 'O motivo deve ter entre 10 e 500 caracteres' })
  motivoCancelamento?: string;
}