import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from 'lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (req.method === 'PATCH') {
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized.' })
    }
    try {
      const { suggestionId, body, commentId } = req.body
      const updatedComment = await prisma.comment.upsert({
        where: { id: commentId },
        update: {
          body: body,
        },
        create: {
          body: body,
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

      console.log('Added Comment: ', updatedComment)
      return res.status(200).json(updatedComment)
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong: ', error })
    }
  }

  if (req.method === 'DELETE') {
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized.' })
    }
    try {
      const { commentId } = req.body
      const deletedComment = await prisma.comment.delete({
        where: {
          id: commentId,
        },
      })
      console.log('Deleted Comment: ', deletedComment)
      return res.status(200).json(deletedComment)
    } catch (error) {
      console.log('Error: ', error)
      return res.status(500).json({ message: 'Something went wrong: ', error })
    }
  }
}
