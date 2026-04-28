import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CategoriaRequestDTO {

    @IsNotEmpty({message: "Nome da categoria é obrigatório"})
    @IsString()
    nome!: string

    @IsString()
    @IsOptional()
    descricao?: string
}