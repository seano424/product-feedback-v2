import fetcher from 'lib/fetcher'

export const deleteVote = async (voteId) => {
  console.log('deleting: ', voteId)

  return await fetcher('votes', voteId, 'DELETE')
}

export const createVote = async (suggestionId) => {
  console.log('creating...', suggestionId)
  return await fetcher('votes', suggestionId, 'POST')
}
