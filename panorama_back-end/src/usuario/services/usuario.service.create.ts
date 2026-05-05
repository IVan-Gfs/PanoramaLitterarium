import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { UsuarioCreateDTO } from "../dto/usuario.create.dto";
import { UsuarioResponseDTO } from "../dto/usuario.response.dto";
import { UsuarioMapper } from "../mapper/usuario.mapper";
import * as bcrypt from 'bcrypt';
import { PerfilMapper } from "src/perfil/mapper/perfil.mapper";
import { connect } from "node:http2";
import { RoleUsuario } from "@prisma/client";

@Injectable()
export class UsuarioServiceCreate {

    constructor (private readonly prismaService: PrismaService){}

    async create(usuarioRequest: UsuarioCreateDTO): Promise<UsuarioResponseDTO>{


        const usuarioExistente = await this.prismaService.usuario.findUnique({
            where: {email: usuarioRequest.email}
        })

        if(usuarioExistente){
            throw new ConflictException('O email informado já está cadastrado');
        }
        if (!usuarioRequest.perfil) {
            throw new BadRequestException('Perfil é obrigatória');
        }
       
        
        if(usuarioRequest.perfil.cpf){
            let perfil = await this.prismaService.perfil.findUnique({
                where: { cpf: usuarioRequest.perfil.cpf }
            });
            if (perfil) throw new ConflictException('CPF/CNPJ já cadastrado');

        }
        
        const usuarioData = UsuarioMapper.toPrismaModel({
            ...usuarioRequest,
            senha: await bcrypt.hash(usuarioRequest.senha, 10),
          
        })

        const perfilData = PerfilMapper.toDomain(usuarioRequest.perfil)
        const { organizacao, jurado, participante, ...perfilBase } = perfilData;
        const tipos = [organizacao, jurado, participante].filter(Boolean);

        if (tipos.length > 1) {
            throw new BadRequestException('Pessoa não pode ter múltiplos tipos na criação do usuário');
        }else if(tipos.length < 1){
            throw new BadRequestException('Dados da organização, jurado ou participante são obrigatórios');
        }
        
        //ternário para validar qual tipo de usuário está sendo criado
        const tipoRelacao = 
            perfilData.organizacao
            ? {organizacao: {create: {...organizacao}}}
            : perfilData.jurado
            ? {jurado: {create: {...jurado}}}
            : perfilData.participante
            ? {participante:  {create: {...participante}}}
            : {};
        
        const usuario = await this.prismaService.usuario.create({
            data:{
                ...usuarioData,
                perfil: {
                    create: {
                        ...perfilBase,
                        ...tipoRelacao,
                    }
                },
                usuarioRole: {
                    create: usuarioRequest.roles?.map((role)=>({
                        role: {
                            connect:{
                                role
                            }
                        }
                    }))
                }
            }

            
        })

       
        return UsuarioMapper.toDTOResponse(usuario)
    }

}