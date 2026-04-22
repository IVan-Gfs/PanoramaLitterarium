import { Controller, Get, HttpStatus, Query, Req } from "@nestjs/common";
import { ConcursoServiceFindAll } from "../services/concurso.service.findall";
import { ROTA } from "src/commons/constants/url.sistema";

import { MensagemSistema } from "src/commons/mensagem/mensagem.sistema";
import { Request } from "express";
import { Result } from "src/commons/mensagem/mensagem";
import { ConcursoListParticDTO } from "../dto/response/concurso.list.partic.dto";
import { PAGINATION } from "src/commons/enums/paginacao.enum";
import { CONCURSO } from "../constants/concurso.constants";
import { Page } from "src/commons/pagination/page.sistema";
import { criarMensagemOperacao } from "src/commons/constants/constants.entity";


@Controller(ROTA.CONCURSO.BASE)
export class ConcursoControllerFindAll {

    constructor(private readonly concursoServiceFindAll: ConcursoServiceFindAll){}

    @Get(ROTA.CONCURSO.LIST)
    async findAll( //Parâmetros de paginação e busca, recebidos como query params na requisição
        @Req() res: Request,

        @Query('page') page?: string,
        @Query('pageSize') pageSize?: string,
        @Query('props') props?: string,
        @Query('order') order?: 'ASC' | 'DESC',
        @Query('searchTerm') search?: string,
    ): Promise<Result<Page<ConcursoListParticDTO>>>{

        const response = await this.concursoServiceFindAll.findAll( //
            page ? Number(page): PAGINATION.PAGE,
            pageSize ? Number(pageSize): PAGINATION.PAGESIZE,
            props ? props : CONCURSO.TABLE_FIELDS.DATA_PUBLICACAO,
            order ? order : PAGINATION.DESC,
            search,
        );

        const MENSAGENS = criarMensagemOperacao(CONCURSO.ENTITY)
        const mensagem = response.content.length > 0 ?  MENSAGENS.LISTAR.SUCESSO : MENSAGENS.LISTAR.ERRO;

        return MensagemSistema.showMensagem(HttpStatus.OK, mensagem, response, res.path, null)
    }
}