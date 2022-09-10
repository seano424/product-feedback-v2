import { dehydrate, QueryClient } from 'react-query'
import { getSuggestions } from 'lib/hooks/useGetSuggestions'
import TopDeck from '@/components/Headers/TopDeck'

import Suggestions from '@/components/Suggestions'
import type { GetServerSideProps } from 'next'
import Layout from '@/components/Layout'

const Home = () => {
  return (
    <Layout>
      <Suggestions />
      <Suggestions />
    </Layout>
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
