import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class JuradoCreateDTO {

    @IsString()
    @IsNotEmpty({message:"Profissão é obrigatório"})
    profissao!: string;

    @IsString()
    @IsNotEmpty({message:"Formação acadêmica é obrigatório"})
    formacao!: string;

    @IsString()
    @IsOptional()
    biografia?: string;
}