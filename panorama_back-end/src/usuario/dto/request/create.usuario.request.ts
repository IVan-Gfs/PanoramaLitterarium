import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MinLength } from "class-validator";


export class CreateUsuarioResquest {

  @IsNumber()
  idUsuario?: number;

  @IsNotEmpty({message: 'Nome de usuário é obrigatório'})
  @IsString({message: 'O nome de usuário deve ser um texto'})
  @Length(3, 50)
  nomeUsuario: string = '';

  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  @IsEmail({}, { message: 'Informe um e-mail válido.' })
  @Length(5, 100, { message: 'O e-mail deve ter até 100 caracteres.' })
  emailUsuario: string = ' ';

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @IsString({ message: 'A senha deve ser um texto.' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  senhaUsurio: string = '';

  @IsOptional()
  @IsString({ message: 'A foto deve ser um texto (URL).' })
  @Length(0, 255, { message: 'A foto deve ter até 255 caracteres.' })
  fotoUsuario?: string;

  @IsNotEmpty({ message: 'O tipo de usuário é obrigatório.' })
  @IsNumber({}, { message: 'O tipo de usuário deve ser um número.' })
  tipoUsuario: number = 0;

  @IsOptional()
  @IsString({ message: 'O CPF deve ser um texto.' })
  @Length(11, 14, { message: 'O CPF deve ter entre 11 e 14 caracteres.' })
  cpfUsuario?: string;

  @IsOptional()
  @IsString({ message: 'O CNPJ deve ser um texto.' })
  @Length(14, 14, { message: 'O CNPJ deve ter 14 caracteres.' })
  cnpjUsuario?: string;

  @IsOptional()
  @IsString({ message: 'O telefone deve ser um texto.' })
  @Length(10, 15, { message: 'O telefone deve ter entre 10 e 15 caracteres.' })
  telUsuario?: string;

  constructor(data: Partial<CreateUsuarioResquest> = {}){
    Object.assign(this, data)
  }

}