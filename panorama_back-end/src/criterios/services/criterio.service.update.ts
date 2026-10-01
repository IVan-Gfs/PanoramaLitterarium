import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GrupoCriterioResponseDTO } from "../dto/response/grupo.criterio.responseDTO";
import { GrupoCriterioMapper } from "../mapper/criterio.mapper";
import { CreateGrupoCriterioDTO } from "../dto/response/grupo.criterio.request";

@Injectable()
export class CriterioServiceUpdate {
    constructor(private readonly prismaService: PrismaService){}

    async update(id: number, data: CreateGrupoCriterioDTO): Promise<GrupoCriterioResponseDTO> {

    const updateInput = GrupoCriterioMapper.toUpdateInput(data);


    const grupoCriterio = await this.prismaService.grupoCriterio.update({
        where: { id: BigInt(id) },
        data: updateInput,

    });

    return GrupoCriterioMapper.toDTO(grupoCriterio);
    }
}