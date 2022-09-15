import Suggestions from '@/components/Suggestions/Suggestions'
import Layout from '@/components/Layout'
import prisma from 'lib/prisma'
import { useQuery } from 'react-query'
import { getSuggestions } from 'lib/hooks/useGetSuggestions'

const Home = (props) => {
  const suggestionQuery = useQuery('suggestions', getSuggestions, {
    initialData: props.suggestions,
  })

  return (
    <Layout>
      <Suggestions suggestionsQuery={suggestionQuery} />
    </Layout>
  )
}

export default Home

export async function getStaticProps() {
  const suggestions = await prisma.suggestion.findMany({
    include: {
      comments: true,
      category: true,
      status: true,
      votes: true,
    },
  })
  return { props: { suggestions: JSON.parse(JSON.stringify(suggestions)) } }
}
