import { useState } from 'react'
import FeedbackNavbar from '@/components/Headers/FeedbackNavbar'
import Suggestion from '@/components/Feedback/Suggestion'
import Comments from '@/components/Feedback/Comments'
import FeedbackForm from '@/components/Feedback/FeedbackForm'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import { getSuggestion } from '@/lib/api'

const Feedback = ({ id }) => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { data: suggestion, isLoading } = useQuery(
    ['suggestion', id],
    getSuggestion
  )

  return (
    <main className="min-h-screen bg-gray-light py-10">
      <section className="container mx-auto flex max-w-4xl flex-col gap-5">
        {!isLoading && (
          <>
            {isFormOpen && (
              <div className="absolute inset-0 bg-gray-light py-10">
                <div className="container mx-auto flex max-w-4xl flex-col">
                  <FeedbackForm
                    suggestion={suggestion}
                    toggle={setIsFormOpen}
                  />
                </div>
              </div>
            )}
            <FeedbackNavbar toggle={setIsFormOpen} suggestion={suggestion} />
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
