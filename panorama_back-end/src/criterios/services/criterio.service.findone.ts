import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GrupoCriterioResponseDTO } from "../dto/response/grupo.criterio.responseDTO";
import { GrupoCriterioMapper } from "../mapper/criterio.mapper";

@Injectable()
export class GrupoCriterioServiceFindOne {
    constructor(private readonly prismaService: PrismaService){}

    async findOne(id: number, organizacaoId: bigint): Promise<GrupoCriterioResponseDTO | null>{
        try{
            const grupoCriterio = await this.prismaService.grupoCriterio.findFirstOrThrow({
                where: {id: BigInt(id), organizacaoId},
                include: {criterio: true}
            })

            return GrupoCriterioMapper.toDTO(grupoCriterio);
        }catch(error){
            console.log("Erro real do Prisma:", error   );
            throw new NotFoundException('Grupo de Critério não encontrado');
        }
    }

}