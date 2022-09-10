import { useGetSuggestions } from 'lib/hooks/useGetSuggestions'
import Suggestion from './Suggestion'
import { suggestions } from 'lib/data'

const Suggestions = () => {
  const { data, isLoading } = useGetSuggestions()
  console.log(isLoading)

  isLoading &&
    suggestions.map((suggestion) => <Suggestion suggestion={suggestion} />)

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
