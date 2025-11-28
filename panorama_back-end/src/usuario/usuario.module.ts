import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuarioControllerCreate } from 'src/usuario/controllers/usuario.controller.create';
import { UsuarioServiceCreate } from 'src/usuario/services/usuario.service.create';
import { Usuario } from './entity/usuario.entity';
import { UsuarioControllerFindAll } from './controllers/usuario.controller.findall';
import { UsuarioServiceFindAll } from './services/usuario.service.findall';


const usuarioControllers = [
  UsuarioControllerCreate,
  UsuarioControllerFindAll
]

const usuarioServices = [
  UsuarioServiceCreate,
  UsuarioServiceFindAll
]
@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [...usuarioControllers],
  providers: [...usuarioServices],
})
export class UsuarioModule {}
