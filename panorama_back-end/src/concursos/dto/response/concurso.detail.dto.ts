import { OrganizacaoResumoDto } from "src/organizacao/dtos/organizacao.resumo";
import { ConcursoBaseReponseDTO } from "./consurso.base.dto";
import { Expose, Transform } from "class-transformer";

//DADOS DETALHADOS DO CONCURSO (PARTICIPANTE)
export class ConcursoDetailDTO extends ConcursoBaseReponseDTO { 

    @Expose()
    descricao?: string | null;

    @Expose()
    @Transform(({value})=> (value instanceof Date ? value.toISOString() : value))
    prazoInscricao?: string | null;

    @Expose()
    qtdVencedores?: number | null;

    @Expose()
    tema?: string | null;

    @Expose()
    municipio?: string | null;

    @Expose()
    uf?: string | null;

    @Expose()
    @Transform(({value})=> (value == null ? null : Number(value.toString())))
    taxaInscricao?: number | null;

    @Expose()
    premiacao?: string | null;

    @Expose()
    organizacao?: OrganizacaoResumoDto;
}
