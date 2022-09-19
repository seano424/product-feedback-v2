import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { ArrowUp, Comments, ArrowDown } from '../../public/icons'
import { useSetRecoilState } from 'recoil'
import { categoriesState } from 'lib/atoms/categoriesState'
import { createVote, deleteVote } from 'lib/api/votes'
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
  loading: boolean
}

const Suggestion = (props: Props) => {
  const { data: suggestion, loading } = props
  const [clicked, setClicked] = useState(false)
  const [voted, setVoted] = useState(null)
  const queryClient = useQueryClient()

  const setCategory = useSetRecoilState(categoriesState)
  const { data: session, status } = useSession()

  const authenticated = status === 'authenticated'

  const createVoteMutation = useMutation(
    (param: {}): Promise<number> => {
      return createVote(param)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['suggestions'])
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
      },
    }
  )

  useEffect(() => {
    setVoted(
      suggestion.votes.find((v) => v.user.email === session?.user?.email)
        ? true
        : false
    )
  }, [createVoteMutation])

  const handleSuggestionClick = () => {
    console.log('clicked suggestion')
  }

  const handleVoteClick = async (e) => {
    e.stopPropagation()
    if (authenticated) {
      const hasVoted = await suggestion.votes.find(
        (v) => v.user.email === session?.user?.email
      )
      if (hasVoted) {
        console.log('deleting...')
        deleteVoteMutation.mutate({ voteId: hasVoted.id })
      }
      if (!hasVoted) {
        console.log('adding...')
        createVoteMutation.mutate({ suggestionId: suggestion.id })
      }
    }
  }

  const handleCategoryClick = (e) => {
    e.stopPropagation()
    setCategory(clicked ? 'all' : suggestion.category.type)
    setClicked((state) => !state)
  }

  return (
    <section>
      {createVoteMutation.isSuccess ? <div>Todo added!</div> : null}

      <div
        onClick={handleSuggestionClick}
        className="flex w-full cursor-pointer items-center justify-between rounded-xl bg-white/80 p-5 shadow-xl"
      >
        <div className="flex w-full items-center gap-10">
          <button
            disabled={
              createVoteMutation.isLoading || deleteVoteMutation.isLoading
            }
            onClick={handleVoteClick}
            className={`button-small hidden items-center gap-2 text-blue-navy hover:bg-opacity-80 lg:flex ${
              voted && 'bg-fuschia text-white'
            } ${createVoteMutation.isLoading && 'opacity-50'} ${
              deleteVoteMutation.isLoading && 'opacity-50'
            }`}
          >
            {voted ? <ArrowDown /> : <ArrowUp />}
            {suggestion.votes.length}
          </button>
          <div className="flex w-full flex-col items-start gap-3">
            <p className="h3">{suggestion.title}</p>
            <p className="body-1 text-gray">{suggestion.description}</p>
            <button
              disabled={loading}
              onClick={handleCategoryClick}
              className="button-small"
            >
              {suggestion.category?.name ?? 'UI'}
            </button>
            <div className="flex w-full items-center justify-between lg:hidden">
              <button
                disabled={
                  createVoteMutation.isLoading || deleteVoteMutation.isLoading
                }
                onClick={handleVoteClick}
                className={`button-small flex items-center gap-2 text-blue-navy hover:bg-opacity-80 ${
                  voted && 'bg-fuschia text-white'
                } ${createVoteMutation.isLoading && 'opacity-50'} ${
                  deleteVoteMutation.isLoading && 'opacity-50'
                }`}
              >
                {voted ? <ArrowDown /> : <ArrowUp />}
                {suggestion.votes.length}
              </button>
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
