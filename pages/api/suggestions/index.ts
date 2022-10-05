import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { resolve } from 'path'
import { getSession } from 'next-auth/react'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (req.method === 'GET') {
    try {
      const suggestions = await prisma.suggestion.findMany({
        include: {
          comments: {
            include: {
              user: true,
            },
          },
          category: true,
          status: true,
          votes: {
            include: {
              user: true,
            },
          },
          user: true,
        },
      })

      if (suggestions.length) {
        res.status(200).json(suggestions)
        res.end()
      } else {
        res.status(404)
        res.end()
        return resolve()
      }
    } catch {
      res.status(500)
      return resolve()
    }
  }

  if (req.method === 'POST') {
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized.' })
    }
    try {
      const { title, description, category, status, id } = req.body
      const createdReply = await prisma.suggestion.upsert({
        where: { id: id },
        update: {
          title: title,
          description: description,
          category: {
            connect: {
              name: category,
            },
          },
          status: {
            connect: {
              name: status,
            },
          },
        },
        create: {
          title: title,
          description: description,
          user: {
            connect: {
              email: session.user.email,
            },
          },
          category: {
            connect: {
              name: category,
            },
          },
          status: {
            connect: {
              name: status,
            },
          },
        },
      })
      console.log('New Reply: ', createdReply)
      return res.status(200).json(createdReply)
    } catch (error) {
      console.log('Error: ', error)
      return res.status(500).json({ message: 'Something went wrong: ', error })
    }
  }
}
