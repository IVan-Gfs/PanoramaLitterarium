import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GrupoCriterioMapper } from "../mapper/criterio.mapper";
import { GrupoCriterioResponseDTO } from "../dto/response/grupo.criterio.responseDTO";

@Injectable()
export class CriterioServiceFindAll {
    constructor(private readonly prismaService: PrismaService){}

    async findAll(
        organizacaoId: bigint
    ): Promise<GrupoCriterioResponseDTO[]>{
        const criterios = await this.prismaService.grupoCriterio.findMany({
            where: {
                organizacaoId: organizacaoId
            },
            orderBy: {
                nome: 'asc'
            }
        })


        return GrupoCriterioMapper.toDTOList(criterios);
    }
}