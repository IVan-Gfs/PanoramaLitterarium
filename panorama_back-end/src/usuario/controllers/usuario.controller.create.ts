import { Controller, Get } from '@nestjs/common';
import { UsuarioServiceCreate } from '../services/usuario.service.create';
import { ROTA } from 'src/commons/constants/url.sistema';

@Controller(ROTA.USUARIO.BASE)
export class UsuarioControllerCreate {
  constructor(private readonly UsuarioServiceCreate: UsuarioServiceCreate) {}

  @Get()
  getHello(): string {
    return this.UsuarioServiceCreate.getHello();
  }
}
