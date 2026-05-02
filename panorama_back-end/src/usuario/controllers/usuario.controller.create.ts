import { Body, Controller, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import { UsuarioServiceCreate } from "../services/usuario.service.create";
import { ROTA } from "src/commons/constants/url.sistema";
import { Request } from 'express';
import { UsuarioResponseDTO } from "../dto/usuario.response.dto";
import { UsuarioCreateDTO } from "../dto/usuario.create.dto";
import { Result } from 'src/commons/mensagem/mensagem';
import { MensagemSistema } from "src/commons/mensagem/mensagem.sistema";


@Controller(ROTA.USUARIO.BASE)
export class UsuarioControllerCreate {

    constructor(private readonly usuarioServiceCreate: UsuarioServiceCreate){}
    @HttpCode(HttpStatus.CREATED)
    @Post(ROTA.USUARIO.CREATE)
    async create(
        @Req() res: Request, 
        @Body() usuarioRequest: UsuarioCreateDTO
    ): Promise<Result<UsuarioResponseDTO>>{
        const response = await this.usuarioServiceCreate.create(usuarioRequest)

        return MensagemSistema.showMensagem(HttpStatus.CREATED, 'Usuário cadastrado com sucesso!', response, res.path, null)
    }
} 