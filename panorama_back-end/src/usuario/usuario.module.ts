import { Module } from '@nestjs/common';
import { UsuarioControllerCreate } from './controllers/usuario.controller.create';
import { UsuarioServiceCreate } from './services/usuario.service.create';
import { UsuarioService } from './services/usuario.service';

@Module({
  controllers: [UsuarioControllerCreate],
  providers: [UsuarioServiceCreate, UsuarioService],
})
export class UsuarioModule {}
