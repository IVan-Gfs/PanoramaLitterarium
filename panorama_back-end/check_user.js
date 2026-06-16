require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');

const dbConfig = {
  host: process.env.DATABASE_HOST || '127.0.0.1',
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: Number(process.env.DATABASE_PORT) || 3306,
  allowPublicKeyRetrieval: true,
  connectionLimit: 10,
};

const adapter = new PrismaMariaDb(dbConfig);
const prisma = new PrismaClient({ adapter });

async function main(){
  const email = 'typuseditora@gmail.com';
  const user = await prisma.usuario.findUnique({ where: { email } });
  if(!user){
    console.log('NOT_FOUND');
    process.exit(0);
  }
  console.log('FOUND', {
    id: user.id.toString(),
    email: user.email,
    statusValidacao: user.statusValidacao,
    senha: user.senha
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => { console.error('ERROR', e); await prisma.$disconnect(); process.exit(1) });
