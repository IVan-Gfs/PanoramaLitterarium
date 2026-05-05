import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PerfilService } from '../services/pessoa.service';
import { PerfilCreateDTO } from '../dto/perfil.create.dto';


@Controller('pessoa')
export class PerfilController {
  constructor(private readonly pessoaService: PerfilService) {}

  @Post()
  create(@Body() pessoaRequest: PerfilCreateDTO) {
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
  update(@Param('id') id: string, @Body() pessoaRequest: PerfilCreateDTO) {
    return this.pessoaService.update(+id, pessoaRequest);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pessoaService.remove(+id);
  }
}
