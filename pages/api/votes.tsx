import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from 'lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (req.method === 'POST') {
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized.' })
    }
    try {
      const { suggestionId } = req.body

      const createdVote = await prisma.vote.create({
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
      console.log('Added Vote: ', createdVote)
      return res.status(200).json(createdVote)
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong: ', error })
    }
  }
}
