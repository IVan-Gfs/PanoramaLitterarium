import { TipoPessoa } from "@prisma/client";
import { Transform, Type } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MinLength, ValidateIf, ValidateNested } from "class-validator";
import { JuradoCreateDTO } from "src/jurado/dto/jurado.create.dto";
import { OrganizacaoCreateDto } from "src/organizacao/dto/organizacao.create.dto";
import { ParticipanteCreateDTO } from "src/participante/dto/participante.create.dto";


export class PerfilCreateDTO {
  @ValidateIf(o => o.tipo === TipoPessoa.PF )
  @IsNotEmpty({message: 'Nome de usuário é obrigatório'})
  @IsString({message: 'O nome de usuário deve ser um texto'})
  @Length(3, 50)  
  nome: string = '';

  @IsOptional()
  @IsString({ message: 'A foto deve ser um texto (URL).' })
  @Length(0, 255, { message: 'A foto deve ter até 255 caracteres.' })
  foto?: string;

  @IsOptional()
  @IsEnum(TipoPessoa, { message: 'tipo de pessoa (pf ou pj) é obrigatório.' })
  tipo?: TipoPessoa;

  
  @IsString({ message: 'O CPF deve ser um texto.' })
  @Length(11, 20, { message: 'O CPF deve ter 11 caracteres.' })
  @IsOptional()
  @Transform(({value}) => (value?.trim() === 1 ? undefined : value))
  cpf?: string;

  
  
  @IsString({ message: 'O telefone deve ser um texto.' })
  @Length(10, 15, { message: 'O telefone deve ter entre 10 e 15 caracteres.' })
  @IsOptional()
  @Transform(({value}) => (value?.trim() === 1 ? undefined : value))
  tel?: string; 
  
  @ValidateNested()
  @Type(()=> OrganizacaoCreateDto)
  organizacao?: OrganizacaoCreateDto

  @ValidateNested()
  @Type(()=> JuradoCreateDTO)
  jurado?: JuradoCreateDTO

  @ValidateNested()
  @Type(() => ParticipanteCreateDTO)
  participante?: ParticipanteCreateDTO
}