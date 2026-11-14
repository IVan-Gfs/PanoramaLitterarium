


import { Expose, Transform } from "class-transformer";
import { ConcursoBaseReponseDTO } from "./consurso.base.dto";

//DADOS DE LISTAGEM PARA A ORGANIZAÇÃO DO CONCURSO
export class ConcursoListOrgDTO extends ConcursoBaseReponseDTO {


   @Expose()
    @Transform(({ value }) => value ? value.toISOString() : null)
    dataFinalizacao?: string | null;

    @Expose()
    @Transform(({ value }) => value ? value.toISOString() : null)
    prazoInscricao?: string | null;

    @Expose()
    etapaAtual?: String | null;

    @Expose()
    status?: String | null;

}