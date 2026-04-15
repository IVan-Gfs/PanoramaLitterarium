import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { UsuarioRequest } from "../dto/usuario.request";
import { UsuarioResponse } from "../dto/usuario.response";
import { ConverterUsuario } from "../dto/usuario.converter";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioServiceCreate {

    constructor (private readonly prismaService: PrismaService){}

    async create(usuarioRequest: UsuarioRequest): Promise<UsuarioResponse>{

        const usuarioExistente = await this.prismaService.usuario.findUnique({
            where: {email: usuarioRequest.email}
        })

        if(usuarioExistente){
            throw new ConflictException('O email informado já está cadastrado');
        }

        const data = ConverterUsuario.toPrismaModel({
            ...usuarioRequest,
            senha: await bcrypt.hash(usuarioRequest.senha, 10),
        })

        const usuario = await this.prismaService.usuario.create({
            data
        })

        return ConverterUsuario.toDTOResponse(usuario)
    }

}