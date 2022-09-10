import fetcher from 'lib/fetcher'
import { useQuery } from 'react-query'

export const getCategories = async () => {
  return await fetcher('/categories')
}

export const useGetCategories = () => {
  return useQuery('cats', getCategories)
}
