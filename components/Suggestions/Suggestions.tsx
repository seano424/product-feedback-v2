import { fakeSuggestions } from 'lib/data'
import { useSort } from 'lib/hooks/useSort'
import GhostSuggestion from './GhostSuggestion'
import Suggestion from './Suggestion'

const Suggestions = (props) => {
  const { data, isLoading } = props
  const sortedData = useSort(data, isLoading)

  if (isLoading)
    return (
      <div className="py-base container flex flex-col gap-5 xl:px-0">
        {fakeSuggestions.map((suggestion) => (
          <GhostSuggestion key={suggestion.id} suggestion={suggestion} />
        ))}
      </div>
    )

  return (
    <div className="py-base container flex flex-col gap-5 xl:px-0">
      {sortedData &&
        sortedData.map((suggestion) => (
          <Suggestion key={suggestion.id} data={suggestion} loading={false} />
        ))}
    </div>
  )
}

export default Suggestions
