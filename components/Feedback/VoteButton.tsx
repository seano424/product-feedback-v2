import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useSession } from 'next-auth/react'
import { createVote, deleteVote } from '@/lib/api'
import { SuggestionProps } from '@/lib/interfaces'
import { ArrowUp, ArrowDown } from '@/icons'

interface Props extends SuggestionProps {
  viewport: string
}

interface MutationProps {
  type: string
  voteId?: number
  suggestionId?: number
}

const VoteButton = (props: Props) => {
  const { viewport = 'small', suggestion } = props
  const [voteCount, setVoteCount] = useState(suggestion.votes.length)
  const [voted, setVoted] = useState(false)
  const { data: session, status } = useSession()
  const queryClient = useQueryClient()

  const authenticated = status === 'authenticated'

  useEffect(() => {
    if (session?.user) {
      setVoted(
        suggestion.votes.some((v) => v.user.email === session.user.email)
      )
    }
  }, [session])

  const mutation = useMutation(
    (param: MutationProps): Promise<number> => {
      if (param.type === 'create') {
        return createVote(param)
      }
      return deleteVote(param)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['suggestions'])
      },
    }
  )

  const small = viewport === 'small'
  const handleVoteClick = async (e) => {
    e.stopPropagation()
    if (authenticated) {
      if (voted && !mutation.isLoading) {
        const vote = await suggestion.votes.find(
          (v) => v.user.email === session?.user?.email
        )
        console.log('deleting...')
        setVoted(false)
        setVoteCount((prev) => prev - 1)
        mutation.mutate({ voteId: vote.id, type: 'delete' })
      }
      if (!voted && !mutation.isLoading) {
        console.log('adding...')
        setVoted(true)
        setVoteCount((prev) => prev + 1)
        mutation.mutate({
          suggestionId: suggestion.id,
          type: 'create',
        })
      }
    }
  }
  return (
    <button
      disabled={mutation.isLoading}
      onClick={handleVoteClick}
      className={`button-small items-center gap-2 hover:bg-opacity-80 ${
        voted ? 'bg-fuschia text-white' : 'text-blue-navy'
      } ${small ? 'flex lg:hidden' : 'hidden lg:flex'}`}
    >
      {voted ? <ArrowDown /> : <ArrowUp />}
      {voteCount}
    </button>
  )
}

export default VoteButton
