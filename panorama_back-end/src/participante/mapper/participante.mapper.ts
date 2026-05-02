import { ParticipanteCreateDTO } from "../dto/participante.create.dto";

export class ParticipanteMapper {
    static toDomain(dto: ParticipanteCreateDTO){
        return {
            pseudonimo: dto.pseudonimo
        }
    }
}