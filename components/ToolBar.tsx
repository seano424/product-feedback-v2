import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Plus, Bulb } from '@/icons/index'
import useSuggestions from 'hooks/useSuggestions'

const sortBy = [
  {
    text: 'Most Upvotes',
    type: 'most-upvotes',
  },
  {
    text: 'Least Upvotes',
    type: 'least-upvotes',
  },
  {
    text: 'Most Comments',
    type: 'most-comments',
  },
  {
    text: 'Least Comments',
    type: 'least-comments',
  },
]

const ToolBar = () => {
  const [filter, setFilter] = useState(sortBy[0])
  const [isOpen, setFilterOpen] = useState(false)
  const [suggestions] = useSuggestions()

  return (
    <div className="fixed top-20 flex w-full text-white lg:top-72 ">
      <div className="lg:container">
        <div className="flex w-full items-center justify-between bg-blue-navy p-4">
          <div className="flex items-center gap-10">
            <div className="hidden items-center gap-5 lg:flex">
              <Bulb />
              <p className="h3 flex">
                {suggestions.length !== 1
                  ? suggestions.length + ' Suggestions'
                  : suggestions.length + ' Suggestion'}
              </p>
            </div>
            <div className="h3 relative">
              <button
                onClick={() => setFilterOpen((state) => !state)}
                className="flex items-center gap-2"
              >
                <span>Sort by:</span>
                {filter.text}
                <ChevronDownIcon
                  className={`${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  } h-5 w-5 transform transition-all duration-300`}
                />
              </button>
              {isOpen && (
                <div className="absolute top-20 flex w-80 flex-col gap-4 rounded-lg text-black shadow-lg">
                  {sortBy.map((choice) => (
                    <button
                      className={`h3 flex w-full justify-start border-b border-gray-light px-5 py-3 transition-all duration-300 hover:text-fuschia ${
                        filter.type === choice.type && 'text-fuschia'
                      }`}
                      onClick={() => setFilter(choice)}
                    >
                      {choice.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button className="button flex">
            <Plus className="text-white" />
            Add Feedback
          </button>
        </div>
      </div>
    </div>
  )
}

export default ToolBar
