import { PartialType } from '@nestjs/mapped-types';
import { ConcursoCreateDto } from './concurso.create.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { StatusConcurso } from '@prisma/client';

export class ConcursoUpdateDto extends PartialType(ConcursoCreateDto) {

  @IsOptional()
  @IsEnum(StatusConcurso)
  status?: StatusConcurso;
}