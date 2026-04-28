import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CategoriaResponseDTO } from "../dto/categoria.response.dto";
import { CategoriaMapper } from "../mapper/categoria.mapper";
import { Page } from "src/commons/pagination/page.sistema";
import { Pageable } from "src/commons/pagination/page.response";

@Injectable()
export class categoriaServiceFindAll {

    constructor(private readonly prismaService: PrismaService){}

    async findAll(): Promise<CategoriaResponseDTO[]>{

      
        const categorias = await this.prismaService.categoria.findMany({
            orderBy: {
                nome: 'asc'
            }
        })

        return CategoriaMapper.toDTOList(categorias)
    
    }
}