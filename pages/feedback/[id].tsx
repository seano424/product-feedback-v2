import Link from 'next/link'
import { ArrowLeft } from '@/icons'
import Suggestion from '@/components/Feedback/Suggestion'
import { SuggestionProps } from '@/lib/interfaces'
import prisma from '@/lib/prisma'
import Image from 'next/image'

const Feedback = (props: SuggestionProps) => {
  console.log(props)
  const { suggestion } = props
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
                className="grid grid-cols-12 gap-5 border-b-2 border-gray-light py-5"
              >
                <div className="relative col-span-1 h-full w-12">
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
                  {comment.replies.length > 0 && (
                    <div className="absolute top-[54px] bottom-0 left-1/2 w-[2px] -translate-x-1/2 transform bg-gray-light"></div>
                  )}
                </div>
                <div className="col-span-11 col-start-3 md:col-start-2">
                  {/* Comment */}
                  <div className="flex flex-1 flex-col gap-5 pb-5">
                    <div className="flex w-full flex-row justify-between md:items-end">
                      <div className="flex flex-col gap-1">
                        <p className="h4">{comment.user.name}</p>
                        <p className="body-2 lowercase">
                          @{comment.user.username}
                        </p>
                      </div>
                      <button className="font-bold text-blue">Reply</button>
                    </div>
                    <p className="body-2">{comment.body}</p>
                  </div>

                  {/* Replies */}
                  {comment.replies &&
                    comment.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="grid grid-cols-12 gap-5 py-5"
                      >
                        <div className="col-span-1 h-12 w-12 md:h-full md:w-full">
                          <Image
                            className="rounded-full"
                            src={
                              reply.user.image ??
                              'https://unsplash.com/photos/mEZ3PoFGs_k'
                            }
                            alt="Avatar"
                            height={50}
                            width={50}
                          />
                        </div>
                        <div className="col-span-11 col-start-3 md:col-start-2">
                          <div className="flex flex-1 flex-col gap-5">
                            <div className="flex w-full items-end justify-between">
                              <div className="flex flex-col gap-1">
                                <p className="h4">{reply.user.name}</p>
                                <p className="body-2 lowercase">
                                  @{reply.user.username}
                                </p>
                              </div>
                              <button className="font-bold text-blue">
                                Reply
                              </button>
                            </div>
                            <p className="body-2">
                              <span className="font-bold text-fuschia">
                                @{comment.user.username}
                              </span>{' '}
                              {reply.body}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
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
