import FeedbackNavbar from '@/components/Headers/FeedbackNavbar'
import Suggestion from '@/components/Feedback/Suggestion'
import Comments from '@/components/Feedback/Comments'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import { getSuggestion } from '@/lib/api'

const Feedback = ({ id }) => {
  const { data: suggestion, isLoading } = useQuery(
    ['suggestion', id],
    getSuggestion
  )

  return (
    <main className="min-h-screen bg-gray-light py-10">
      <section className="container mx-auto flex max-w-4xl flex-col gap-5">
        {!isLoading && (
          <>
            <FeedbackNavbar user={suggestion.user} />
            <Suggestion suggestion={suggestion} />
            <Comments comments={suggestion.comments} />
          </>
        )}
      </section>
    </main>
  )
}

export default Feedback

export async function getServerSideProps(context) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(
    ['suggestion', +context.params.id],
    getSuggestion
  )

  return {
    props: {
      id: +context.params.id,
      dehydrateState: dehydrate(queryClient),
    },
  }
}
