import {TipoPessoa } from "@prisma/client";
import { Expose, Type } from "class-transformer";
import { JuradoResponseDTO } from "src/jurado/dto/jurado.response.dto";
import { OrganizacaoResponseDto } from "src/organizacao/dto/organizacao.response.dto";
import { ParticipanteResponseDTO } from "src/participante/dto/participante.response.dto";


export class PessoaResponseDTO {

    @Expose() id!: number;
    @Expose() nome!: string;
    @Expose() email!: string;
    @Expose() documento!: string;
    @Expose() tel?: string;

    @Expose() @Type(() =>  OrganizacaoResponseDto) organizacao?: OrganizacaoResponseDto
    @Expose() @Type(() => JuradoResponseDTO) jurado?: JuradoResponseDTO
    @Expose() @Type(() => ParticipanteResponseDTO) Participante?: ParticipanteResponseDTO
    
}

