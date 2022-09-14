import { useState } from 'react'
import { ArrowUp, Comments } from '../../public/icons'
import { useSetRecoilState } from 'recoil'
import { categoriesState } from 'lib/atoms/categoriesState'

interface Props {
  suggestion: {
    votes: number
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

  const handleSuggestionClick = () => {
    console.log('clicked suggestion')
  }

  const handleVoteClick = (e) => {
    e.stopPropagation()
    console.log('clicked vote')
  }

  const handleCategoryClick = (e) => {
    e.stopPropagation()
    console.log('clicked cat')
    setCategory(clicked ? 'all' : suggestion.category.type)
    setClicked((state) => !state)
  }

  return (
    <section>
      <button
        onClick={handleSuggestionClick}
        className="flex w-full items-center justify-between rounded-xl bg-white/80 p-5 shadow-xl"
      >
        <div className="flex w-full items-center gap-10">
          <button
            onClick={handleVoteClick}
            className="button-small hidden items-center gap-2 text-blue-navy lg:flex"
          >
            <ArrowUp />
            {suggestion.votes}
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
                {suggestion.votes}
              </button>
              <div className="flex items-center gap-2">
                <Comments />
                {suggestion.comments?.length ?? '100'}
              </div>
            </div>
          </div>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <Comments />
          {suggestion.comments?.length ?? '88'}
        </div>
      </button>
    </section>
  )
}

export default Suggestion
