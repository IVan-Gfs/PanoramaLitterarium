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
        organizacaoId: bigint 
    ): Promise<ConcursoDetailDTO> {

        if(!ConcursoRequest.categoriaIds || ConcursoRequest.categoriaIds.length === 0) {
            throw new Error('É obrigatório informar ao menos uma categoria para o concurso');
        }

        ConcursoRequest.organizacaoId = organizacaoId.toString();
        const createInput = ConcursoMapper.toCreateInput(ConcursoRequest);

        const concurso = await this.prismaService.concurso.create({
            data: createInput,
        })

        const categoriaConnect = ConcursoRequest.categoriaIds.map(
            categoriaId => ({ id: categoriaId })
        )

        await this.prismaService.categoriaConcurso.createMany({
            data: categoriaConnect.map(categoria => ({
                concursoId: concurso.id,
                categoriaId: categoria.id
            }))
        });

        return ConcursoMapper.toDTO(ConcursoDetailDTO,concurso);
    }
}