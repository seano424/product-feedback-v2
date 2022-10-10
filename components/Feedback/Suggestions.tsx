import { fakeSuggestions } from '@/lib/data'
import GhostSuggestion from './GhostSuggestion'
import Suggestion from './Suggestion'
import { useQuery } from '@tanstack/react-query'
import { useSort } from '@/lib/hooks/useSort'
import { getSuggestions } from '@/lib/api'

const Suggestions = () => {
  const { data, isLoading } = useQuery(['suggestions'], getSuggestions)
  const suggestions = useSort(data)

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
      {suggestions &&
        suggestions.map((suggestion) => (
          <Suggestion key={suggestion.id} suggestion={suggestion} />
        ))}
    </div>
  )
}

export default Suggestions
