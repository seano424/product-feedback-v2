import { NextApiRequest, NextApiResponse } from 'next'
import { db } from 'lib/prisma'
import { resolve } from 'path'
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const suggestion = await db.suggestion.findUnique({
      where: {
        id: +req.query.id,
      },
      include: {
        comments: true,
        category: true,
        status: true,
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
