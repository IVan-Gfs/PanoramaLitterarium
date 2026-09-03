import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards, ForbiddenException } from "@nestjs/common";
import { ROTA } from "src/commons/constants/url.sistema"; // Certifique-size de adicionar os caminhos no seu arquivo de constantes

import { CreateGrupoCriterioDTO } from "../dto/response/grupo.criterio.request";
import { GrupoCriterioResponseDTO } from "../dto/response/grupo.criterio.responseDTO";
import { Result } from 'src/commons/mensagem/mensagem';
import { MensagemSistema } from "src/commons/mensagem/mensagem.sistema";
import JwtAccessGuard from "src/auth/config/guard/jwt.access.guard";
import { GrupoCriterioServiceCreate } from "../services/criterio.service.create";
import requestWithUser from "src/auth/config/requestWithUser.interface";


@Controller()
export class GrupoCriterioControllerCreate {

    constructor(private readonly grupoCriterioServiceCreate: GrupoCriterioServiceCreate){}

    @HttpCode(HttpStatus.CREATED)
    @UseGuards(JwtAccessGuard) // Protege a rota com o Guard JWT que configuramos
    @Post(ROTA.GRUPO_CRITERIO.BASE)
    async create(
        @Req() res: requestWithUser, // requestWithUser para ter acesso ao usuário do token
        @Body() grupoCriterioRequest: CreateGrupoCriterioDTO
    ): Promise<Result<GrupoCriterioResponseDTO>> {
        
        // Recupera a FK da organização associada ao usuário autenticado
        const organizacaoId = res.user.perfil?.organizacao?.id;

        if (!organizacaoId) {
            throw new ForbiddenException('Apenas usuários vinculados a uma Organização podem cadastrar grupos de critérios');
        }

        // Passa o DTO e a FK BigInt extraída do token
        const response = await this.grupoCriterioServiceCreate.create(grupoCriterioRequest, organizacaoId);

        // Retorna seguindo estritamente o padrão estético do seu sistema
        return MensagemSistema.showMensagem(
            HttpStatus.CREATED, 
            'Grupo de critérios cadastrado com sucesso!', 
            response, 
            res.path, 
            null
        );
    }
}
