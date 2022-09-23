import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import VoteButton from '@/components/Suggestions/VoteButton'
import { categoriesState } from '@/lib/atoms/categoriesState'
import { Comments } from '@/icons'

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
  const setCategory = useSetRecoilState(categoriesState)

  const [clicked, setClicked] = useState(false)

  const handleSuggestionClick = () => {
    console.log('clicked suggestion')
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
          <VoteButton viewport="large" suggestion={suggestion} />
          <div className="flex w-full flex-col items-start gap-3">
            <p className="h3">{suggestion.title}</p>
            <p className="body-1 text-gray">{suggestion.description}</p>
            <button onClick={handleCategoryClick} className="button-small">
              {suggestion.category?.name ?? 'UI'}
            </button>
            <div className="flex w-full items-center justify-between lg:hidden">
              <VoteButton viewport="small" suggestion={suggestion} />
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
