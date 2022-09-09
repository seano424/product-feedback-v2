import useSuggestions from 'hooks/useSuggestions'
import { ArrowUp, Comments } from '@/icons/index'

const Suggestions = () => {
  const [suggestions] = useSuggestions()
  return (
    <div className="flex flex-col gap-5">
      {suggestions.map((sug) => (
        <button
          key={sug.id}
          className="flex w-full items-center justify-between rounded-xl bg-white p-5 shadow-xl"
        >
          <div className="flex w-full items-center gap-10">
            <div className="button-small hidden items-center gap-2 text-blue-navy lg:flex">
              <ArrowUp />
              {sug.votes}
            </div>
            <div className="flex w-full flex-col items-start gap-3">
              <p className="h3">{sug.title}</p>
              <p className="body-1 text-gray">{sug.description}</p>
              <p className="button-small">{sug.category.name}</p>
              <div className="flex w-full items-center justify-between lg:hidden">
                <div className="button-small flex items-center gap-2 text-blue-navy">
                  <ArrowUp />
                  {sug.votes}
                </div>
                <div className="flex items-center gap-2">
                  <Comments />
                  {sug.comments.length}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            <Comments />
            {sug.comments.length}
          </div>
        </button>
      ))}
    </div>
  )
}

export default Suggestions
