import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MinLength,
  ValidateNested
} from "class-validator";
import { PerfilCreateDTO } from "src/perfil/dto/perfil.create.dto";
import { Type } from "class-transformer";




export class UsuarioCreateDTO  {

  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  @IsEmail({}, { message: 'Informe um e-mail válido.' })
  @Length(5, 100, { message: 'O e-mail deve ter entre 5 e 100 caracteres.' })
  email!: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @IsString({ message: 'A senha deve ser um texto.' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  senha!: string;

  @ValidateNested()
  @Type(()=>PerfilCreateDTO)
  perfil!: PerfilCreateDTO

}