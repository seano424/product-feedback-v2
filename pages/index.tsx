import { dehydrate, QueryClient } from '@tanstack/react-query'
import Layout from '@/components/Layout'
import Suggestions from '@/components/Feedback/Suggestions'
import { getSuggestions } from 'lib/api'

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
  await queryClient.prefetchQuery(['suggestions'], getSuggestions)

  return {
    props: {
      dehydrateState: dehydrate(queryClient),
    },
  }
}
