import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import toast, { Toaster } from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { createVote, deleteVote } from '@/lib/api'
import { SuggestionProps } from '@/lib/interfaces'
import { ArrowUp, ArrowDown } from '@/icons'

interface Props {
  viewport: 'large' | 'small'
  suggestion: SuggestionProps
}

const VoteButton = (props: Props) => {
  const { viewport = 'small', suggestion } = props
  const queryClient = useQueryClient()
  const { data: session, status } = useSession()
  const [hasVoted, setHasVoted] = useState(null)

  useEffect(() => {
    if (session) {
      setHasVoted(
        suggestion.votes.find((v) => v.user.email === session.user.email)
      )
    }
  }, [session, suggestion])

  const authenticated = status === 'authenticated'
  const small = viewport === 'small'

  const createMutation = useMutation(createVote, {
    onSuccess: () => {
      setHasVoted(true)
      queryClient.invalidateQueries(['suggestion', suggestion.id])
      queryClient.invalidateQueries(['suggestions'])
    },
  })

  const deleteMutation = useMutation(deleteVote, {
    onSuccess: () => {
      setHasVoted(false)
      queryClient.invalidateQueries(['suggestion', suggestion.id])
      queryClient.invalidateQueries(['suggestions'])
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
        className={clsx(
          'button-small items-center gap-2 hover:bg-opacity-80',
          hasVoted ? 'bg-fuschia text-white' : 'text-blue-navy',
          small ? 'flex lg:hidden' : 'hidden lg:flex'
        )}
      >
        {hasVoted ? <ArrowDown /> : <ArrowUp />}
        {suggestion.votes.length}
      </button>
    </>
  )
}

export default VoteButton
