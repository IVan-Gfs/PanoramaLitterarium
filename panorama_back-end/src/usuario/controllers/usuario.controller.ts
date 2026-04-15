import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioRequest } from '../dto/usuario.request';


@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() usuarioResquest: UsuarioRequest) {
    return this.usuarioService.create(usuarioResquest);
  }

  @Get('/listar')
  findAll() {
    return this.usuarioService.findAll();
    
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  } 

  @Patch(':id')
  update(@Param('id') id: string, @Body() usuarioResquest: UsuarioRequest) {
    return this.usuarioService.update(+id, usuarioResquest);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
