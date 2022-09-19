import fetcher from 'lib/fetcher'

export const deleteVote = async (param) => {
  return await fetcher(`votes/${param.voteId}`, param, 'DELETE')
}

export const createVote = async (param) => {
  return await fetcher('votes', param, 'POST')
}
