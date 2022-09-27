import Link from 'next/link'
import { ArrowLeft } from '@/icons'
import Suggestion from '@/components/Feedback/Suggestion'
import { SuggestionProps } from '@/lib/interfaces'
import prisma from '@/lib/prisma'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

const Feedback = (props: SuggestionProps) => {
  console.log(props)
  const { suggestion } = props
  const { data: session, status } = useSession()
  console.log(suggestion)

  return (
    <section className="min-h-screen bg-gray-light py-10">
      <div className="container mx-auto flex max-w-4xl flex-col gap-5">
        {/* Header */}
        <nav className="flex justify-between">
          <Link href="/">
            <a className="flex items-center gap-3 text-[14px] font-bold leading-[20px] text-blue-navy">
              <ArrowLeft />
              Go Back
            </a>
          </Link>
          <button className="button bg-blue py-3">Edit Feedback</button>
        </nav>

        {/* Suggestion */}
        <Suggestion suggestion={suggestion} />

        {/* Comments */}
        <div className="w-full cursor-pointer rounded-xl bg-white/80 p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="h3">
              {suggestion.comments.length && suggestion.comments.length === 1
                ? '1 Comment'
                : suggestion.comments.length + ' Comments'}
            </h3>
          </div>

          <div>
            {suggestion.comments.map((comment, i) => (
              <div
                key={i}
                className="my-8 flex gap-8 border-b-2 border-gray-light pb-5"
              >
                <div>
                  <Image
                    className="rounded-full"
                    src={
                      comment.user.image ??
                      'https://unsplash.com/photos/mEZ3PoFGs_k'
                    }
                    alt="Avatar"
                    height={50}
                    width={50}
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex w-full items-end justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="h4">{comment.user.name}</p>
                      <p className="body-2">{comment.user.email}</p>
                    </div>
                    <button className="font-bold text-blue">Reply</button>
                  </div>
                  <p className="body-2">{comment.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Feedback

export async function getServerSideProps(context) {
  const suggestion = await prisma.suggestion.findUnique({
    where: {
      id: +context.params.id,
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
    },
  })

  return {
    props: {
      suggestion: JSON.parse(JSON.stringify(suggestion)),
    },
  }
}
