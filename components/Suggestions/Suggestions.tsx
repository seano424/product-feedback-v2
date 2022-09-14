import { useGetSuggestions } from 'lib/hooks/useGetSuggestions'
import Suggestion from './Suggestion'
import { suggestions } from 'lib/data'
import { useRecoilValue } from 'recoil'
import { sortByState } from 'lib/atoms/sortByState'
import { categoriesState } from 'lib/atoms/categoriesState'
import { useEffect, useState } from 'react'
import GhostSuggestion from './GhostSuggestion'

const Suggestions = () => {
  const { data, isLoading } = useGetSuggestions()
  const sortType = useRecoilValue(sortByState)
  const filterType = useRecoilValue(categoriesState)
  const [sortedData, setSortedData] = useState([])

  useEffect(() => {
    const mostUpvotes = sortType === 'most-upvotes'
    const leastUpvotes = sortType === 'least-upvotes'
    const mostComments = sortType === 'most-comments'
    const leastComments = sortType === 'least-comments'

    const sortData = async () => {
      const filteredData =
        filterType === 'all'
          ? data
          : data.filter((d) => d.category.type === filterType)

      mostUpvotes &&
        setSortedData([...filteredData].sort((a, b) => b.votes - a.votes))
      leastUpvotes &&
        setSortedData([...filteredData].sort((a, b) => a.votes - b.votes))
      mostComments &&
        setSortedData(
          [...filteredData].sort(
            (a, b) => b.comments.length - a.comments.length
          )
        )
      leastComments &&
        setSortedData(
          [...filteredData].sort(
            (a, b) => a.comments.length - b.comments.length
          )
        )
    }

    if (!isLoading && data) {
      sortData()
    }
  }, [sortType, filterType, isLoading, data])

  return (
    <div className="py-base container flex flex-col gap-5 xl:px-0">
      {isLoading
        ? suggestions.map((suggestion) => (
            <GhostSuggestion key={suggestion.id} suggestion={suggestion} />
          ))
        : sortedData &&
          sortedData.map((suggestion) => (
            <Suggestion
              key={suggestion.id}
              suggestion={suggestion}
              loading={false}
            />
          ))}
    </div>
  )
}

export default Suggestions
