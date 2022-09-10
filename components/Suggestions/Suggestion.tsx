import { ArrowUp, Comments } from '../../public/icons'

interface Props {
  suggestion: {
    votes: number
    id: number
    title: string
    description: string
    category?: {
      name: string
    }
    comments?: []
  }
  loading: boolean
}

const Suggestion = (props: Props) => {
  const { suggestion, loading } = props
  return (
    <button
      className={`flex w-full items-center justify-between rounded-xl bg-white/80 p-5 shadow-xl ${
        loading && 'animate-pulse opacity-40'
      }`}
    >
      <div className="flex w-full items-center gap-10">
        <div
          className={`button-small hidden items-center gap-2 text-blue-navy lg:flex ${
            loading && 'animate-pulse'
          }`}
        >
          <ArrowUp />
          {suggestion.votes}
        </div>
        <div className="flex w-full flex-col items-start gap-3">
          <p className={`${loading && 'animate-pulse'} h3`}>
            {suggestion.title}
          </p>
          <p className="body-1 text-gray">{suggestion.description}</p>
          <p className="button-small">{suggestion.category?.name ?? 'UI'}</p>
          <div className="flex w-full items-center justify-between lg:hidden">
            <div
              className={`button-small flex items-center gap-2 text-blue-navy ${
                loading && 'animate-pulse'
              }`}
            >
              <ArrowUp />
              {suggestion.votes}
            </div>
            <div
              className={`${
                loading && 'animate-pulse'
              } flex items-center gap-2`}
            >
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
  )
}

export default Suggestion
