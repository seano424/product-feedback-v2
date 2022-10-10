import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { resolve } from 'path'
import { getSession } from 'next-auth/react'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (req.method === 'GET') {
    try {
      const suggestion = await prisma.suggestion.findUnique({
        where: {
          id: +req.query.id,
        },
        include: {
          comments: {
            include: {
              user: true,
              replies: {
                include: {
                  user: true,
                },
              },
            },
          },
          category: true,
          status: true,
          votes: {
            include: {
              user: true,
            },
          },
          user: true,
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

  if (req.method === 'DELETE') {
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized.' })
    }
    try {
      const { suggestionId } = req.body
      const deletedSuggestion = await prisma.suggestion.delete({
        where: {
          id: suggestionId,
        },
      })
      console.log('Deleted Vote: ', deletedSuggestion)
      return res.status(200).json(deletedSuggestion)
    } catch (error) {
      console.log('Error: ', error)
      return res.status(500).json({ message: 'Something went wrong: ', error })
    }
  }
}
