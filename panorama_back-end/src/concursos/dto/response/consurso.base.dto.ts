import { Expose, Transform } from "class-transformer";

//DADOS BÁSICOS DO CONCURSO
export class ConcursoBaseReponseDTO {

  @Expose()
  @Transform(({ value }) => value?.toString())
  id!: string | null;

  @Expose()
  titulo?: string | null;

  @Expose()
  imgCapa?: string | null;

  @Expose()
  generoLiterario?: string | null;


}