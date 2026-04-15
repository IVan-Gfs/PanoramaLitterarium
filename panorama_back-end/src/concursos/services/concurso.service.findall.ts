import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { Concurso } from "@prisma/client";
import { ConcursoMapper } from "../mapper/concurso.mapper";
import { ConcursoListParticDTO } from "../dto/response/concurso.list.partic.dto";


@Injectable()
export class ConcursoServiceFindAll {

    constructor(private readonly prismaService: PrismaService){}

    async findAll(): Promise<ConcursoListParticDTO[]> {

    const concursos = await this.prismaService.concurso.findMany({ //Fazer select do campos desejados depois, para tornar mais seguro
        include: { organizacao: true }, 
        orderBy: { createdAt: 'desc' }
    });

    return ConcursoMapper.toDTOList(ConcursoListParticDTO, concursos);
}

}