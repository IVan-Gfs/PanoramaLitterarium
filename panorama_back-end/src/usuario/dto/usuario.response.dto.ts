import { Expose, Transform, Type } from "class-transformer";
import {PerfilResponseDTO } from "src/perfil/dto/perfil.response.dto";


export class UsuarioResponseDTO {

    @Expose()
    @Transform(({ value }) => value?.toString())
    id!: string | null;

    @Expose() email: string = '';

    @Type(()=>PerfilResponseDTO)
    pessoa!: PerfilResponseDTO;
}

