import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from 'lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (req.method === 'DELETE') {
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized.' })
    }
    try {
      const { replyId } = req.body

      const deletedReply = await prisma.reply.delete({
        where: {
          id: replyId,
        },
      })
      console.log('Deleted Reply: ', deletedReply)
      return res.status(200).json(deletedReply)
    } catch (error) {
      console.log('Error: ', error)
      return res.status(500).json({ message: 'Something went wrong: ', error })
    }
  }

  if (req.method === 'PATCH') {
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized.' })
    }
    try {
      const { commentId, body, suggestionId, replyId } = req.body
      console.log('from the udpate api', req.body)

      const updatedReply = await prisma.reply.upsert({
        where: { id: replyId },
        update: {
          body: body,
        },
        create: {
          body: body,
          comment: {
            connect: {
              id: commentId,
            },
          },
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
      console.log('Updated Reply: ', updatedReply)
      return res.status(200).json(updatedReply)
    } catch (error) {
      console.log('Error: ', error)
      return res.status(500).json({ message: 'Something went wrong: ', error })
    }
  }
}
