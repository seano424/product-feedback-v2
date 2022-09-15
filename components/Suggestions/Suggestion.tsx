import prisma from 'lib/prisma'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { ArrowUp, Comments } from '../../public/icons'
import { useSetRecoilState } from 'recoil'
import { categoriesState } from 'lib/atoms/categoriesState'
import { createVote, deleteVote } from 'lib/api/votes'

interface Props {
  suggestion: {
    votes: {
      id: number
      userId: number
      user: {
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
  const { suggestion, loading } = props
  const [clicked, setClicked] = useState(false)
  const setCategory = useSetRecoilState(categoriesState)
  const [voted, setVoted] = useState(false)
  const { data: session, status } = useSession()
  const authenticated = status === 'authenticated'

  const handleSuggestionClick = () => {
    console.log('clicked suggestion')
  }

  const handleVoteClick = (e) => {
    e.stopPropagation()
    !authenticated && console.log('Sign in to upvote')
    authenticated && console.log(session.user.email)
    console.log(suggestion.votes[0].user.email)
    if (authenticated) {
      const hasVoted = suggestion.votes.find(
        (vote) => vote.user.email === session.user.email
      )
      hasVoted && console.log('has voted', hasVoted)
      !hasVoted && console.log('hasNotVoted', suggestion.votes)
      if (hasVoted) {
        deleteVote({ voteId: hasVoted.id })
      }
      if (!hasVoted) {
        createVote({ suggestionId: suggestion.id })
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
      <div
        onClick={handleSuggestionClick}
        className="flex w-full cursor-pointer items-center justify-between rounded-xl bg-white/80 p-5 shadow-xl"
      >
        <div className="flex w-full items-center gap-10">
          <button
            onClick={handleVoteClick}
            className="button-small hidden items-center gap-2 text-blue-navy lg:flex"
          >
            <ArrowUp />
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
                onClick={handleVoteClick}
                className="button-small flex items-center gap-2 text-blue-navy"
              >
                <ArrowUp />
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
