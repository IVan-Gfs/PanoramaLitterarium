import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entity/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioResquest } from '../dto/request/create.usuario.request';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { ConverterUsuario } from '../dto/converter/usuario.converter';

@Injectable()
export class UsuarioServiceCreate {
  

  constructor (
    @InjectRepository(Usuario) 
    private usuarioRepository: Repository<Usuario>
    ){}

  async create(createUsuarioRequest: CreateUsuarioResquest): Promise<UsuarioResponse>{
    let usuario = ConverterUsuario.toUsuario(createUsuarioRequest)

    const usuarioCadastrado = await this.usuarioRepository.createQueryBuilder('con_usuario').where('con_usuario.emailUsuario =: email', {email: usuario.emailUsuario}).getOne()

    if(usuarioCadastrado){
      throw new HttpException('O email informado já está cadastardo', HttpStatus.BAD_REQUEST)
    }

    usuario = await this.usuarioRepository.save(usuario)

    return ConverterUsuario.toUsuarioResponse(usuario)
  }
}
