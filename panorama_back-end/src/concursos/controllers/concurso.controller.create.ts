import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { ConcursoServiceCreate } from "../services/concurso.service.create";
import { ConcursoDetailDTO } from "../dto/response/concurso.detail.dto";
import { ROTA } from "src/commons/constants/url.sistema";
import JwtAccessGuard from "src/auth/config/guard/jwt.access.guard";
import requestWithUser from "src/auth/config/requestWithUser.interface";
import { ConcursoCreateDto } from "../dto/request/concurso.create.dto";
import { MensagemSistema } from "src/commons/mensagem/mensagem.sistema";
import { Result } from "src/commons/mensagem/mensagem";

@Controller()
export class ConcursoControllerCreate {
    constructor(private readonly concursoServiceCreate: ConcursoServiceCreate) {}


    @HttpCode(HttpStatus.CREATED)
    @UseGuards(JwtAccessGuard) // Protege a rota com o Guard JWT que configuramos
    @Post(ROTA.CONCURSO.BASE)
    async create(
        @Req() res: requestWithUser,
        @Body() concursoRequest: ConcursoCreateDto
    ): Promise<Result<ConcursoDetailDTO>> {

        const organizacaoId = res.user.perfil?.organizacao?.id;

        if (!organizacaoId) {
            throw new Error('Apenas usuários vinculados a uma Organização podem cadastrar concursos');
        }

        const response = await this.concursoServiceCreate.create(concursoRequest, organizacaoId);

        return MensagemSistema.showMensagem(
            HttpStatus.CREATED,
            'Concurso cadastrado com sucesso!',
            response,
            res.path,
            null
        );
    }
}