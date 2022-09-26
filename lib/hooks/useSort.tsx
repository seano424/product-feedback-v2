import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { sortByState } from 'lib/atoms/sortByState'
import { categoriesState } from 'lib/atoms/categoriesState'

export const useSort = (data) => {
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
        setSortedData(
          [...filteredData].sort((a, b) => b.votes.length - a.votes.length)
        )
      leastUpvotes &&
        setSortedData(
          [...filteredData].sort((a, b) => a.votes.length - b.votes.length)
        )
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

    if (data) {
      sortData()
    }
  }, [sortType, filterType, data])
  return sortedData
}
