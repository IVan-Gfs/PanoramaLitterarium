import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ConcursoUpdateDto } from "../dto/request/concurso.update.dto";
import { ConcursoDetailDTO } from "../dto/response/concurso.detail.dto";
import { ConcursoMapper } from "../mapper/concurso.mapper";

@Injectable()
export class ConcursoServiceUpdate {

    constructor(private readonly prismaService: PrismaService){}

    async update(idConcurso: number, ConcursoRequest: ConcursoUpdateDto ): Promise<ConcursoDetailDTO>{

    const updatedInput = ConcursoMapper.toUpdateInput(ConcursoRequest)

    const concurso =  await this.prismaService.concurso.update({
        where: {id: idConcurso},
        data: updatedInput
    })    

    return ConcursoMapper.toDTO(ConcursoDetailDTO,concurso);

    }
}