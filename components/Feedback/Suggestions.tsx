import { fakeSuggestions } from '@/lib/data'
import GhostSuggestion from './GhostSuggestion'
import Suggestion from './Suggestion'
import { SuggestionProps } from '@/lib/interfaces'

interface Props {
  data: SuggestionProps[]
  isLoading: boolean
}

const Suggestions = (props: Props) => {
  const { isLoading, data } = props

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
      {data &&
        data.map((suggestion) => (
          <Suggestion key={suggestion.id} suggestion={suggestion} />
        ))}
    </div>
  )
}

export default Suggestions
