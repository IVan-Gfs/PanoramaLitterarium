import { Expose, Transform } from "class-transformer";

export class ParticipanteResponseDTO {

    @Expose()
    @Transform(({ value }) => value?.toString())
    id!: string | null;

    @Expose()
    pseudonimo!: string;
}