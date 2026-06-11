import { HttpStatus } from "@nestjs/common";
import { NegocioException } from "./negocio.exceptions";

export class ApiException extends NegocioException {
    constructor( message: string, statusCode?: number, error?: string | null){
        super({
            statusCode: statusCode ?? HttpStatus.BAD_REQUEST,
            message, 
            error: error ?? 'Erro de negócio.'
        })
    }
}