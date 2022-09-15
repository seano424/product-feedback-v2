import fetcher from 'lib/fetcher'

export const getCategories = async () => {
  return await fetcher('/categories')
}
