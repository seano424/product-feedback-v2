import { getStatuses } from 'lib/api/statuses'
import { useQuery } from 'react-query'

export const useGetStatuses = () => {
  return useQuery('stats', getStatuses)
}
