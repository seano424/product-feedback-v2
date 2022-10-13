import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { sortByState } from 'lib/atoms/sortByState'
import { categoriesState } from 'lib/atoms/categoriesState'
import { SuggestionProps } from '../interfaces'
import { sort, select } from 'radash'

export const useSort = (data: SuggestionProps[]) => {
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
          : select(
              data,
              (d) => d,
              (d) => d.category.type === filterType
            )
      mostUpvotes &&
        setSortedData(sort([...filteredData], (f) => f.votes.length, true))
      leastUpvotes &&
        setSortedData(sort([...filteredData], (f) => f.votes.length))
      mostComments &&
        setSortedData(sort([...filteredData], (f) => f.comments.length, true))
      leastComments &&
        setSortedData(sort([...filteredData], (f) => f.comments.length))
    }

    if (data) {
      sortData()
    }
  }, [sortType, filterType, data])

  return sortedData
}
