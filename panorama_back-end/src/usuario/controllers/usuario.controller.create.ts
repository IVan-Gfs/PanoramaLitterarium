import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsuarioServiceCreate } from '../services/usuario.service.create';
import { ROTA } from 'src/commons/constants/url.sistema';
import { CreateUsuarioResquest } from '../dto/request/create.usuario.request';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { MensagemSistema } from 'src/commons/mensagem/mensagem.sistema';
import { Result } from 'src/commons/mensagem/mensagem';

@Controller(ROTA.USUARIO.BASE)
export class UsuarioControllerCreate {
  constructor(private readonly usuarioServiceCreate: UsuarioServiceCreate) {}

  @HttpCode(HttpStatus.CREATED)
  @Post(ROTA.USUARIO.CREATE)

  async create(
    @Req() res: Request,
    @Body() createUsuarioRequest: CreateUsuarioResquest,
  ): Promise<Result<UsuarioResponse>>{
      const response = await this.usuarioServiceCreate.create(createUsuarioRequest);

      return MensagemSistema.showMensagem(HttpStatus.CREATED, 'Usuário cadastrado com sucesso!', response, res.path, null);
  }
}
