import { Expose, Transform } from "class-transformer";


export class CategoriaResponseDTO {
    
    @Expose()
    @Transform(({value}) => value?.toString())
    id!: string | null;

    @Expose()
    nome!: string | null;

    @Expose()
    descricao!: string | null;
}