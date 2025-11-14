import { Repository } from "typeorm";
import { Usuario } from "../entity/usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioResponse } from "../dto/response/usuario.response";
import { ConverterUsuario } from "../dto/converter/usuario.converter";

export class UsuarioServiceFindAll {

    constructor( @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>){}

    async findAll(): Promise<UsuarioResponse[]>{

        const usuarios = await this.usuarioRepository.createQueryBuilder('usuario').getMany();

        return ConverterUsuario.toResponseList(usuarios);
    }

}   