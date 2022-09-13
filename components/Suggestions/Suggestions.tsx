import { useGetSuggestions } from 'lib/hooks/useGetSuggestions'
import Suggestion from './Suggestion'
import { suggestions } from 'lib/data'
import { useRecoilState, useRecoilValue } from 'recoil'
import { sortByState } from 'lib/sortBy'
import { useEffect, useState } from 'react'

const Suggestions = () => {
  const { data, isLoading } = useGetSuggestions()
  const sortType = useRecoilValue(sortByState)
  const [sortedData, setSortedData] = useState([])

  useEffect(() => {
    if (!isLoading && data) {
      const mostUpvotes = sortType === 'most-upvotes'
      const leastUpvotes = sortType === 'least-upvotes'
      const mostComments = sortType === 'most-comments'
      const leastComments = sortType === 'least-comments'
      mostUpvotes && setSortedData([...data].sort((a, b) => b.votes - a.votes))
      leastUpvotes && setSortedData([...data].sort((a, b) => a.votes - b.votes))
      mostComments &&
        setSortedData(
          [...data].sort((a, b) => b.comments.length - a.comments.length)
        )
      leastComments &&
        setSortedData(
          [...data].sort((a, b) => a.comments.length - b.comments.length)
        )
    }
  }, [sortType])

  return (
    <div className="py-base container flex flex-col gap-5 xl:px-0">
      {isLoading
        ? suggestions.map((suggestion) => (
            <Suggestion key={suggestion.id} suggestion={suggestion} loading />
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
