import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { db } from 'lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (req.method === 'POST') {
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized.' })
    }
    try {
      const { suggestionId } = req.body

      const vote = await db.vote.create({
        data: {
          user: {
            connect: {
              email: session.user.email,
            },
          },
          suggestion: {
            connect: {
              id: suggestionId,
            },
          },
        },
      })
      res.status(200).json(vote)
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong: ', error })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { voteId } = req.body

      const vote = await db.vote.delete({
        where: {
          id: voteId,
        },
      })
      res.status(200).json(vote)
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong: ', error })
    }
  }
}
