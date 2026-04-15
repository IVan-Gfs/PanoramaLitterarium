import { PartialType } from '@nestjs/mapped-types';
import { ConcursoCreateDto } from './concurso.create.dto';

export class UpdateConcursoDto extends PartialType(ConcursoCreateDto) {}