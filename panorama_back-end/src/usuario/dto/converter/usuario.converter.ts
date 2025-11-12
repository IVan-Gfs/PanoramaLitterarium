import { Usuario } from "src/usuario/entity/usuario.entity";
import { CreateUsuarioResquest } from "../request/create.usuario.request";
import { UsuarioResponse } from "../response/usuario.response";
import { plainToInstance } from "class-transformer";
import { UpdateUsuarioResquest } from "../request/update.usuario.request";


export class ConverterUsuario {

    static toUsuario(usuarioDto: CreateUsuarioResquest | UpdateUsuarioResquest): Usuario{
        const usuario = new Usuario();

        Object.assign(usuario, usuarioDto)

        return usuario;
    }

    static toUsuarioResponse(usuario: Usuario): UsuarioResponse {
        return plainToInstance(UsuarioResponse, usuario, {excludeExtraneousValues: true})
    }

    static toResponseList(usuarios: Usuario[]): UsuarioResponse[]{
        return usuarios.map(user => this.toUsuarioResponse(user))
    }
}