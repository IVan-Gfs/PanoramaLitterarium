import { Expose } from "class-transformer";


export class UsuarioResponse {

    @Expose()
    idUsuario?: number;

    @Expose()
    nomeUsuario: string = '';

    @Expose()
    emailUsuario: string = '';

    @Expose()
    senhaUsurio: string = '';

    @Expose()
    fotoUsuario: string = '';

    @Expose()
    tipoUsuario: number = 0;

    @Expose()
    cpfUsuario: string = '';

    @Expose()
    cnpjUsuario: string = '';

    @Expose()
    telUsuario: string = '';    
}