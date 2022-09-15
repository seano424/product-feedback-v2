import fetcher from 'lib/fetcher'

export const deleteVote = async (voteId) => {
  return await fetcher('votes', voteId, 'DELETE')
}

export const createVote = async (suggestionId) => {
  return await fetcher('votes', suggestionId, 'POST')
}
