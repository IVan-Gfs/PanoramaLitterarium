import { Controller, ForbiddenException, Get, HttpCode, HttpStatus, Param, Req,UseGuards } from "@nestjs/common";
import { GrupoCriterioServiceFindOne } from "../services/criterio.service.findone";
import { Result } from "src/commons/mensagem/mensagem";
import { GrupoCriterioResponseDTO } from "../dto/response/grupo.criterio.responseDTO";
import { MensagemSistema } from "src/commons/mensagem/mensagem.sistema";
import { ROTA } from "src/commons/constants/url.sistema";
import JwtAccessGuard from "src/auth/config/guard/jwt.access.guard";
import requestWithUser from "src/auth/config/requestWithUser.interface";

@Controller(ROTA.GRUPO_CRITERIO.BASE)
export class GrupoCriterioControllerFindOne {
    constructor(private readonly grupoCriterioServiceFindOne: GrupoCriterioServiceFindOne){}

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAccessGuard)
    @Get(':id')
    async findOne(@Param('id') id: string, @Req() res: requestWithUser): Promise<Result<GrupoCriterioResponseDTO>>{
      
        const organizacaoId = res.user.perfil?.organizacao?.id;
        if (!organizacaoId) {
                    throw new ForbiddenException('Apenas usuários vinculados a uma Organização podem visualizar grupos de critérios');
        }
        const response = await this.grupoCriterioServiceFindOne.findOne(+id, organizacaoId);

        return MensagemSistema.showMensagem(HttpStatus.OK, 'Grupo de critérios encontrado com sucesso', response, res.path, null); 
    }
}