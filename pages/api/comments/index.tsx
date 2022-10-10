import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from 'lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (req.method === 'POST') {
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized.' })
    }
    console.log('hello there')
    try {
      const { suggestionId, body } = req.body
      const createdComment = await prisma.comment.create({
        data: {
          suggestion: {
            connect: {
              id: suggestionId,
            },
          },
          user: {
            connect: {
              email: session.user.email,
            },
          },
          body: body,
        },
      })

      console.log('Added Comment: ', createdComment)
      return res.status(200).json(createdComment)
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong: ', error })
    }
  }
}
