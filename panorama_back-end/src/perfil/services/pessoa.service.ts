import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { PerfilCreateDTO } from '../dto/perfil.create.dto';

@Injectable()
export class PerfilService {

  constructor(private readonly prismaService: PrismaService){}
  create(pessoa: PerfilCreateDTO) {
    return 'This action adds a new pessoa';
  }

  async findAll() {
    const perfis = await this.prismaService.perfil.findMany()
    return perfis;
  }

  findOne(id: number) {
    return `This action returns a #${id} pessoa`;
  }

  update(id: number, pessoaRequest: PerfilCreateDTO) {
    return `This action updates a #${id} pessoa`;
  }

  remove(id: number) {
    return `This action removes a #${id} pessoa`;
  }
}
