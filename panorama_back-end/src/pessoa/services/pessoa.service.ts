import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { PessoaCreateDTO } from '../dto/pessoa.create.dto';

@Injectable()
export class PessoaService {

  constructor(private readonly prismaService: PrismaService){}
  create(pessoa: PessoaCreateDTO) {
    return 'This action adds a new pessoa';
  }

  async findAll() {
    const pessoas = await this.prismaService.pessoa.findMany()
    return pessoas;
  }

  findOne(id: number) {
    return `This action returns a #${id} pessoa`;
  }

  update(id: number, pessoaRequest: PessoaCreateDTO) {
    return `This action updates a #${id} pessoa`;
  }

  remove(id: number) {
    return `This action removes a #${id} pessoa`;
  }
}
