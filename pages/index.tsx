import { FC } from 'react'
import Suggestions from '@/components/Feedback/Suggestions'
import Layout from '@/components/Layout'
import { PrismaClient } from '@prisma/client'
import { useQuery } from 'react-query'
import { getCategories, getStatuses, getSuggestions } from 'lib/api'
import { SuggestionProps, CategoryProps, StatusProps } from '@/lib/interfaces'

interface Props {
  suggestions: SuggestionProps[]
  categories: CategoryProps[]
  statuses: StatusProps[]
}

const Home: FC<Props> = ({ suggestions, categories, statuses }: Props) => {
  useQuery(['suggestions'], getSuggestions, {
    initialData: suggestions,
  })
  useQuery(['categories'], getCategories, {
    initialData: categories,
  })
  useQuery(['statuses'], getStatuses, {
    initialData: statuses,
  })

  return (
    <Layout>
      <Suggestions />
    </Layout>
  )
}

export default Home

export async function getServerSideProps() {
  const prisma = new PrismaClient()
  const categories = await prisma.category.findMany({})
  const statuses = await prisma.status.findMany({
    include: {
      suggestions: true,
    },
  })
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
      categories: JSON.parse(JSON.stringify(categories)),
      statuses: JSON.parse(JSON.stringify(statuses)),
    },
  }
}
