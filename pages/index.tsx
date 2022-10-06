import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import Suggestions from '@/components/Feedback/Suggestions'
import Layout from '@/components/Layout'
import { getSuggestions } from 'lib/api'

const Home = () => {
  const { data } = useQuery(['suggestions'], getSuggestions)
  console.log('Data: ', data)

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
