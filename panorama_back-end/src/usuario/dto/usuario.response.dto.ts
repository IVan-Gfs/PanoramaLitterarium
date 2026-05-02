import { Expose, Transform, Type } from "class-transformer";
import {PessoaResponseDTO } from "src/pessoa/dto/pessoa.response.dto";


export class UsuarioResponseDTO {

    @Expose()
    @Transform(({ value }) => value?.toString())
    id!: string | null;

    @Expose() email: string = '';

    @Type(()=>PessoaResponseDTO)
    pessoa!: PessoaResponseDTO;
}

