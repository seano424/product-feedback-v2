import { dehydrate, QueryClient } from 'react-query'
import { getSuggestions } from 'lib/hooks/useGetSuggestions'

import Suggestions from '@/components/Suggestions'
import type { GetServerSideProps } from 'next'

const Home = () => {
  return (
    <section className="wrapper h-screen">
      <Suggestions />
    </section>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('suggestions', getSuggestions)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
