  import { Concurso, Prisma } from "@prisma/client";
  import { ConcursoCreateDto } from "../dto/request/concurso.create.dto";
  import { ClassConstructor, plainToInstance } from "class-transformer";


  export class ConcursoMapper{

    
    static toCreateInput(dto: ConcursoCreateDto): Prisma.ConcursoCreateInput {
      return {
        ...dto,

        taxaInscricao: dto.taxaInscricao ?? null,

        prazoInscricao: dto.prazoInscricao
          ? new Date(dto.prazoInscricao)
          : undefined,

        organizacao: {
          connect: { id: BigInt(dto.organizacaoId) },
        },

        grupoCriterio: {
          connect: { id: BigInt(dto.grupoCriterioId) },
        },
      };
    }

    static toDTO<T>(DtoClass: ClassConstructor<T>, concurso: Partial<Concurso>): T {
      return plainToInstance(DtoClass, concurso, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true
      });
    }

    static toDTOList<T>(DtoClass: ClassConstructor<T>, concursos: any[]): T[] {
      const concursosDTO = concursos.map(concurso => ({
        ...concurso,
        categorias: concurso.categoria?.map((catCon: any) => catCon.categoria) // extrai as categorias reais
      }));
      return plainToInstance(DtoClass, concursosDTO, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      });
    }
  }