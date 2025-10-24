import { Module } from '@nestjs/common';

import { UsuarioControllerCreate } from 'src/usuario/controllers/usuario.controller.create';
import { UsuarioServiceCreate } from 'src/usuario/services/usuario.service.create';


const usuarioControllers = [
  UsuarioControllerCreate
]

const usuarioServices = [
  UsuarioServiceCreate
]
@Module({
  imports: [],
  controllers: [...usuarioControllers],
  providers: [...usuarioServices],
})
export class UsuarioModule {}
