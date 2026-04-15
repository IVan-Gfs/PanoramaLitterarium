import {
  IsOptional,
  IsString,
  IsInt,
  IsNumber,
  IsDateString,
  IsEmpty,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ConcursoCreateDto {

  @IsNotEmpty({message: 'Título do concurso deve ser informado'})
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  imgCapa?: string;

  @IsNotEmpty({message: 'O gênero iterário deve ser informado'})
  @IsString()
  generoLiterario?: string;

  @IsOptional()
  @IsInt()
  qtdVencedores?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  taxaInscricao?: number;

  @IsOptional()
  @IsString()
  tema?: string;

  @IsOptional()
  @IsString()
  municipio?: string;

  @IsOptional()
  @IsString()
  uf?: string;

  @IsNotEmpty({message: 'A premiação deve ser informada'})
  @IsString()
  premiacao?: string;

  @IsNotEmpty({message: 'O prazo de incrição deve ser informado'})
  @IsDateString()
  prazoInscricao?: string;

  @IsOptional()
  @IsInt()
  limiteObras?: number;

  @IsOptional()
  @IsString()
  restricao?: string;

  @IsOptional()
  @IsInt()
  etapaAtual?: number;

  @IsOptional()
  @IsString()
  linkEdital?: string;

  @IsOptional()
  @IsString()
  pdfEdital?: string;

  @IsOptional()
  @IsDateString()
  dataFinalizacao?: string;

  @IsInt()
  @IsNotEmpty({message: 'Id da ornização deve ser informado'})
  organizacaoId!: number;

  @IsInt()
  @IsNotEmpty({message: 'Grupo de critérios avaliativos deve ser informado'})
  grupoCriterioId!: number;
}