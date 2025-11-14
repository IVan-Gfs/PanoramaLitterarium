import { Controller, Get, HttpCode, HttpStatus, Req } from "@nestjs/common";
import { Request } from 'express';  
import { ROTA } from "src/commons/constants/url.sistema";
import { UsuarioServiceFindAll } from "../services/usuario.service.findall";
import { Result } from "src/commons/mensagem/mensagem";
import { UsuarioResponse } from "../dto/response/usuario.response";
import { MensagemSistema } from "src/commons/mensagem/mensagem.sistema";

@Controller(ROTA.USUARIO.LIST)
export class UsuarioControllerFindAll {

   constructor(private readonly usuarioServiceFindALl: UsuarioServiceFindAll){}

   @HttpCode(HttpStatus.OK)
   @Get(ROTA.USUARIO.LIST)
   async findAll(@Req() req: Request):Promise<Result<UsuarioResponse>>{

      const response = await this.usuarioServiceFindALl.findAll();

      return MensagemSistema.showMensagem(
         HttpStatus.OK,
         'Lista de cidade gerada com sucesso!',
         response,
         req.path,
         null,
    );
   }
}