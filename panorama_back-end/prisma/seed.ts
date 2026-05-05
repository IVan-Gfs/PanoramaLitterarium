import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient()

async function main() {
  await prisma.role.upsert({
    where: { role: 'ADMIN' },
    update: {},
    create: { role: 'ADMIN' },
  })

  await prisma.role.upsert({
    where: { role: 'PARTICIPANTE' },
    update: {},
    create: { role: 'PARTICIPANTE' },
  })

  await prisma.role.upsert({
    where: { role: 'JURADO' },
    update: {},
    create: { role: 'JURADO' },
  })
 
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })
