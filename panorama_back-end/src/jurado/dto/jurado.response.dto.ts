import { Expose, Transform } from "class-transformer";

export class JuradoResponseDTO {
    @Expose()
    @Transform(({ value }) => value?.toString())
    id!: string | null;

    profissao?: string;
    formacao?: String;
    biografia?: String;
}