import { IsNotEmpty, IsString } from "class-validator";

export class ParticipanteCreateDTO {

    @IsString()
    @IsNotEmpty({message:"Profissão é obrigatório"})
    pseudonimo?: string;
}