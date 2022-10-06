import { getStatuses } from '@/lib/api'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import RoadmapNavbar from '@/components/Roadmap/RoadmapNavbar'
import RoadmapGrid from '@/components/Roadmap/RoadmapGrid'

const Roadmap = () => {
  return (
    <main className="min-h-screen bg-gray-light py-10">
      <RoadmapNavbar />
      <RoadmapGrid />
    </main>
  )
}

export default Roadmap

export async function getStaticProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['statuses'], getStatuses)

  return {
    props: {
      dehydrateState: dehydrate(queryClient),
    },
  }
}
