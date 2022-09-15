import { getSuggestions } from 'lib/api/suggestions'
import { useQuery } from 'react-query'

export const useGetSuggestions = () => {
  return useQuery('suggestions', getSuggestions)
}
