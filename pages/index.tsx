import { useState } from 'react'
import { LightBulbIcon } from '@heroicons/react/solid'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Bulb, Plus } from '../public/icons/index'

const suggestions = {
  amount: 6,
  sortBy: [
    {
      text: 'Most Upvotes',
      type: 'most-upvotes',
    },
    {
      text: 'Least Upvotes',
      type: 'least-upvotes',
    },
    {
      text: 'Least Comments',
      type: 'least-comments',
    },
    {
      text: 'Least Comments',
      type: 'least-comments',
    },
  ],
}

const Home = () => {
  const [filter, setFilter] = useState(suggestions.sortBy[0])

  return (
    <div className="min-h-screen">
      <div className="bg-blue-navy py-4 text-white">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="hidden items-center gap-5 lg:flex">
              <Bulb />
              <p className="h3 flex">
                {suggestions.amount !== 1
                  ? suggestions.amount + ' Suggestions'
                  : suggestions.amount + ' Suggestion'}
              </p>
            </div>

            <button className="flex items-center gap-2">
              <span>Sort by:</span>
              {filter.text}
              <ChevronDownIcon className="h-5 w-5" />
            </button>
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

export default Home
