import { Expose, Transform } from 'class-transformer';

export class CriterioResponseDTO {
  @Expose()
  @Transform(({ value }) => value.toString())
  id!: string;

  @Expose()
  nome!: string;

  @Expose()
  descricao!: string | null;

  @Expose()
  pontuacaoMax!: number | null;
}
