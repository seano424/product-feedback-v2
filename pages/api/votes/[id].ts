import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from 'lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (req.method === 'DELETE') {
    try {
      const { voteId } = req.body
      console.log(req.body)

      // const vote = await prisma.vote.delete({
      //   where: {
      //     id: voteId,
      //   },
      // })
      // res.status(200).json(vote)
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong: ', error })
    }
  }
}
