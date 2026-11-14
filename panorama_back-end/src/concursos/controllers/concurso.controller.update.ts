import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Patch,
  Req,
} from '@nestjs/common';


import { ConcursoServiceUpdate } from '../services/concurso.service.update';
import { ConcursoUpdateDto } from '../dto/request/concurso.update.dto';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/mensagem/mensagem';
import { ConcursoDetailDTO } from '../dto/response/concurso.detail.dto';
import { MensagemSistema } from 'src/commons/mensagem/mensagem.sistema';
import { Request } from 'express';


@Controller(ROTA.CONCURSO.BASE)
export class ConcursoControllerUpdate {
  constructor(private readonly concursoServiceUpdate: ConcursoServiceUpdate) {}

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Req() res: Request,
    @Body() updateDto: ConcursoUpdateDto,
  ): Promise<Result<ConcursoDetailDTO>>{


    const response = await this.concursoServiceUpdate.update(Number(id), updateDto);

    return MensagemSistema.showMensagem(
                HttpStatus.CREATED,
                'Concurso atualizado com sucesso!',
                response,
                res.path,
                null
    );
  }
}
