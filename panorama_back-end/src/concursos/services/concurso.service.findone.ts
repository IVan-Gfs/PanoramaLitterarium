import { Injectable, NotFoundException } from "@nestjs/common";
import { ConcursoDetailDTO } from "../dto/response/concurso.detail.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { ConcursoMapper } from "../mapper/concurso.mapper";


@Injectable()
export class ConcursoServiceFindOne {
    constructor(private readonly prismaService: PrismaService){}

    async findOne(id: number): Promise<ConcursoDetailDTO>{
        
        try{
            const concurso = await this.prismaService.concurso.findUniqueOrThrow({
                where: {
                    id: BigInt(id),
                    status: {
                        in: ["PUBLICADO", "ENCERRADO", "CANCELADO"]
                    }
                },
                include: {
                    organizacao: true, 
                    categoriaConcurso: {
                        include: {categoria: true},
                    }
                }
            })

            return ConcursoMapper.toDTO(ConcursoDetailDTO, concurso);
        }catch(error){
            console.log("Erro real do Prisma:", error   );
            throw new NotFoundException('Concurso não encontrado');
        }
    }
}