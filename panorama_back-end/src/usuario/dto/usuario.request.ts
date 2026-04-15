import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MinLength
} from "class-validator";
import { TipoUsuario } from '@prisma/client';




export class UsuarioRequest  {

  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  @IsEmail({}, { message: 'Informe um e-mail válido.' })
  @Length(5, 100, { message: 'O e-mail deve ter entre 5 e 100 caracteres.' })
  email!: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @IsString({ message: 'A senha deve ser um texto.' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  senha!: string;

  @IsNotEmpty({ message: 'Tipo de usuário é obrigatório.' })
  @IsEnum(TipoUsuario, { message: 'Tipo de usuário inválido.' })
  tipo!: TipoUsuario;

}