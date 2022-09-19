import Suggestions from '@/components/Suggestions/Suggestions'
import Layout from '@/components/Layout'
import { PrismaClient } from '@prisma/client'
import { useQuery } from 'react-query'
import { getSuggestions } from 'lib/api/suggestions'

const Home = (props) => {
  const { suggestions } = props
  const { data, isLoading } = useQuery(['suggestions'], getSuggestions, {
    initialData: suggestions,
  })

  return (
    <Layout>
      <Suggestions data={data} isLoading={isLoading} />
    </Layout>
  )
}

export default Home

export async function getStaticProps() {
  const prisma = new PrismaClient()
  const suggestions = await prisma.suggestion.findMany({
    include: {
      comments: true,
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
      suggestions: JSON.parse(JSON.stringify(suggestions)),
    },
  }
}
