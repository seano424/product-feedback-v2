import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { resolve } from 'path'
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const suggestion = await prisma.suggestion.findUnique({
      where: {
        id: +req.query.id,
      },
      include: {
        comments: {
          include: {
            user: true,
            replies: {
              include: {
                user: true,
              },
            },
          },
        },
        category: true,
        status: true,
        votes: {
          include: {
            user: true,
          },
        },
      },
    })

    if (suggestion) {
      res.status(200).json(suggestion)
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
