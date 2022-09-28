import { dehydrate, QueryClient } from 'react-query'

import Suggestions from '@/components/Feedback/Suggestions'
import Layout from '@/components/Layout'
import { getCategories, getStatuses, getSuggestions } from 'lib/api'

const Home = () => {
  return (
    <Layout>
      <Suggestions />
    </Layout>
  )
}

export default Home

export async function getStaticProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['categories'], getCategories)
  await queryClient.prefetchQuery(['statuses'], getStatuses)
  await queryClient.prefetchQuery(['suggestions'], getSuggestions)

  return {
    props: {
      dehydrateState: dehydrate(queryClient),
    },
  }
}
