import { Prisma, Usuario } from "@prisma/client";
import { UsuarioRequest } from "./usuario.request";
import { UsuarioResponse } from "./usuario.response";
import { plainToInstance } from "class-transformer";

export class ConverterUsuario {

  static toPrismaModel(dto: UsuarioRequest): Prisma.UsuarioCreateInput {
        return {
            ...dto,
        };
    }

  static toDTOResponse(usuario: Usuario): UsuarioResponse {
        return plainToInstance(UsuarioResponse, usuario, {excludeExtraneousValues: true})
    }

  static toDTOResponseList(usuarios: Usuario[]): UsuarioResponse[]{
      return usuarios.map(user => ConverterUsuario.toDTOResponse(user))
     }
}