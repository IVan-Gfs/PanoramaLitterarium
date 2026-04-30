import { Transform } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";

export class ConcursoParamsDTO{

    @IsOptional() page?: string;
    @IsOptional() pageSize?: string;
    @IsOptional() props?: string;
    @IsOptional() searchTerm?: string;
    @IsOptional() categorias?: string;
    @IsOptional() orderBy?: string;
    @IsOptional() order?: 'ASC' | 'DESC';


    //Campos de flags booleanas 
    @IsOptional()
    @Transform(({value})=>{
        if(value === 'true' || value === '1' || value === 1) return true
        if(value === 'false' || value === '0' || value === 0) return false
        return value
    })
    @IsBoolean()
    gratuito?: boolean;

    @IsOptional()
    @Transform(({value})=>{
            if(value === 'true' || value === '1' || value === 1) return true
            if(value === 'false' || value === '0' || value === 0) return false
            return value
    })
    @IsBoolean()
    premioEmDinheiro?: boolean;
}