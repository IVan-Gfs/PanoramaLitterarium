import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class OrganizacaoCreateDto {


    @IsNotEmpty({message: "Nome fantasia é obrigatório"})
    @IsString()
    nomeFantasia!: string;

    @IsOptional()
    @IsString()
    razaoSocial?: string;

    @IsOptional()
    @IsString()
    cnpj?: string;

    @IsNotEmpty({message: "Tipo da organização é obrigatório"})
    @IsString()
    tipo!: string;

    @IsOptional()
    @IsNumber()
    @Type(()=> Number)
    cep?: number;

    @IsOptional()
    @IsString()
    endereco?: string;

    @IsOptional()
    @IsString()
    municipio?: string;

    @IsOptional()
    @IsString()
    uf?: string;

}