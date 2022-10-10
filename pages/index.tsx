import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import Layout from '@/components/Layout'
import Suggestions from '@/components/Feedback/Suggestions'
import { useSort } from '@/lib/hooks/useSort'
import { getSuggestions } from 'lib/api'

const Home = () => {
  const { data, isLoading } = useQuery(['suggestions'], getSuggestions)
  const suggestions = useSort(data)

  return (
    <Layout>
      <Suggestions data={suggestions} isLoading={isLoading} />
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
