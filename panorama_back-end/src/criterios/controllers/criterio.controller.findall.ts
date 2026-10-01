import { Controller, ForbiddenException, Get, HttpCode, HttpStatus, Query, Req, UseGuards } from "@nestjs/common";
import { CriterioServiceFindAll } from "../services/criterio.service.findall";
import { ROTA } from "src/commons/constants/url.sistema";
import { GrupoCriterioResponseDTO } from "../dto/response/grupo.criterio.responseDTO";
import { Result } from "src/commons/mensagem/mensagem";
import { criarMensagemOperacao } from "src/commons/constants/constants.entity";
import { MensagemSistema } from "src/commons/mensagem/mensagem.sistema";
import JwtAccessGuard from "src/auth/config/guard/jwt.access.guard";
import requestWithUser from "src/auth/config/requestWithUser.interface";
import { ConcursoParamsDTO } from "src/concursos/dto/request/concurso.params.dto";
import { CRITERIO } from "../constants/criterio.constants";
import { PAGINATION } from "src/commons/enums/paginacao.enum";
import { Page } from "src/commons/pagination/page.sistema";

@Controller()
export class CriterioControllerFindAll {
    constructor(private readonly criterioService: CriterioServiceFindAll){}

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAccessGuard)
    @Get(ROTA.GRUPO_CRITERIO.BASE)
    async findAll(@Req() res: requestWithUser, @Query() queryStrings: ConcursoParamsDTO): Promise<Result<Page<GrupoCriterioResponseDTO>>>{

        const  {page, pageSize, props, order, searchTerm, orderBy} = queryStrings
        
        
        const organizacaoId = res.user.perfil?.organizacao?.id;
        if (!organizacaoId) {
            throw new ForbiddenException('Apenas usuários vinculados a uma Organização podem visualizar grupos de critérios');
        }
        const response = await this.criterioService.findAll(
            organizacaoId,
           page ? Number(page): PAGINATION.PAGE,
                       pageSize ? Number(pageSize): PAGINATION.PAGESIZE,
                       props ? props : CRITERIO.TABLE_FIELDS.TITULO,
                       order ? order : PAGINATION.ASC,
                       searchTerm,
                       orderBy ? orderBy : CRITERIO.TABLE_FIELDS.TITULO,
        );


        const MENSAGENS = criarMensagemOperacao("Grupo de Critério");
        const mensagem = response.content.length > 0 ?  MENSAGENS.LISTAR.SUCESSO : MENSAGENS.LISTAR.ERRO;
        return MensagemSistema.showMensagem(HttpStatus.OK, mensagem, response, res.path, null)
    }
}