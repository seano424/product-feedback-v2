import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { resolve } from 'path'
export default async (req: NextApiRequest, res: NextApiResponse) => {
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
