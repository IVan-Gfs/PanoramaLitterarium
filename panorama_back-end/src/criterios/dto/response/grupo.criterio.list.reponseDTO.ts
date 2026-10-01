import { Expose, Transform } from "class-transformer";

export class GrupoCriterioListResponseDTO {
  @Expose()
  @Transform(({ value }) => value.toString())
  id!: string;

  @Expose()
  nome!: string | null;
}
