import fetcher from 'lib/fetcher'
import { useQuery } from 'react-query'

export const getSuggestions = async () => {
  return await fetcher('/suggestions')
}

export const useGetSuggestions = () => {
  return useQuery('suggestions', getSuggestions)
}
