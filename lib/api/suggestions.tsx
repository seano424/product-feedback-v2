import fetcher from 'lib/fetcher'

export const getSuggestions = async () => {
  return await fetcher('/suggestions')
}
