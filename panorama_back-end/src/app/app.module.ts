import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { CategoriaModule } from 'src/categoria/categoria.modele';
import { CategoriaMapper } from 'src/categoria/mapper/categoria.mapper';
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
    CategoriaModule,
    PrismaModule
  ],
})
export class AppModule {}