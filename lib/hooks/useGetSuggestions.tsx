import { getSuggestions } from 'lib/api'
import { useQuery } from 'react-query'

export const useGetSuggestions = () => {
  return useQuery(['suggestions'], getSuggestions)
}
