import { Expose } from "class-transformer";


export class PessoaResponse {

    @Expose() id: number = 0;
    @Expose() nome: string = '';
    @Expose() email: string = '';
    @Expose() tipo: number = 0;
    @Expose() documento: string = ''; // cpf ou cnpj!
    @Expose() tipoPessoa: string = ''; // PF (física) ou PJ (Jurídica)
    @Expose() tel: string = '';
}

