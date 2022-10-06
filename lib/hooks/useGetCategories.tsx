import { getCategories } from 'lib/api'

import { useQuery } from '@tanstack/react-query'
export const useGetCategories = () => {
  return useQuery(['categories'], getCategories)
}
