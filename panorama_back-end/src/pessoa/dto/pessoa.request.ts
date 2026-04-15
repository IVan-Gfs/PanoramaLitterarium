import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MinLength } from "class-validator";


export class PessoaResquest {

  @IsNumber()
  id?: number;

  @IsNotEmpty({message: 'Nome de usuário é obrigatório'})
  @IsString({message: 'O nome de usuário deve ser um texto'})
  @Length(3, 50)  
  nome: string = '';

  @IsOptional()
  @IsString({ message: 'A foto deve ser um texto (URL).' })
  @Length(0, 255, { message: 'A foto deve ter até 255 caracteres.' })
  foto?: string;

  @IsOptional()
  @IsString({ message: 'tipo de pessoa (pf ou pj) é obrigatório.' })
  tipo?: string;

  @IsOptional()
  @IsString({ message: 'O CNPJ deve ser um texto.' })
  @Length(14, 20, { message: 'O CNPJ deve ter 14 caracteres.' })
  documento?: string;

  @IsOptional()
  @IsString({ message: 'O telefone deve ser um texto.' })
  @Length(10, 15, { message: 'O telefone deve ter entre 10 e 15 caracteres.' })
  tel?: string;

  constructor(data: Partial<PessoaResquest> = {}){
    Object.assign(this, data)
  }

}