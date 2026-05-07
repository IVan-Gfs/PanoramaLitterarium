import "dotenv/config"; 
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from "@prisma/client";





@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

    constructor(){
        const dbConfig = {
        host: process.env.DATABASE_HOST || '127.0.0.1', 
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        port: Number(process.env.DATABASE_PORT) || 3306,
        allowPublicKeyRetrieval: true,
        connectionLimit: 10,
        };
 
         
        console.log('Conectando ao MariaDB em:', dbConfig.host, 'DB:', dbConfig.database);

        const adapter = new PrismaMariaDb(dbConfig);
        super({ adapter });
    }
    

    async onModuleInit() {
        try {
            await this.$connect();
            Logger.log('Conexão com o banco de dados estabelecida com sucesso!');
        } catch (error) {
            Logger.error(`Falha na conexão com o banco de dados`)
            throw error;
        }
    }

    
}
