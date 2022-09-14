import { ArrowUp, Comments } from '@/icons/index'

const GhostSuggestion = (props) => {
  const { suggestion } = props
  return (
    <section>
      <div className="flex w-full items-center justify-between rounded-xl bg-white/80 p-5 opacity-40 shadow-xl">
        <div className="flex w-full items-center gap-10">
          <div className="button-small hidden items-center gap-2 text-blue-navy lg:flex">
            <ArrowUp />
            {suggestion.votes}
          </div>
          <div className="flex w-full flex-col items-start gap-3">
            <p className="h3">{suggestion.title}</p>
            <p className="body-1 text-gray">{suggestion.description}</p>
            <div className="button-small">
              {suggestion.category?.name ?? 'UI'}
            </div>
            <div className="flex w-full items-center justify-between lg:hidden">
              <button className="button-small flex items-center gap-2 text-blue-navy">
                <ArrowUp />
                {suggestion.votes}
              </button>
              <div className="flex items-center gap-2">
                <Comments />
                100
              </div>
            </div>
          </div>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <Comments />
          88
        </div>
      </div>
    </section>
  )
}

export default GhostSuggestion
