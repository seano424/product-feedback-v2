import { useEffect } from 'react'
import prisma from 'lib/prisma'
import { categoriesState } from 'hooks/useCategories'
import { statusesState } from 'hooks/useStatuses'
import { suggestionsState } from 'hooks/useSuggestions'
import { useSetRecoilState } from 'recoil'
import ToolBar from '@/components/ToolBar'
import TopDeck from '@/components/TopDeck'

const Home = ({ categories, statuses, suggestions }) => {
  const setCategoryState = useSetRecoilState(categoriesState)
  const setStatusesState = useSetRecoilState(statusesState)
  const setSuggestionsState = useSetRecoilState(suggestionsState)

  useEffect(() => {
    setCategoryState(categories)
    setStatusesState(statuses)
    setSuggestionsState(suggestions)
  }, [categories, statuses])

  return (
    <>
      <TopDeck />
      <div className="container">hello</div>
    </>
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
  const suggestions = await prisma.suggestion.findMany({})

  return {
    props: {
      categories,
      statuses: JSON.parse(JSON.stringify(statuses)),
      suggestions: JSON.parse(JSON.stringify(suggestions)),
    },
  }
}
