import { useEffect } from 'react'
import prisma from 'lib/prisma'
import { suggestionsState } from 'lib/hooks/useSuggestions'
import { useSetRecoilState } from 'recoil'
import Suggestions from '@/components/Suggestions'

const Home = ({ categories, statuses, suggestions }) => {
  const setSuggestionsState = useSetRecoilState(suggestionsState)

  useEffect(() => {
    setSuggestionsState(suggestions)
  }, [categories, statuses])

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
