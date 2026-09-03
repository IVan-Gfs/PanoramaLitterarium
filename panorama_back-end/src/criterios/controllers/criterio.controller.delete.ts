import { Controller, Delete, ForbiddenException, HttpCode, HttpStatus, Param, ParseIntPipe, Req, Res, UseGuards } from "@nestjs/common";
import { CriterioServiceDelete } from "../services/criterio.service.delete";
import { Result } from "src/commons/mensagem/mensagem";
import { ROTA } from "src/commons/constants/url.sistema";
import { MensagemSistema } from "src/commons/mensagem/mensagem.sistema";
import { Request } from "express";
import requestWithUser from "src/auth/config/requestWithUser.interface";
import JwtAccessGuard from "src/auth/config/guard/jwt.access.guard";

@Controller()
export class CriterioControllerDelete {

    constructor(private readonly criterioServiceDelete: CriterioServiceDelete) {}

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAccessGuard)
    @Delete(':id')
    async deleteGrupo(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: requestWithUser,
    ): Promise<Result<void>> {

    const organizacaoId = req.user.perfil?.organizacao?.id;

    if (!organizacaoId) {
      throw new ForbiddenException('Apenas usuários vinculados a uma Organização podem excluir grupos de critérios',);
    }

    const response = await this.criterioServiceDelete.deleteGrupo(
        id,
        organizacaoId,
      );

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Grupo de critérios deletado com sucesso',
      response,
      req.path,
      null,
    );
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAccessGuard)
  @Delete(':id')
  async deleteCriterio(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: requestWithUser,
  ): Promise<Result<void>> {

    const organizacaoId = req.user.perfil?.organizacao?.id;

    if (!organizacaoId) {
      throw new ForbiddenException('Apenas usuários vinculados a uma Organização podem excluir critérios',);
    }

    const response = await this.criterioServiceDelete.deleteCriterio(
      id,
      organizacaoId,
    );

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Critério deletado com sucesso',
      response,
      req.path,
      null,
    );
  }
}
