
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ConcursoCreateDto } from "../dto/request/concurso.create.dto";
import { ConcursoDetailDTO } from "../dto/response/concurso.detail.dto";
import { ConcursoMapper } from "../mapper/concurso.mapper";

@Injectable()
export class ConcursoServiceCreate {

    constructor(private readonly prismaService: PrismaService) {}

    async create(
        ConcursoRequest: ConcursoCreateDto,
        organizacaoId: number
    ): Promise<ConcursoDetailDTO> {

        const createInput = ConcursoMapper.toCreateInput(
            ConcursoRequest,
            organizacaoId
        );

        if (!ConcursoRequest.tema?.trim()) {
            createInput.tema = "Livre";
        }

        const concurso = await this.prismaService.$transaction(async (tx) => {

            const novoConcurso = await tx.concurso.create({
                data: createInput,
            });

            const categoriaConnect = ConcursoRequest.categorias ?? [];

            await tx.categoriaConcurso.createMany({
                data: categoriaConnect.map(categoriaId => ({
                    concursoId: novoConcurso.id,
                    categoriaId: BigInt(categoriaId)
                }))
            });

            return novoConcurso;
        });

        return ConcursoMapper.toDTO(ConcursoDetailDTO, concurso);
    }
}
