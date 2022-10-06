import { getStatuses } from 'lib/api'
import { StatusProps } from '@/lib/interfaces'
import { useQuery } from '@tanstack/react-query'

export const useGetStatuses = () => {
  return useQuery<StatusProps[]>(['statuses'], getStatuses)
}
