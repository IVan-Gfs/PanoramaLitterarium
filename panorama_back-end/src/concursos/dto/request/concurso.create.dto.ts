import { StatusConcurso } from '@prisma/client';
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
  IsEnum,
  Validate,
  ValidateIf,
} from 'class-validator';

export class ConcursoCreateDto {

  @IsNotEmpty()
  @IsEnum(StatusConcurso, {
    message: 'Status deve ser RASCUNHO ou PUBLICADO',
  })
  status!: StatusConcurso;

  @IsNotEmpty({ message: 'Título do concurso deve ser informado' })
  @IsString()
  titulo!: string;

  @IsOptional()
  @IsString()
  imgCapa?: string;

  @ValidateIf((obj) => obj.status === StatusConcurso.PUBLICADO)
  @IsNotEmpty({ message: 'A descrição do concurso deve ser informada' })
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsInt()
  qtdVencedores?: number;

  @IsOptional()
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

  @ValidateIf((obj) => obj.status === StatusConcurso.PUBLICADO)
  @IsNotEmpty({ message: 'A premiação deve ser informada' })
  @IsString()
  premiacao?: string;

  @ValidateIf((obj) => obj.status === StatusConcurso.PUBLICADO)
  @IsNotEmpty({ message: 'O prazo de inscrição deve ser informado' })
  @IsDateString()
  prazoInscricao!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  limiteObras?: number;

  @IsOptional()
  @IsString()
  restricao?: string;

  @IsOptional()
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
  @IsNumber()
  valorTotalPremios?: number;

  @IsOptional()
  @IsNumber()
  custoSelecionados?: number;

  @IsOptional()
  @IsInt()
  grupoCriterio?: number;

  
  @ValidateIf((obj) => obj.status === StatusConcurso.PUBLICADO)
  @IsArray({ message: 'A categoria deve ser um array de números' })
  @ArrayNotEmpty({
    message: 'É obrigatório informar ao menos uma categoria para o concurso',
  })
  @IsInt({ each: true })
  categorias?: number[];
}