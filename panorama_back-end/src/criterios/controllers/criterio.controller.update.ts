import { Body, Controller, ForbiddenException, HttpCode, HttpStatus, Param, Put, Req, UseGuards } from "@nestjs/common";
import { CriterioServiceUpdate } from "../services/criterio.service.update";
import { ROTA } from "src/commons/constants/url.sistema";
import { GrupoCriterioResponseDTO } from "../dto/response/grupo.criterio.responseDTO";
import JwtAccessGuard from "src/auth/config/guard/jwt.access.guard";
import { CreateGrupoCriterioDTO } from "../dto/response/grupo.criterio.request";
import { Result } from "src/commons/mensagem/mensagem";
import { MensagemSistema } from "src/commons/mensagem/mensagem.sistema";
import requestWithUser from "src/auth/config/requestWithUser.interface";


@Controller(ROTA.GRUPO_CRITERIO.BASE)
export class CriterioControllerUpdate {
    constructor(private readonly criterioServiceUpdate: CriterioServiceUpdate){}

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAccessGuard)
    @Put(':id')
    async update(
        @Param('id') id: string, 
        @Body() data: CreateGrupoCriterioDTO,
        @Req() req: requestWithUser
    ): Promise<Result<GrupoCriterioResponseDTO>> {

        const organizacaoId = req.user.perfil?.organizacao?.id;
        if (!organizacaoId) {
            throw new ForbiddenException('Apenas usuários vinculados a uma Organização podem atualizar grupos de critérios');
        }
        const response = await this.criterioServiceUpdate.update(+id, data);

        return MensagemSistema.showMensagem(HttpStatus.OK, 'Grupo de critérios atualizado com sucesso', response, req.path, null);
        
    }
}