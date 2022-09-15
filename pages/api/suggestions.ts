import { NextApiRequest, NextApiResponse } from 'next'
import { db } from 'lib/prisma'
import { resolve } from 'path'
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const suggestions = await db.suggestion.findMany({
      include: {
        comments: true,
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
