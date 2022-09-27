import prisma from '@/lib/prisma'
import { SuggestionProps } from '@/lib/interfaces'
import FeedbackNavbar from '@/components/Headers/FeedbackNavbar'
import Suggestion from '@/components/Feedback/Suggestion'
import Comments from '@/components/Feedback/Comments'

const Feedback = (props: SuggestionProps) => {
  const { suggestion } = props
  console.log(suggestion)

  return (
    <main className="min-h-screen bg-gray-light py-10">
      <section className="container mx-auto flex max-w-4xl flex-col gap-5">
        <FeedbackNavbar />
        <Suggestion suggestion={suggestion} />
        <Comments comments={suggestion.comments} />
      </section>
    </main>
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
