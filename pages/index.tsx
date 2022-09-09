import { useEffect } from 'react'
import prisma from 'lib/prisma'
import { categoriesState } from 'hooks/useCategories'
import { statusesState } from 'hooks/useStatuses'
import { suggestionsState } from 'hooks/useSuggestions'
import { useSetRecoilState } from 'recoil'
import TopDeck from '@/components/TopDeck'
import Suggestions from '@/components/Suggestions'

const Home = ({ categories, statuses, suggestions }) => {
  const setCategoryState = useSetRecoilState(categoriesState)
  const setStatusesState = useSetRecoilState(statusesState)
  const setSuggestionsState = useSetRecoilState(suggestionsState)

  useEffect(() => {
    setCategoryState(categories)
    setStatusesState(statuses)
    setSuggestionsState(suggestions)
  }, [categories, statuses])

  console.log(suggestions)

  return (
    <section className="wrapper h-screen">
      <Suggestions />
    </section>
  )
}

export default Home

export const getServerSideProps = async () => {
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
    },
  })

  return {
    props: {
      categories,
      statuses: JSON.parse(JSON.stringify(statuses)),
      suggestions: JSON.parse(JSON.stringify(suggestions)),
    },
  }
}
