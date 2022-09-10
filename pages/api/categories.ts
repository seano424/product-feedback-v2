import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const categories = await prisma.category.findMany({})

    if (categories.length) {
      res.status(200).json(categories)
      res.end()
    } else {
      res.status(404)
      res.end()
    }
  } catch {
    res.status(500)
  }
}
