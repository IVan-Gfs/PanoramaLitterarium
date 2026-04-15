import { Module } from '@nestjs/common';
import { UsuarioServiceCreate } from './services/usuario.service.create';
import { UsuarioControllerCreate } from './controllers/usuario.controller.create';


const controllers = [UsuarioControllerCreate]
const services = [UsuarioServiceCreate]
@Module({
  controllers: [...controllers],
  providers: [...services],
})
export class UsuarioModule {}
