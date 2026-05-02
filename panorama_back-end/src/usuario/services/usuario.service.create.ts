import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { UsuarioCreateDTO } from "../dto/usuario.create.dto";
import { UsuarioResponseDTO } from "../dto/usuario.response.dto";
import { UsuarioMapper } from "../mapper/usuario.mapper";
import * as bcrypt from 'bcrypt';
import { PessoaMapper } from "src/pessoa/mapper/pessoa.mapper";

@Injectable()
export class UsuarioServiceCreate {

    constructor (private readonly prismaService: PrismaService){}

    async create(usuarioRequest: UsuarioCreateDTO): Promise<UsuarioResponseDTO>{

        console.log(JSON.stringify(usuarioRequest, null, 2));

        const usuarioExistente = await this.prismaService.usuario.findUnique({
            where: {email: usuarioRequest.email}
        })

        if(usuarioExistente){
            throw new ConflictException('O email informado já está cadastrado');
        }
        if (!usuarioRequest.pessoa) {
            throw new BadRequestException('Pessoa é obrigatória');
        }

        const pessoaExistente = await this.prismaService.pessoa.findUnique({
            where: { documento: usuarioRequest.pessoa.documento }
        });

        if (pessoaExistente) {
            throw new ConflictException('CPF/CNPJ já cadastrado');
        }

        const usuarioData = UsuarioMapper.toPrismaModel({
            ...usuarioRequest,
            senha: await bcrypt.hash(usuarioRequest.senha, 10),
          
        })

        const pessoaData = PessoaMapper.toDomain(usuarioRequest.pessoa)
        const { organizacao, jurado, participante, ...pessoaBase } = pessoaData;
        const tipos = [organizacao, jurado, participante].filter(Boolean);

        if (tipos.length > 1) {
            throw new BadRequestException('Pessoa não pode ter múltiplos tipos na criação do usuário');
        }else if(tipos.length < 1){
            throw new BadRequestException('Dados da organização, jurado ou participante são obrigatórios');
        }
        
        //ternário para validar qual tipo de usuário está sendo criado
        const tipoRelacao = 
            pessoaData.organizacao
            ? {organizacao: {create: {...organizacao}}}
            : pessoaData.jurado
            ? {jurado: {create: {...jurado}}}
            : pessoaData.participante
            ? {participante:  {create: {...participante}}}
            : {};


        const usuario = await this.prismaService.usuario.create({
            data:{
                ...usuarioData,
                pessoa: {
                    create: {
                        ...pessoaBase,
                        ...tipoRelacao,
                    }
                }
            }
        })
        return UsuarioMapper.toDTOResponse(usuario)
    }

}