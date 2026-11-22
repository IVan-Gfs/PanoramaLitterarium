import { Prisma } from "@prisma/client";
import { ConcursoCreateDto } from "../dto/request/concurso.create.dto";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { ConcursoUpdateDto } from "../dto/request/concurso.update.dto";


export class ConcursoMapper {


  static toCreateInput(dto: ConcursoCreateDto, organizacaoId: number): Prisma.ConcursoCreateInput {

    const { categorias, ...rest } = dto;
    const grupoCriterioConnect = dto.grupoCriterio
      ? {
        connect: {
          id: BigInt(dto.grupoCriterio),
        },
      }
      : {};
    return {
      ...rest,
      taxaInscricao: dto.taxaInscricao ?? null,

      prazoInscricao: dto.prazoInscricao
        ? new Date(dto.prazoInscricao)
        : undefined,

      organizacao: {
        connect: { id: BigInt(organizacaoId) },
      },

      grupoCriterio: grupoCriterioConnect
    };
  }
  static toUpdateInput(dto: ConcursoUpdateDto): Prisma.ConcursoUpdateInput {
    const { categorias, grupoCriterio, ...rest } = dto;

    return {
      ...rest,

      taxaInscricao: dto.taxaInscricao !== undefined ? dto.taxaInscricao : undefined,


      prazoInscricao: dto.prazoInscricao !== undefined
        ? (dto.prazoInscricao ? new Date(dto.prazoInscricao) : null)
        : undefined,


      grupoCriterio: grupoCriterio !== undefined
        ? (grupoCriterio ? { connect: { id: BigInt(grupoCriterio) } } : { disconnect: true })
        : undefined,
    };
  }

  static toDTO<T>(DtoClass: ClassConstructor<T>, concurso: any): T {

    const concursoDTO = {
      ...concurso,

      categorias: concurso.categoriaConcurso?.map(
        (catCon: any) => catCon.categoria
      ) ?? []
    };

    return plainToInstance(DtoClass, concursoDTO, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true
    });
  }

  static toDTOList<T>(DtoClass: ClassConstructor<T>, concursos: any[]): T[] {

    const concursosDTO = concursos.map(concurso => ({
      ...concurso,

      categorias: concurso.categoriaConcurso?.map(
        (catCon: any) => catCon.categoria
      ) ?? []
    }));

    return plainToInstance(DtoClass, concursosDTO, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });
  }
}