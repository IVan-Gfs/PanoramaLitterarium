import { Expose, Transform, Type } from "class-transformer";
import { CategoriaResponseDTO } from "src/categoria/dto/categoria.response.dto";

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

  @Expose()
  @Type(() => CategoriaResponseDTO)
  categorias?: CategoriaResponseDTO[] | null;

}