import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import VoteButton from '@/components/Feedback/VoteButton'
import { categoriesState } from '@/lib/atoms/categoriesState'
import { Comments } from '@/icons'
import { SuggestionProps } from '@/lib/interfaces'
import { useRouter } from 'next/router'

interface Props {
  suggestion: SuggestionProps
}

const Suggestion = (props: Props) => {
  const { suggestion } = props
  const setCategory = useSetRecoilState(categoriesState)
  const router = useRouter()
  const [clicked, setClicked] = useState(false)

  const handleSuggestionClick = () => {
    router.push(`/feedback/${suggestion.id}`)
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
          <VoteButton viewport="large" id={suggestion.id} />
          <div className="flex w-full flex-col items-start gap-3">
            <h3 className="h3">{suggestion.title}</h3>
            <p className="body-1 text-gray">{suggestion.description}</p>
            <button onClick={handleCategoryClick} className="button-small">
              {suggestion.category?.name ?? 'UI'}
            </button>
            <div className="flex w-full items-center justify-between lg:hidden">
              <VoteButton id={suggestion.id} viewport="small" />
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
