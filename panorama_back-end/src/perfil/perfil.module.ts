import { Module } from '@nestjs/common';
import { PerfilController } from './controllers/perfil.controller';
import { PerfilService } from './services/pessoa.service';


@Module({
  controllers: [PerfilController],
  providers: [PerfilService],
})
export class PessoaModule {}
