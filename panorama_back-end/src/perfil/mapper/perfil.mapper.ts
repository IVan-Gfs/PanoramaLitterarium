import { Prisma } from "@prisma/client";
import { PerfilCreateDTO } from "../dto/perfil.create.dto";
import { OrganizacaoMapper } from "src/organizacao/mapper/organizacao.mapper";
import { ParticipanteMapper } from "src/participante/mapper/participante.mapper";
import { JuradoMapper } from "src/jurado/mapper/jurado.mapper";

export class PerfilMapper {
  static toDomain(dto: PerfilCreateDTO) {
    return {
      nome: dto.nome,
      foto: dto.foto,
      cpf: dto.cpf,
      tel: dto.tel,

      organizacao: dto.organizacao
        ? OrganizacaoMapper.toDomain(dto.organizacao)
        : undefined,
        
      jurado: dto.jurado
        ? JuradoMapper.toDomain(dto.jurado)
        : undefined,  

      participante: dto.participante
        ? ParticipanteMapper.toDomain(dto.participante)
        : undefined

    };
  }
}