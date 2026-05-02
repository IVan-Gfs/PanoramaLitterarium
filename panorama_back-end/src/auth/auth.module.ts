import { Module } from '@nestjs/common';
import { UsuarioControllerCreate } from '../usuario/controllers/usuario.controller.create';
import { UsuarioServiceCreate } from '../usuario/services/usuario.service.create';

@Module({
  controllers: [UsuarioControllerCreate],
  providers: [UsuarioServiceCreate],
})
export class AuthModule {}
