import { Prisma, Usuario } from "@prisma/client";
import { UsuarioCreateDTO } from "../dto/usuario.create.dto";
import { UsuarioResponseDTO } from "../dto/usuario.response.dto";
import { plainToInstance } from "class-transformer";
import { PessoaMapper } from "src/pessoa/mapper/pessoa.mapper";

export class UsuarioMapper {

  static toPrismaModel(dto: UsuarioCreateDTO): Prisma.UsuarioCreateInput{
       const { pessoa, ...usuario } = dto;
        return {
            ...usuario,

        };
    }

  static toDTOResponse(usuario: Usuario): UsuarioResponseDTO {
        return plainToInstance(UsuarioResponseDTO, usuario, {excludeExtraneousValues: true, enableImplicitConversion: true})
    }

  static toDTOResponseList(usuarios: Usuario[]): UsuarioResponseDTO[]{
      return usuarios.map(user => UsuarioMapper.toDTOResponse(user))
     }
}