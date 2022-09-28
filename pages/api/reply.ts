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
      const { suggestionId, commentId, userEmail, body } = req.body
      console.log('api body: ', body)

      const createdReply = await prisma.reply.create({
        data: {
          suggestion: {
            connect: {
              id: suggestionId,
            },
          },
          comment: {
            connect: {
              id: commentId,
            },
          },
          user: {
            connect: {
              email: userEmail,
            },
          },
          body: body,
        },
      })

      console.log('Added Reply: ', createdReply)
      return res.status(200).json(createdReply)
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong: ', error })
    }
  }
}
