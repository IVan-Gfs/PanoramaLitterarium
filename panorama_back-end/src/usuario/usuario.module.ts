import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuarioControllerCreate } from 'src/usuario/controllers/usuario.controller.create';
import { UsuarioServiceCreate } from 'src/usuario/services/usuario.service.create';
import { Usuario } from './entity/usuario.entity';


const usuarioControllers = [
  UsuarioControllerCreate
]

const usuarioServices = [
  UsuarioServiceCreate
]
@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [...usuarioControllers],
  providers: [...usuarioServices],
})
export class UsuarioModule {}
