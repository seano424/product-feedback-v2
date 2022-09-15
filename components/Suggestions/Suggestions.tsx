import { useRecoilValue } from 'recoil'
import { sortByState } from 'lib/atoms/sortByState'
import { categoriesState } from 'lib/atoms/categoriesState'
import { fakeSuggestions } from 'lib/data'
import Suggestion from './Suggestion'
import GhostSuggestion from './GhostSuggestion'
import { useSort } from 'lib/hooks/useSort'
import { useGetSuggestions } from 'lib/hooks/useGetSuggestions'

const Suggestions = () => {
  const { data, isLoading } = useGetSuggestions()
  console.log('data', data)

  const sortType = useRecoilValue(sortByState)
  const filterType = useRecoilValue(categoriesState)
  const sortedData = useSort(sortType, filterType, data, isLoading)

  return (
    <div className="py-base container flex flex-col gap-5 xl:px-0">
      {isLoading
        ? fakeSuggestions.map((suggestion) => (
            <GhostSuggestion key={suggestion.id} suggestion={suggestion} />
          ))
        : sortedData &&
          sortedData.map((suggestion) => (
            <Suggestion key={suggestion.id} data={suggestion} loading={false} />
          ))}
    </div>
  )
}

export default Suggestions
