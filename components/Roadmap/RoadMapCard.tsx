import Link from 'next/link'
import { useGetStatuses } from '@/lib/hooks/useGetStatuses'

const fakeStats = [
  {
    type: 'planned',
    name: 'Planned',
  },
  {
    type: 'in-progress',
    name: 'In-Progress',
  },
  {
    type: 'live',
    name: 'Live',
  },
]

const RoadmapCard = () => {
  const { data: stats, isLoading } = useGetStatuses()

  return (
    <div
      className={`flex h-full flex-col gap-10 rounded-[10px] bg-white p-5 lg:gap-4 ${
        isLoading && 'opacity-40'
      }`}
    >
      <div className="flex justify-between">
        <h2 className="h2">Roadmap</h2>
        <Link href="/roadmap">
          <a className="body-1 text-blue underline underline-offset-1">View</a>
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {isLoading
          ? fakeStats.map((status, i) => (
              <div
                key={status.type}
                className="flex animate-pulse justify-between"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`h-2 w-2 animate-pulse rounded-full ${
                      i === 0 && 'bg-orange'
                    }
                      ${i === 1 && 'bg-purple-500'} ${
                      i === 2 && 'bg-teal-400'
                    }`}
                  ></div>
                  <p>{status.name}</p>
                </div>
                <p className="body-1 animate-pulse">2</p>
              </div>
            ))
          : stats.map((status, i) => (
              <div key={status.type} className="flex justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`h-2 w-2 rounded-full ${i === 0 && 'bg-orange'}
                      ${i === 1 && 'bg-purple-500'} ${
                      i === 2 && 'bg-teal-400'
                    }`}
                  ></div>
                  <p>{status.name}</p>
                </div>
                <p className="body-1">{status.suggestions.length}</p>
              </div>
            ))}
      </div>
    </div>
  )
}

export default RoadmapCard
