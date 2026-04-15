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
        connectionLimit: 5,
        };

        
        console.log('Conectando ao MariaDB em:', dbConfig.host, 'DB:', dbConfig.database);

        const adapter = new PrismaMariaDb(dbConfig);
        super({ adapter });
    }
    

    async onModuleInit() {
        try {
            await this.$connect();
            const result = await this.$queryRaw`SELECT 1`;
            Logger.log('Conexão estabelecida com sucesso!');
            console.log('Resultado do teste:', result);
        } catch (error) {
            Logger.error(`Falha na conexão com o banco`)
            throw error;
        }
    }

    
}
