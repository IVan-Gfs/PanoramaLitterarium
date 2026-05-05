import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.role.createMany({
    data: [
      { role: 'PARTICIPANTE' },
      { role: 'JURADO' },
      { role: 'ADMIN' }
    ],
    skipDuplicates: true
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())