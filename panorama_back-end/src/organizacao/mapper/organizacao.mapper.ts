import { Prisma } from "@prisma/client";
import { OrganizacaoCreateDto } from "../dto/organizacao.create.dto";

export class OrganizacaoMapper {
  static toDomain(dto: OrganizacaoCreateDto) {
    return {
      nomeFantasia: dto.nomeFantasia,
      razaoSocial: dto.razaoSocial,
      tipo: dto.tipo,
      cep: dto.cep,
      endereco: dto.endereco,
      municipio: dto.municipio,
      uf: dto.uf,
    };
  }
}