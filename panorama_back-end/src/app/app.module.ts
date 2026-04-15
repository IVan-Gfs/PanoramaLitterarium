import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConcursoModule } from 'src/concursos/concursos.module';
import { PessoaModule } from 'src/pessoa/pessoa.module';
import { PrismaModule } from 'src/prisma/prisma.module';

import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [
    ConfigModule.forRoot({
       isGlobal: true,
       envFilePath: '.development.env',
       
    }),
    UsuarioModule,
    PessoaModule,
    ConcursoModule,
    PrismaModule
  ],
})
export class AppModule {}