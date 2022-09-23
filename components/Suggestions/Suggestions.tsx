import { useQuery } from 'react-query'
import { fakeSuggestions } from '@/lib/data'
import { useSort } from '@/lib/hooks/useSort'
import GhostSuggestion from './GhostSuggestion'
import Suggestion from './Suggestion'

const Suggestions = () => {
  const { data, isLoading } = useQuery(['suggestions'])
  const sortedData = useSort(data)

  if (isLoading)
    return (
      <div className="py-base container flex flex-col gap-5 xl:px-0">
        {fakeSuggestions.map((suggestion) => (
          <GhostSuggestion key={suggestion.id} />
        ))}
      </div>
    )

  return (
    <div className="py-base container flex flex-col gap-5 xl:px-0">
      {sortedData &&
        sortedData.map((suggestion) => (
          <Suggestion key={suggestion.id} data={suggestion} />
        ))}
    </div>
  )
}

export default Suggestions
