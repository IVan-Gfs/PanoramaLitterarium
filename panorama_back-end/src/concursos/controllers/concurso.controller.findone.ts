import { Controller, Get, HttpStatus, Param, Req } from "@nestjs/common";
import { ROTA } from "src/commons/constants/url.sistema";
import { ConcursoDetailDTO } from "../dto/response/concurso.detail.dto";
import { concursoServiceFindOne } from "../services/concurso.service.findone";
import { MensagemSistema } from "src/commons/mensagem/mensagem.sistema";
import { Request } from "express";
import { Result } from "src/commons/mensagem/mensagem";

@Controller(ROTA.CONCURSO.BASE)
export class concursoControllerFindOne{

    constructor(private readonly concursoServiceFindOne: concursoServiceFindOne){}

    
    @Get(':id')
    async findOne(@Param('id') id: string, @Req() res: Request): Promise<Result<ConcursoDetailDTO>>{
        
    const reponse = await this.concursoServiceFindOne.findOne(+id)

    return MensagemSistema.showMensagem(HttpStatus.OK, 'Concurso encontrado com sucesso', reponse, res.path, null);

    }
}