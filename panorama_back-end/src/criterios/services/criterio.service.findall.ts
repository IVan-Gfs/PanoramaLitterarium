import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GrupoCriterioMapper } from "../mapper/criterio.mapper";
import { GrupoCriterioResponseDTO } from "../dto/response/grupo.criterio.responseDTO";
import { orderFieldsCriterio, searchFieldsCriterio } from "../constants/criterio.constants";
import { Pageable } from "src/commons/pagination/page.response";
import { Page } from "src/commons/pagination/page.sistema";

@Injectable()
export class CriterioServiceFindAll {
    constructor(private readonly prismaService: PrismaService) {}

    async findAll(
        organizacaoId: bigint,
        page: number,
        pageSize: number,
        props: string,
        order: 'ASC' | 'DESC',
        search?: string,
        orderBy?: string
    ): Promise<Page<GrupoCriterioResponseDTO>> {

        const pageable = new Pageable(
            page,
            pageSize,
            props,
            order,
            orderBy,
            searchFieldsCriterio,
            orderFieldsCriterio
        );

        const where: any = {};

        where.organizacaoId = organizacaoId;

        if (search) {
            where[pageable.props] = {
                contains: search,
            };
        } // ← estava faltando

        const [criterios, totalitems] = await Promise.all([
            this.prismaService.grupoCriterio.findMany({
                skip: pageable.offset,
                take: pageable.limit,
                where,
                orderBy: {
                    [pageable.orderBy]: pageable.order.toLowerCase(),
                }
            }),
            this.prismaService.grupoCriterio.count({ where })
        ]);

        const criteriosDTO = GrupoCriterioMapper.toDTOList(criterios);

        return Page.of(
            criteriosDTO,
            totalitems,
            pageable
        );
    }
}
