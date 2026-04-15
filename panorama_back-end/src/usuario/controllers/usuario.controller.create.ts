import { Body, Controller, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import { UsuarioServiceCreate } from "../services/usuario.service.create";
import { ROTA } from "src/commons/constants/url.sistema";
import { Request } from 'express';
import { UsuarioResponse } from "../dto/usuario.response";
import { UsuarioRequest } from "../dto/usuario.request";
import { Result } from 'src/commons/mensagem/mensagem';
import { MensagemSistema } from "src/commons/mensagem/mensagem.sistema";


@Controller(ROTA.USUARIO.BASE)
export class UsuarioControllerCreate {

    constructor(private readonly usuarioServiceCreate: UsuarioServiceCreate){}
    @HttpCode(HttpStatus.CREATED)
    @Post(ROTA.USUARIO.CREATE)
    async create(
        @Req() res: Request, 
        @Body() usuarioRequest: UsuarioRequest
    ): Promise<Result<UsuarioResponse>>{
        const response = await this.usuarioServiceCreate.create(usuarioRequest)

        return MensagemSistema.showMensagem(HttpStatus.CREATED, 'Usuário cadastrado com sucesso!', response, res.path, null)
    }
} 