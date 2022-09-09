import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { categories, statuses, suggestions, users, comments } from '../lib/data'

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

  const fakeUsers = await Promise.all(
    users.map(async (user, i) => {
      const salt = bcrypt.genSaltSync()
      return prisma.user.upsert({
        where: { email: `user-${i}@test.com` },
        update: {},
        create: {
          email: `user-${i}@test.com`,
          password: bcrypt.hashSync(user.password, salt),
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
        },
      })
    })
  )

  const fakeSuggestions = await Promise.all(
    suggestions.map(async (suggestion, i) => {
      return prisma.suggestion.upsert({
        where: { title: suggestion.title },
        update: {},
        create: {
          title: suggestion.title,
          description: suggestion.description,
          votes: suggestion.votes,
          user: {
            connect: {
              id: fakeUsers[Math.floor(Math.random() * fakeUsers.length)].id,
            },
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

  await Promise.all(
    comments.map(async (comment) => {
      return prisma.comment.upsert({
        where: { id: comment.id },
        update: {},
        create: {
          body: comment.body,
          user: {
            connect: {
              id: fakeUsers[Math.floor(Math.random() * fakeUsers.length)].id,
            },
          },
          suggestion: {
            connect: {
              id: fakeSuggestions[
                Math.floor(Math.random() * fakeSuggestions.length)
              ].id,
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