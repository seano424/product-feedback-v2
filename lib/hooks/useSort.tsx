import { useEffect, useState } from 'react'

export const useSort = (sortType, filterType, data, isLoading) => {
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

    if (!isLoading && data) {
      sortData()
    }
  }, [sortType, filterType, isLoading, data])
  return sortedData
}
