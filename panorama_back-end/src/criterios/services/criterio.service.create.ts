import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateGrupoCriterioDTO } from "../dto/response/grupo.criterio.request";
import { GrupoCriterioResponseDTO } from "../dto/response/grupo.criterio.responseDTO";
import { GrupoCriterioMapper } from "../mapper/criterio.mapper";


@Injectable()
export class GrupoCriterioServiceCreate {

    constructor(
        private readonly prismaService: PrismaService
    ){}

    async create(
        grupoCriterioRequest: CreateGrupoCriterioDTO, 
        organizacaoId: bigint // Recebe o BigInt vindo direto do Controller autenticado
    ): Promise<GrupoCriterioResponseDTO> {

        // 1. Validação de Regra de Negócio básica (exemplo)
        if (!grupoCriterioRequest.criterios || grupoCriterioRequest.criterios.length === 0) {
            throw new BadRequestException('É obrigatório informar ao menos um critério para o grupo');
        }

        // 2. Vincula forçadamente a string do ID seguro no DTO antes de ir para o Mapper
        grupoCriterioRequest.organizacaoId = organizacaoId.toString();

        // 3. Converte o DTO modificado para o formato de input mapeado com o 'connect'
        const createInput = GrupoCriterioMapper.toCreateInput(grupoCriterioRequest);

        // 4. Salva no banco de dados e inclui os critérios criados em lote
        const grupoCriterio = await this.prismaService.grupoCriterio.create({
            data: createInput,
            include: {
                criterio: true // Retorna os critérios incluídos na árvore para a resposta do Mapper
            }
        });

        // 5. Retorna transformado pelo seu mapper (que já trata BigInt internamente no seu projeto)
        return GrupoCriterioMapper.toDTO(grupoCriterio);
    }
}
