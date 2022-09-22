import { getStatuses } from 'lib/api'
import { useQuery } from 'react-query'

export const useGetStatuses = () => {
  return useQuery('statuses', getStatuses)
}
