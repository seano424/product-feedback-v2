import { useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Plus, Bulb } from '@/icons/index'
import { useGetSuggestions } from 'lib/hooks/useGetSuggestions'
import { sortByState } from 'lib/sortBy'

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
  const { data: suggestions } = useGetSuggestions()
  const setSortByState = useSetRecoilState(sortByState)

  const handleSetSortBy = async (choice, type) => {
    await setSortByState(type)
    await setFilter(choice)
    setFilterOpen((state) => !state)
  }

  return (
    <div className="fixed top-20 z-10 flex w-full bg-gray-light text-white lg:top-0 lg:pt-72 xl:top-0 xl:pt-10 xl:pl-96 xl:pr-20">
      <div className="w-full rounded-lg lg:container xl:px-0">
        <div className="flex w-full items-center justify-between bg-blue-navy p-4 xl:rounded-xl">
          <div className="flex items-center gap-10">
            <div className="hidden items-center gap-5 lg:flex">
              <Bulb />
              <p className="h3 flex">
                {suggestions &&
                  (suggestions.length !== 1
                    ? suggestions.length + ' Suggestions'
                    : suggestions.length + ' Suggestion')}
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
                <div className="absolute top-20 flex w-80 flex-col gap-4 rounded-lg bg-white text-black shadow-lg">
                  {sortBy.map((choice) => (
                    <button
                      key={choice.type}
                      className={`h3 flex w-full justify-start border-b border-gray-light px-5 py-3 transition-all duration-300 hover:text-fuschia ${
                        filter.type === choice.type && 'text-fuschia'
                      }`}
                      onClick={() => handleSetSortBy(choice, choice.type)}
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
