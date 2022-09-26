import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'

import {
  categories,
  statuses,
  fakeSuggestions,
  comments,
  replies,
} from '../lib/data'

const prisma = new PrismaClient()

const run = async () => {
  console.log('creating categories...')

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

  console.log('success')
  console.log('now creating statuses...')

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

  console.log('successfully created stats')
  console.log('now running faker')

  const fakers = await Promise.all(
    new Array(10).fill(1).map(async () => {
      return {
        email: faker.internet.email(),
        name: faker.name.fullName(),
        id: faker.datatype.string(),
        username: faker.internet.userName(),
        image: faker.internet.avatar(),
      }
    })
  )

  const users = await Promise.all(
    fakers.map(async (user) => {
      return prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          email: user.email,
          name: user.name,
          image: user.image,
          username: user.username,
        },
      })
    })
  )

  const suggestions = await Promise.all(
    fakeSuggestions.map(async (suggestion, i) => {
      return prisma.suggestion.upsert({
        where: { title: suggestion.title },
        update: {},
        create: {
          title: suggestion.title,
          description: suggestion.description,
          user: {
            connect: {
              id: users[Math.floor(Math.random() * users.length)].id,
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

  console.log('created suggestions', suggestions)
  console.log('creating comments...')

  const newComments = await Promise.all(
    comments.map(async (comment) => {
      return prisma.comment.upsert({
        where: { id: comment.id },
        update: {},
        create: {
          body: comment.body,
          user: {
            connect: {
              id: users[Math.floor(Math.random() * users.length)].id,
            },
          },
          suggestion: {
            connect: {
              id: suggestions[
                Math.floor(Math.random() * fakeSuggestions.length)
              ].id,
            },
          },
        },
      })
    })
  )

  await Promise.all(
    replies.map(async (comment) => {
      return prisma.reply.upsert({
        where: { id: comment.id },
        update: {},
        create: {
          body: comment.body,
          comment: {
            connect: {
              id: newComments[Math.floor(Math.random() * newComments.length)]
                .id,
            },
          },
          user: {
            connect: {
              id: users[Math.floor(Math.random() * users.length)].id,
            },
          },
          suggestion: {
            connect: {
              id: suggestions[
                Math.floor(Math.random() * fakeSuggestions.length)
              ].id,
            },
          },
        },
      })
    })
  )

  // console.log('creating votes...')

  // await Promise.all(
  //   suggestions.map(async (suggestion) => {
  //     users.map(async (user) => {
  //       return prisma.vote.upsert({
  //         where: { id: uuidv4() },
  //         update: {},
  //         create: {
  //           user: {
  //             connect: {
  //               id: user.id,
  //             },
  //           },
  //           suggestion: {
  //             connect: {
  //               id: suggestion.id,
  //             },
  //           },
  //         },
  //       })
  //     })
  //   })
  // )
}

run()
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
  .finally(async () => {
    console.log('woohoo! Seed finished.')
    await prisma.$disconnect()
  })
