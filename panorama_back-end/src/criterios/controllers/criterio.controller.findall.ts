import { Controller, ForbiddenException, Get, HttpCode, HttpStatus, Req, UseGuards } from "@nestjs/common";
import { CriterioServiceFindAll } from "../services/criterio.service.findall";
import { ROTA } from "src/commons/constants/url.sistema";
import { GrupoCriterioResponseDTO } from "../dto/response/grupo.criterio.responseDTO";
import { Result } from "src/commons/mensagem/mensagem";
import { criarMensagemOperacao } from "src/commons/constants/constants.entity";
import { MensagemSistema } from "src/commons/mensagem/mensagem.sistema";
import JwtAccessGuard from "src/auth/config/guard/jwt.access.guard";
import requestWithUser from "src/auth/config/requestWithUser.interface";


@Controller()
export class CriterioControllerFindAll {
    constructor(private readonly criterioService: CriterioServiceFindAll){}

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAccessGuard)
    @Get(ROTA.GRUPO_CRITERIO.BASE)
    async findAll(@Req() res: requestWithUser, ): Promise<Result<GrupoCriterioResponseDTO[]>>{

        const organizacaoId = res.user.perfil?.organizacao?.id;
        if (!organizacaoId) {
            throw new ForbiddenException('Apenas usuários vinculados a uma Organização podem visualizar grupos de critérios');
        }
        const response = await this.criterioService.findAll(organizacaoId);
        const MENSAGENS = criarMensagemOperacao("Grupo de Critério");
        const mensagem = response.length > 0 ?  MENSAGENS.LISTAR.SUCESSO : MENSAGENS.LISTAR.ERRO;
        return MensagemSistema.showMensagem(HttpStatus.OK, mensagem, response, res.path, null)
    }
}