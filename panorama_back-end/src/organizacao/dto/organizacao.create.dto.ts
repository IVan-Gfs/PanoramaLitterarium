import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import {PessoaCreateDTO } from "src/pessoa/dto/pessoa.create.dto";

export class OrganizacaoCreateDto {


    @IsNotEmpty({message: "Nome fantasia é obrigatório"})
    @IsString()
    nomeFantasia!: string;

    @IsNotEmpty({message: "Razão social é obrigatório"})
    @IsString()
    razaoSocial!: string;

    @IsNotEmpty({message: "Tipo da organização é obrigatório"})
    @IsString()
    tipo!: string;

    @IsNotEmpty({message: "Cep é obrigatório"})
    @IsNumber()
    @Type(()=> Number)
    cep!: number;

    @IsNotEmpty({message: "Endereço é obrigatório"})
    @IsString()
    endereco!: string;

    @IsNotEmpty({message: "Município é obrigatório"})
    @IsString()
    municipio!: string;

    @IsNotEmpty({message: "UF é obrigatório"})
    @IsString()
    uf!: string;

}