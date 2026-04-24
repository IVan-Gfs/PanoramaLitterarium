import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { ConcursoModule } from 'src/concursos/concursos.module';
import { PessoaModule } from 'src/pessoa/pessoa.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsuarioModule } from 'src/usuario/usuario.module';


@Module({
  imports: [
      ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','..', '..', 'uploads'),
      serveRoot: '/uploads'
  }),
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