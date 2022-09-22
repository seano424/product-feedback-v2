import { getCategories } from 'lib/api'

import { useQuery } from 'react-query'
export const useGetCategories = () => {
  return useQuery('categories', getCategories)
}
