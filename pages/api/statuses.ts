import { NextApiRequest, NextApiResponse } from 'next'
import { db } from 'lib/prisma'
import { resolve } from 'path'
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const statuses = await db.status.findMany({
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
      return resolve()
    }
  } catch {
    res.status(500)
    return resolve()
  }
}
