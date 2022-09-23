import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { ArrowUp, Comments, ArrowDown } from '../../public/icons'
import { useSetRecoilState } from 'recoil'
import { categoriesState } from 'lib/atoms/categoriesState'
import { createVote, deleteVote } from 'lib/api'
import { useMutation, useQueryClient } from 'react-query'

interface Props {
  data: {
    votes: {
      id?: number
      userId?: number
      user?: {
        email: string
      }
    }[]
    id: number
    title: string
    description: string
    category?: {
      name: string
      type: string
    }
    comments?: []
  }
}

const Suggestion = (props: Props) => {
  const { data: suggestion } = props
  const queryClient = useQueryClient()
  const setCategory = useSetRecoilState(categoriesState)
  const { data: session, status } = useSession()
  const authenticated = status === 'authenticated'

  const [clicked, setClicked] = useState(false)
  const [voteCount, setVoteCount] = useState(suggestion.votes.length)
  const [voted, setVoted] = useState(false)

  useEffect(() => {
    if (session?.user) {
      setVoted(
        suggestion.votes.some((v) => v.user.email === session.user.email)
      )
    }
  }, [session])

  const createVoteMutation = useMutation(
    (param: {}): Promise<number> => {
      return createVote(param)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['suggestions'])
        console.log('success!')
      },
    }
  )

  const deleteVoteMutation = useMutation(
    (param: {}): Promise<number> => {
      return deleteVote(param)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['suggestions'])
        console.log('woohoo')
      },
    }
  )

  const handleSuggestionClick = () => {
    console.log('clicked suggestion')
  }

  const handleCategoryClick = (e) => {
    e.stopPropagation()
    setCategory(clicked ? 'all' : suggestion.category.type)
    setClicked((state) => !state)
  }

  const handleVoteClick = async (e) => {
    e.stopPropagation()
    if (authenticated) {
      const hasVoted = await suggestion.votes.find(
        (v) => v.user.email === session?.user?.email
      )
      if (hasVoted) {
        console.log('deleting...')
        setVoted(false)
        setVoteCount((prev) => prev - 1)
        deleteVoteMutation.mutate({ voteId: hasVoted.id })
      }
      if (!hasVoted) {
        console.log('adding...')
        setVoted(true)
        setVoteCount((prev) => prev + 1)
        createVoteMutation.mutate({ suggestionId: suggestion.id })
      }
    }
  }

  const VoteButton = (props) => {
    const { viewport = 'small' } = props
    const small = viewport === 'small'
    return (
      <button
        disabled={createVoteMutation.isLoading || deleteVoteMutation.isLoading}
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

  return (
    <section>
      <div
        onClick={handleSuggestionClick}
        className="flex w-full cursor-pointer items-center justify-between rounded-xl bg-white/80 p-5 shadow-xl"
      >
        <div className="flex w-full items-center gap-10">
          <VoteButton viewport="large" />
          <div className="flex w-full flex-col items-start gap-3">
            <p className="h3">{suggestion.title}</p>
            <p className="body-1 text-gray">{suggestion.description}</p>
            <button
              disabled={
                createVoteMutation.isLoading || deleteVoteMutation.isLoading
              }
              onClick={handleCategoryClick}
              className="button-small"
            >
              {suggestion.category?.name ?? 'UI'}
            </button>
            <div className="flex w-full items-center justify-between lg:hidden">
              <VoteButton viewport="small" />
              <div className="flex items-center gap-3 text-lg">
                <Comments />
                {suggestion.comments?.length ?? '100'}
              </div>
            </div>
          </div>
        </div>
        <div className="hidden items-center gap-3 text-lg lg:flex">
          <Comments />
          {suggestion.comments?.length ?? '88'}
        </div>
      </div>
    </section>
  )
}

export default Suggestion
