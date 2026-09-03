import { GrupoCriterio, Prisma } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { CreateGrupoCriterioDTO } from '../dto/response/grupo.criterio.request';
import { GrupoCriterioResponseDTO } from '../dto/response/grupo.criterio.responseDTO';
import { CriterioUpdateDTO } from '../dto/request/criterio.update.dto';



export class GrupoCriterioMapper {

  static toCreateInput(
    dto: CreateGrupoCriterioDTO,
  ): Prisma.GrupoCriterioCreateInput {
    return {
      nome: dto.nome,
      organizacao: {
        connect: {
          id: BigInt(dto.organizacaoId),
        },
      },
      criterio: {
        create: dto.criterios.map(criterio => ({
          nome: criterio.nome,
          descricao: criterio.descricao,
          pontuacaoMax: criterio.pontuacaoMax,
        })),
      },
    };
  }

  static toUpdateInput(
    dto: CreateGrupoCriterioDTO,
  ): Prisma.GrupoCriterioUpdateInput {
    const updateInput: Prisma.GrupoCriterioUpdateInput = {};
  
    if (dto.nome !== undefined) {
      updateInput.nome = dto.nome;
    }
    if (dto.criterios !== undefined) {
      updateInput.criterio = {
        deleteMany: {}, // Remove todos os critérios existentes
        create: dto.criterios.map(criterio => ({
          nome: criterio.nome,
          descricao: criterio.descricao,
          pontuacaoMax: criterio.pontuacaoMax,
        })),
      };
    }

    return updateInput;
  }

  static toDTO(
    grupo: Partial<GrupoCriterio>,
  ): GrupoCriterioResponseDTO {
    return plainToInstance(GrupoCriterioResponseDTO, grupo, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });
  }

  static toDTOList(
    grupos: GrupoCriterio[],
  ): GrupoCriterioResponseDTO[] {
    return grupos.map(grupo =>
      GrupoCriterioMapper.toDTO(grupo),
    );
  }
}
