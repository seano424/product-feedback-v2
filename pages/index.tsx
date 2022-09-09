import { useEffect } from 'react'
import prisma from 'lib/prisma'
import { categoriesState } from 'hooks/useCategories'
import { statusesState } from 'hooks/useStatuses'
import { useSetRecoilState } from 'recoil'
import ToolBar from '@/components/ToolBar'

const Home = ({ categories, statuses, suggestions }) => {
  const setCategoryState = useSetRecoilState(categoriesState)
  const setStatusesState = useSetRecoilState(statusesState)
  console.log(suggestions)

  useEffect(() => {
    setCategoryState(categories)
    setStatusesState(statuses)
  }, [categories, statuses])

  return (
    <div className="min-h-screen">
      <ToolBar />
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const categories = await prisma.category.findMany({})
  const statuses = await prisma.status.findMany({})
  const suggestions = await prisma.suggestion.findMany({})

  return {
    props: {
      categories,
      statuses,
      suggestions,
    },
  }
}
