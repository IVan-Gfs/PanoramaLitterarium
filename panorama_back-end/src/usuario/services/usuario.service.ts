import { BadRequestException, Get, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsuarioRequest } from '../dto/usuario.request';
import { UsuarioResponse } from '../dto/usuario.response';
import { ConverterUsuario } from '../dto/usuario.converter';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsuarioService {

  constructor( private readonly prismaService: PrismaService) {}

  async create(usuarioRequest: UsuarioRequest) {
    return "Criar um usuário :)"
  }

  async findAll() {
    return "All users (:"
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, usuarioRequest: UsuarioRequest) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
