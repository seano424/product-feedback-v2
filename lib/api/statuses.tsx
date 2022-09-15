import fetcher from 'lib/fetcher'

export const getStatuses = async () => {
  return await fetcher('/statuses')
}
