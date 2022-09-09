import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { categories, statuses, suggestions } from '../lib/data'

const prisma = new PrismaClient()

const run = async () => {
  const cats = await Promise.all(
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

  const stats = await Promise.all(
    statuses.map(async (status) => {
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

  const salt = bcrypt.genSaltSync()
  const user = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      email: 'user@test.com',
      password: bcrypt.hashSync('password', salt),
      firstName: 'Sean',
      lastName: 'OReilly',
      username: 'seanpatricksean',
    },
  })

  await Promise.all(
    suggestions.map(async (suggestion, i) => {
      return prisma.suggestion.upsert({
        where: { id: i },
        update: {},
        create: {
          title: suggestion.title,
          description: suggestion.description,
          votes: suggestion.votes,
          user: {
            connect: { id: user.id },
          },
          category: {
            connect: {
              id: cats[Math.floor(Math.random() * cats.length)].id,
            },
          },
          status: {
            connect: {
              type: stats[Math.floor(Math.random() * stats.length)].type,
            },
          },
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
