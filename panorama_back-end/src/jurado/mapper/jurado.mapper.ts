import { JuradoCreateDTO } from "../dto/jurado.create.dto";

export class JuradoMapper {
    static toDomain(dto: JuradoCreateDTO){
        return{
            profissao: dto.profissao,
            formacao: dto.formacao,
            biografia: dto.biografia
        }
    }
}