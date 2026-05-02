import { Expose, Transform } from "class-transformer";


export class OrganizacaoResumoDto {

  @Expose()
  @Transform(({value}) => value?.toString())
  id!: string | null;

  @Expose()
  nomeFantasia?: string  | null;

  @Expose()
  municipio?: string  | null;

  @Expose()
  uf?: string | null;

  @Expose()
  tipo?: string  | null;
}