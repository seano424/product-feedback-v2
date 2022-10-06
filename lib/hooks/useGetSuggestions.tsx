import { getSuggestions } from 'lib/api'
import { useQuery } from '@tanstack/react-query'

export const useGetSuggestions = () => {
  return useQuery(['suggestions'], getSuggestions)
}
