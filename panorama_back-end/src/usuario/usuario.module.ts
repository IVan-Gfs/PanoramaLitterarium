import { Module } from '@nestjs/common';
import { UsuarioControllerCreate } from './controllers/usuario.controller.create';
import { UsuarioServiceCreate } from './services/usuario.service.create';
import { UsuarioService } from './services/usuario.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UsuarioControllerCreate],
  providers: [UsuarioServiceCreate, UsuarioService],
})
export class UsuarioModule {}
