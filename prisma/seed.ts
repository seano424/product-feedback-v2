import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { categories, status } from '../lib/data'

const prisma = new PrismaClient()

const run = async () => {
  await Promise.all(
    categories.map(async (category) => {
      return prisma.category.upsert({
        where: { name: category.name },
        update: {},
        create: {
          name: category.name,
          type: category.type,
        },
      })
    })
  )

  await Promise.all(
    status.map(async (status) => {
      return prisma.status.upsert({
        where: { name: status.name },
        update: {},
        create: {
          name: status.name,
          type: status.type,
        },
      })
    })
  )
}

run()
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
  .finally(async () => {
    console.log('woohoo!')
    await prisma.$disconnect()
  })
