import { getCategories } from 'lib/api/categories'

import { useQuery } from 'react-query'
export const useGetCategories = () => {
  return useQuery('cats', getCategories)
}
