import fetcher from 'lib/fetcher'
import { useQuery } from 'react-query'

export const getStatuses = async () => {
  return await fetcher('/statuses')
}

export const useGetStatuses = () => {
  return useQuery('stats', getStatuses)
}
