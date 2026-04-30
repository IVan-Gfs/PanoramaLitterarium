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
import { ConcursoParamsDTO } from "../dto/request/concurso.params.dto";


@Controller(ROTA.CONCURSO.BASE)
export class ConcursoControllerFindAll {

    constructor(private readonly concursoServiceFindAll: ConcursoServiceFindAll){}

    @Get(ROTA.CONCURSO.LIST)
    async findAll( //Parâmetros de paginação e busca, recebidos como query params na requisição
        @Req() res: Request,
        @Query() queryStrings: ConcursoParamsDTO
    ): Promise<Result<Page<ConcursoListParticDTO>>>{

        const  {page, pageSize, props, order, searchTerm, orderBy, categorias, ...flags} = queryStrings

        const response = await this.concursoServiceFindAll.findAll( //
            page ? Number(page): PAGINATION.PAGE,
            pageSize ? Number(pageSize): PAGINATION.PAGESIZE,
            props ? props : CONCURSO.TABLE_FIELDS.TITULO,
            order ? order : PAGINATION.ASC,
            searchTerm,
            orderBy ? orderBy : CONCURSO.TABLE_FIELDS.TITULO,
            categorias,
            flags,
        );


        const MENSAGENS = criarMensagemOperacao(CONCURSO.ENTITY)
        const mensagem = response.content.length > 0 ?  MENSAGENS.LISTAR.SUCESSO : MENSAGENS.LISTAR.ERRO;

        return MensagemSistema.showMensagem(HttpStatus.OK, mensagem, response, res.path, null)
    }
}