import { Controller, Get, HttpStatus, Req } from "@nestjs/common";
import { categoriaServiceFindAll } from "../services/categoria.service.findAll";
import { ROTA } from "src/commons/constants/url.sistema";
import { Result } from "src/commons/mensagem/mensagem";
import { CategoriaResponseDTO } from "../dto/categoria.response.dto";
import { criarMensagemOperacao } from "src/commons/constants/constants.entity";
import { MensagemSistema } from "src/commons/mensagem/mensagem.sistema";
import { Request } from "express";

@Controller(ROTA.CATEGORIA.BASE)
export class CategoriaControllerFindAll{
    constructor(private readonly categoriaServiceFindAll: categoriaServiceFindAll){}

    @Get(ROTA.CATEGORIA.LIST)
    async findAll(@Req() res: Request,): Promise<Result<CategoriaResponseDTO[]>>{

        const response = await this.categoriaServiceFindAll.findAll();

        const MENSAGENS = criarMensagemOperacao("Categoria");
        const mensagem = response.length > 0 ?  MENSAGENS.LISTAR.SUCESSO : MENSAGENS.LISTAR.ERRO;

        return MensagemSistema.showMensagem(HttpStatus.OK, mensagem, response, res.path, null)
    }
}