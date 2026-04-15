import { Controller, Get, HttpStatus, Req } from "@nestjs/common";
import { ConcursoServiceFindAll } from "../services/concurso.service.findall";
import { ROTA } from "src/commons/constants/url.sistema";

import { MensagemSistema } from "src/commons/mensagem/mensagem.sistema";
import { Request } from "express";
import { Result } from "src/commons/mensagem/mensagem";
import { ConcursoListParticDTO } from "../dto/response/concurso.list.partic.dto";


@Controller(ROTA.CONCURSO.BASE)
export class ConcursoControllerFindAll {

    constructor(private readonly concursoServiceFindAll: ConcursoServiceFindAll){}

    @Get(ROTA.CONCURSO.LIST)
    async findAll(@Req() res: Request ): Promise<Result<ConcursoListParticDTO[]>>{

        const response = await this.concursoServiceFindAll.findAll();

        return MensagemSistema.showMensagem(HttpStatus.OK, 'Concursos encontrados com sucesso!', response, res.path, null)
    }
}