import { Module } from '@nestjs/common';

import * as Joi from 'joi';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_TYPE: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().default(1521),
        DB_USERNAME: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_AUTOLOADENTITIES: Joi.string().default(true),
        DB_SYNCHRONIZE: Joi.string().default(false),
        DB_LOGGING: Joi.string().default(false)
      })
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'oracle',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        sid: configService.get('DB_DATABASE'),
        password: configService.get('DB_PASSWORD'),
        autoLoadEntities: configService.get('DB_AUTOLOADENTITIES'),
        synchronize: configService.get('DB_SYNCHRONIZE'),
        logging: ['query', 'error'],
      }),
    }),
    UsuarioModule
  ],
})
export class AppModule {}
