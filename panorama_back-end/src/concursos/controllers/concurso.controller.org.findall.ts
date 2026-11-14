import { Controller, ForbiddenException, Get, HttpStatus, Query, Req, UseGuards } from "@nestjs/common";
import { ROTA } from "src/commons/constants/url.sistema";
import { MensagemSistema } from "src/commons/mensagem/mensagem.sistema";
import { Request } from "express";
import { Result } from "src/commons/mensagem/mensagem";
import { PAGINATION } from "src/commons/enums/paginacao.enum";
import { CONCURSO } from "../constants/concurso.constants";
import { Page } from "src/commons/pagination/page.sistema";
import { criarMensagemOperacao } from "src/commons/constants/constants.entity";
import { ConcursoParamsDTO } from "../dto/request/concurso.params.dto";
import JwtAccessGuard from "src/auth/config/guard/jwt.access.guard";
import { ConcursoListOrgDTO } from "../dto/response/concurso.list.org.dto";
import { ConcursoServiceOrgFindAll } from "../services/concurso.service.org.findall";
import requestWithUser from "src/auth/config/requestWithUser.interface";

@Controller(ROTA.CONCURSO.BASE)
export class ConcursoControllerOrgFindAll {

    constructor(private readonly concursoServiceOrgFindAll: ConcursoServiceOrgFindAll ){}

    @UseGuards(JwtAccessGuard)
    @Get(ROTA.CONCURSO.LIST+'/organization')
    async findAllByOrganizacao(
        @Req() res: requestWithUser,
        @Query() queryStrings: ConcursoParamsDTO
    ): Promise<Result<Page<ConcursoListOrgDTO>>>{
        const  {page, pageSize, props, order, searchTerm, orderBy, categorias} = queryStrings
        const organizacaoId = res.user.perfil?.organizacao?.id;
        if (!organizacaoId) {
            throw new ForbiddenException('Apenas usuários vinculados a uma Organização podem visualizar grupos de critérios');
        }

        const response = await this.concursoServiceOrgFindAll.findAllByOrganizacao(
            organizacaoId,
            page ? Number(page): PAGINATION.PAGE,
            pageSize ? Number(pageSize): PAGINATION.PAGESIZE,
            props ? props : CONCURSO.TABLE_FIELDS.TITULO,
            order ? order : PAGINATION.ASC,
            searchTerm,
            orderBy ? orderBy : CONCURSO.TABLE_FIELDS.TITULO,
            categorias,
        );
        const MENSAGENS = criarMensagemOperacao(CONCURSO.ENTITY)
        const mensagem = response.content.length > 0 ?  MENSAGENS.LISTAR.SUCESSO : MENSAGENS.LISTAR.ERRO;

        return MensagemSistema.showMensagem(HttpStatus.OK, mensagem, response, res.path, null)
    }
}