import { OrganizacaoResumoDto } from "src/organizacao/dtos/organizacao.resumo";
import { ConcursoBaseReponseDTO } from "./consurso.base.dto";
import { Expose, Transform, Type } from "class-transformer";


//DADOS DE LISTAGEM PARA OS PARTICIPANTES
export class ConcursoListParticDTO extends ConcursoBaseReponseDTO { 

  @Expose()
  @Transform(({ value }) => value.toISOString())
  prazoInscricao?: string | null;

  @Expose()
  @Type(() => OrganizacaoResumoDto)
  organizacao!: OrganizacaoResumoDto
}