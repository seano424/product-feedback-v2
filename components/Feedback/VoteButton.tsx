import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useSession } from 'next-auth/react'
import { createVote, deleteVote } from '@/lib/api'
import { SuggestionProps } from '@/lib/interfaces'
import { ArrowUp, ArrowDown } from '@/icons'
import { useQuery } from 'react-query'
import { getSuggestion } from '@/lib/api'
import toast, { Toaster } from 'react-hot-toast'

interface Props extends SuggestionProps {
  viewport: 'large' | 'small'
}

const VoteButton = (props: Props) => {
  const { viewport = 'small', suggestion } = props
  const queryClient = useQueryClient()
  const { data: session, status } = useSession()
  const [hasVoted, setHasVoted] = useState(null)
  const { data, status: queryStatus } = useQuery(
    ['suggestion', suggestion.id],
    getSuggestion
  )
  console.log(queryStatus)

  useEffect(() => {
    if (session) {
      setHasVoted(
        suggestion.votes.find((v) => v.user.email === session.user.email)
      )
    }
  }, [session, data])

  const authenticated = status === 'authenticated'
  const small = viewport === 'small'

  const createMutation = useMutation(createVote, {
    onSuccess: () => {
      setHasVoted(true)
      queryClient.invalidateQueries('suggestions')
      queryClient.invalidateQueries('suggestion')
    },
  })

  const deleteMutation = useMutation(deleteVote, {
    onSuccess: () => {
      setHasVoted(false)
      queryClient.invalidateQueries('suggestions')
      queryClient.invalidateQueries('suggestion')
    },
  })

  const handleVoteClick = async (e) => {
    e.stopPropagation()
    if (authenticated) {
      if (hasVoted) {
        return deleteMutation.mutate({ voteId: hasVoted.id })
      }
      return createMutation.mutate({
        suggestionId: suggestion.id,
      })
    }
    toast('Please sign in to vote 🫶')
  }

  return (
    <>
      <Toaster />
      <button
        onClick={handleVoteClick}
        className={`button-small items-center gap-2 hover:bg-opacity-80 ${
          small ? 'flex lg:hidden' : 'hidden lg:flex'
        }
        ${hasVoted ? 'bg-fuschia text-white' : 'text-blue-navy'}
        `}
      >
        {hasVoted ? <ArrowDown /> : <ArrowUp />}
        {suggestion.votes.length}
      </button>
    </>
  )
}

export default VoteButton
