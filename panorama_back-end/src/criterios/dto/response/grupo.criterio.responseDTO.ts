import { Expose, Transform, Type } from 'class-transformer';
import { CriterioResponseDTO } from './criterio.response';

export class GrupoCriterioResponseDTO {
  @Expose()
  @Transform(({ value }) => value.toString())
  id!: string;

  @Expose()
  nome!: string | null;

  @Expose()
  @Type(() => CriterioResponseDTO)
  criterio!: CriterioResponseDTO[];
}
