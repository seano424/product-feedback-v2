import fetcher from 'lib/fetcher'

export const getCategories = async () => {
  return await fetcher('/categories')
}

export const getStatuses = async () => {
  return await fetcher('/statuses')
}

export const getSuggestions = async () => {
  return await fetcher('/suggestions')
}

export const deleteVote = async (param) => {
  return await fetcher(`votes/${param.voteId}`, param, 'DELETE')
}

export const createVote = async (param) => {
  return await fetcher('votes', param, 'POST')
}

export const createComment = async (param) => {
  return await fetcher('comment', param, 'POST')
}

export const createReply = async (param) => {
  return await fetcher('reply', param, 'POST')
}
