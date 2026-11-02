import {
  IsOptional,
  IsString,
  IsInt,
  IsNumber,
  IsDateString,
  IsNotEmpty,
  IsArray,
  Min,
  ArrayNotEmpty,
} from 'class-validator';

import { Type, Transform } from 'class-transformer';

export class ConcursoCreateDto {

  @IsNotEmpty({ message: 'Título do concurso deve ser informado' })
  @IsString()
  titulo!: string;

  @IsOptional()
  @IsString()
  imgCapa?: string;

  @IsNotEmpty({ message: 'A descrição do concurso deve ser informada' })
  @IsString()
  descricao!: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  qtdVencedores?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
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

  @IsNotEmpty({ message: 'A premiação deve ser informada' })
  @IsString()
  premiacao!: string;

  @IsNotEmpty({ message: 'O prazo de inscrição deve ser informado' })
  @IsDateString()
  prazoInscricao!: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limiteObras?: number;

  @IsOptional()
  @IsString()
  restricao?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  etapaAtual?: number;

  @IsOptional()
  @IsString()
  limitesTexto?: string;

  @IsOptional()
  @IsString()
  linkInscricao?: string;

  @IsOptional()
  @IsString()
  linkEdital?: string;

  @IsOptional()
  @IsString()
  pdfEdital?: string;

  @IsOptional()
  @IsDateString()
  dataFinalizacao?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  valorTotalPremios?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  custoSelecionados?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  organizacao!: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  grupoCriterio?: number;

  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map(Number);
    }

    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);

        return Array.isArray(parsed)
          ? parsed.map(Number)
          : parsed;
      } catch {
        return [];
      }
    }

    return value;
  })
  @IsArray({ message: 'A categoria deve ser um array de números' })
  @ArrayNotEmpty({
    message: 'É obrigatório informar ao menos uma categoria para o concurso',
  })
  @IsNumber({}, { each: true })
  categoria!: number[];
}
