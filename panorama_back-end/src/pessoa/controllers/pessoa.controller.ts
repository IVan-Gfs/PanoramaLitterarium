import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PessoaService } from '../services/pessoa.service';
import { PessoaCreateDTO } from '../dto/pessoa.create.dto';


@Controller('pessoa')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Post()
  create(@Body() pessoaRequest: PessoaCreateDTO) {
    return this.pessoaService.create(pessoaRequest);
  }

  @Get('/listar')
  findAll() {
    return this.pessoaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pessoaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() pessoaRequest: PessoaCreateDTO) {
    return this.pessoaService.update(+id, pessoaRequest);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pessoaService.remove(+id);
  }
}
