import { Expose } from "class-transformer";


export class UsuarioResponse {
    @Expose() email: string = '';
}

