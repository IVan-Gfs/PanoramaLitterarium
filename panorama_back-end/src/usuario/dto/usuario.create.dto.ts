import {
  IsArray,
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
import { RoleUsuario } from "@prisma/client";




export class UsuarioCreateDTO  {

  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  @IsEmail({}, { message: 'Informe um e-mail válido.' })
  @Length(5, 100, { message: 'O e-mail deve ter entre 5 e 100 caracteres.' })
  email!: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @IsString({ message: 'A senha deve ser um texto.' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  senha!: string;

  @IsNotEmpty({message: 'Roles do usuário não pode ser vazio'})

  @IsEnum(RoleUsuario, { each: true }) 
  roles?: RoleUsuario[];

  @ValidateNested()
  @Type(()=>PerfilCreateDTO)
  perfil!: PerfilCreateDTO

}