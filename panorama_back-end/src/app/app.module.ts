import { Module } from '@nestjs/common';

import { UsuarioControllerCreate } from 'src/usuario/controllers/usuario.controller.create';
import { UsuarioServiceCreate } from 'src/usuario/services/usuario.service.create';

@Module({
  imports: [],
  controllers: [UsuarioControllerCreate],
  providers: [UsuarioServiceCreate],
})
export class AppModule {}
