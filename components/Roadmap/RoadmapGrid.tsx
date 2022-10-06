import clsx from 'clsx'
import { Comments } from '@/icons'
import { useGetStatuses } from '@/lib/hooks/useGetStatuses'
import VoteButton from '@/components/Feedback/VoteButton'

const descriptions = {
  'In-Progress': 'Currently being developed',
  Planned: 'Ideas prioritized for research',
  Live: 'Released features',
}

const RoadmapGrid = () => {
  const { data: statuses } = useGetStatuses()
  return (
    <section className="container mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-5 lg:grid-cols-3">
      {statuses &&
        statuses.map((status, i) => (
          <div key={status.name} className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex flex-col gap-2">
              <h4 className="h4">
                {status.name} ({status.suggestions.length})
              </h4>
              <p className="body-2">{descriptions[status.name]}</p>
            </div>

            {/* Cards */}
            {status.suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className={clsx(
                  'flex flex-col gap-3 rounded border-t-8 bg-white p-5',
                  i === 0 && 'border-orange',
                  i === 1 && 'border-fuschia',
                  i === 2 && 'border-blue-light'
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={clsx(
                      'h-2 w-2 rounded-full',
                      i === 0 && 'bg-orange',
                      i === 1 && 'bg-fuschia',
                      i === 2 && 'bg-blue-light'
                    )}
                  />
                  <p className="body-2">{status.name}</p>
                </div>
                <h4 className="h4">{suggestion.title}</h4>
                <p className="body-2">{suggestion.description}</p>
                <button className="button-small">
                  {suggestion.category.name}
                </button>
                <div className="flex items-center justify-between">
                  <VoteButton id={suggestion.id} viewport="small" />
                  <div className="flex items-center gap-2">
                    <Comments />
                    {suggestion.comments.length}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
    </section>
  )
}

export default RoadmapGrid
