import { Module } from '@nestjs/common';
import { UsuarioControllerCreate } from './controllers/usuario.controller.create';
import { UsuarioServiceCreate } from './services/usuario.service.create';

@Module({
  controllers: [UsuarioControllerCreate],
  providers: [UsuarioServiceCreate],
})
export class UsuarioModule {}
