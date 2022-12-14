import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from 'lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (req.method === 'DELETE') {
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized.' })
    }
    try {
      const { voteId } = req.body
      const deletedVote = await prisma.vote.delete({
        where: {
          id: voteId,
        },
      })
      console.log('Deleted Vote: ', deletedVote)
      return res.status(200).json(deletedVote)
    } catch (error) {
      console.log('Error: ', error)
      return res.status(500).json({ message: 'Something went wrong: ', error })
    }
  }
}
