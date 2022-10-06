import fetcher from 'lib/fetcher'

export const getCategories = async () => {
  return await fetcher('/categories')
}

export const getStatuses = async () => {
  return await fetcher('/statuses')
}

export const getSuggestion = async (body) => {
  const suggestionId = body.queryKey[1]
  return await fetcher(`/suggestions/${suggestionId}`)
}

export const getSuggestions = async () => {
  return await fetcher('/suggestions')
}

export const deleteSuggestion = async (body) => {
  return await fetcher(`suggestions/${body.suggestionId}`, body, 'DELETE')
}

export const deleteVote = async (body) => {
  return await fetcher(`votes/${body.voteId}`, body, 'DELETE')
}

export const deleteReply = async (body) => {
  return await fetcher(`replies/${body.replyId}`, body, 'DELETE')
}

export const deleteComment = async (body) => {
  return await fetcher(`comments/${body.commentId}`, body, 'DELETE')
}

export const updateReply = async (body) => {
  return await fetcher(`replies/${body.replyId}`, body, 'PATCH')
}

export const updateComment = async (body) => {
  return await fetcher(`comments/${body.commentId}`, body, 'PATCH')
}

export const createSuggestion = async (body) => {
  return await fetcher('suggestions', body, 'POST')
}

export const createVote = async (body) => {
  return await fetcher('votes', body, 'POST')
}

export const createComment = async (body) => {
  return await fetcher('comments', body, 'POST')
}

export const createReply = async (body) => {
  return await fetcher('reply', body, 'POST')
}
