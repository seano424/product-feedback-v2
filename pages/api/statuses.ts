import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const statuses = await prisma.status.findMany({
      include: {
        suggestions: true,
      },
    })

    if (statuses.length) {
      res.status(200).json(statuses)
      res.end()
    } else {
      res.status(404)
      res.end()
    }
  } catch {
    res.status(500)
  }
}
