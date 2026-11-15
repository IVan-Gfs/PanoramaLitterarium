import { Controller, Delete, HttpCode, HttpStatus, Param, ParseIntPipe, Req } from "@nestjs/common";
import { ConcursoServiceDelete } from "../services/concurso.service.delete";
import { Result } from "src/commons/mensagem/mensagem";
import { MensagemSistema } from "src/commons/mensagem/mensagem.sistema";
import { ROTA } from "src/commons/constants/url.sistema";
import { Request } from "express";

@Controller(ROTA.CONCURSO.BASE)
export class ConcursoControllerDelete {
    constructor(private readonly serviceConcursoDelete: ConcursoServiceDelete){}

    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    async delete(
        @Param('id', ParseIntPipe) id: number,
        @Req() res: Request
    ): Promise<Result<void>>{


        const response = await this.serviceConcursoDelete.delete(id)

        return MensagemSistema.showMensagem(
              HttpStatus.OK,
              'Concurso deletado com sucesso',
              response,
              res.path,
              null,
            );
    }
}