import { Expose, Transform } from "class-transformer";

export class OrganizacaoResponseDto {
    @Expose()
    @Transform(({value}) => value?.toString())
    id!: string | null;
    
    @Expose()
    nomeFantasia?: string  | null;

    @Expose()
    razaoSocial?: string  | null;

    @Expose()
    cpnj?: string  | null;
    
    @Expose()
    municipio?: string  | null;

    @Expose()
    cep?: string  | null;
    
    @Expose()
    uf?: string | null;
    
    @Expose()
    tipo?: string  | null;
}