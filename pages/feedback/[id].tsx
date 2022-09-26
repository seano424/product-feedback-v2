import Link from 'next/link'
import { ArrowLeft } from '@/icons'
import Suggestion from '@/components/Feedback/Suggestion'
import { SuggestionProps } from '@/lib/interfaces'
import prisma from '@/lib/prisma'

const Feedback = (props: SuggestionProps) => {
  console.log(props)
  const { suggestion } = props

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
        <div className="flex w-full cursor-pointer items-center justify-between rounded-xl bg-white/80 p-5 shadow-xl">
          <h3 className="h3">
            {suggestion.comments.length && suggestion.comments.length === 1
              ? '1 Comment'
              : suggestion.comments.length + ' Comments'}
          </h3>
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
      comments: true,
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
