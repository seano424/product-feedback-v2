import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const suggestions = await prisma.suggestion.findMany({
      include: {
        comments: true,
        category: true,
        status: true,
      },
    })

    if (suggestions.length) {
      res.status(200).json(suggestions)
      res.end()
    } else {
      res.status(404)
      res.end()
    }
  } catch {
    res.status(500)
  }
}
