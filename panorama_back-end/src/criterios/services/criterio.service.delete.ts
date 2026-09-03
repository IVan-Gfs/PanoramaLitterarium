import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CriterioServiceDelete {

  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async deleteGrupo(
    id: number,
    organizacaoId: bigint,
  ): Promise<void> {

    const grupoCriterio =
      await this.prismaService.grupoCriterio.findFirst({
        where: {
          id: BigInt(id),
          organizacaoId,
        },
      });

    if (!grupoCriterio) {
      throw new NotFoundException(
        'Grupo de critérios não encontrado',
      );
    }

    const concurso =
      await this.prismaService.concurso.findFirst({
        where: {
          grupoCriterioId: BigInt(id),
        },
        select: {
          id: true,
        },
      });

    if (concurso) {
      throw new ConflictException(
        'Não é possível excluir o grupo de critérios, pois ele está associado a um concurso.',
      );
    }

    await this.prismaService.grupoCriterio.delete({
      where: {
        id: BigInt(id),
      },
    });
  }

  async deleteCriterio(
    id: number,
    organizacaoId: bigint,
  ): Promise<void> {

    const criterio =
      await this.prismaService.criterio.findFirst({
        where: {
          id: BigInt(id),
          grupoCriterio: {
            organizacaoId,
          },
        },
      });

    if (!criterio) {
      throw new NotFoundException(
        'Critério não encontrado',
      );
    }

    const nota =
      await this.prismaService.nota.findFirst({
        where: {
          criterioId: BigInt(id),
        },
        select: {
          id: true,
        },
      });

    if (nota) {
      throw new ConflictException(
        'Não é possível excluir o critério, pois ele está associado a uma nota.',
      );
    }

    await this.prismaService.criterio.delete({
      where: {
        id: BigInt(id),
      },
    });
  }
}
