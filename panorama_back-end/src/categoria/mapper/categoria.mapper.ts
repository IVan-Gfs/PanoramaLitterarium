import { Categoria, Prisma } from "@prisma/client";
import { CategoriaRequestDTO } from "../dto/categoria.request.dto";
import { plainToInstance } from "class-transformer";
import { CategoriaResponseDTO } from "../dto/categoria.response.dto";

export class CategoriaMapper {

    static toCreateInput(dto: CategoriaRequestDTO): Prisma.CategoriaCreateInput {
        return { ...dto}
    }

    static toDTO( categoria: Partial<Categoria>): CategoriaResponseDTO{
        return plainToInstance(CategoriaResponseDTO, categoria, {
            excludeExtraneousValues: true,
            enableImplicitConversion: true, 
        })
    }

    static toDTOList(categoria: Categoria[]): CategoriaResponseDTO[] {
        return categoria.map(cat => CategoriaMapper.toDTO(cat))
    }
}