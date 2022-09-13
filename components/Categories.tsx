import { useState } from 'react'
import { useGetCategories } from 'lib/hooks/useGetCategories'
import { filterByState } from 'lib/filterBy'
import { useSetRecoilState, useRecoilState } from 'recoil'

const cats = [
  {
    name: 'UX',
    type: 'ux',
  },
  {
    name: 'UI',
    type: 'ui',
  },
  {
    name: 'Bug',
    type: 'bug',
  },
  {
    name: 'Feature',
    type: 'feature',
  },
  {
    name: 'Enhancement',
    type: 'enhancement',
  },
]

const Categories = () => {
  const [isActive, setIsActive] = useState(0)
  const { data, isLoading } = useGetCategories()
  const [state, setState] = useRecoilState(filterByState)

  const handleClick = (index, type) => {
    setIsActive(index)
    setState(type)
  }
  console.log(state)

  return (
    <div className="flex h-full flex-wrap gap-5 rounded-[10px] bg-white p-5">
      <button
        onClick={() => handleClick(0, 'all')}
        className={`button-small
          ${
            state === 'all'
              ? 'bg-blue text-gray-light'
              : 'bg-gray-light text-blue '
          }
          ${isLoading && 'opacity-40'}
        `}
      >
        All
      </button>
      {isLoading
        ? cats.map((filter, i) => (
            <button
              // onClick={() => handleClick(i + 1, filter.type)}
              disabled
              className={`button-small animate-pulse opacity-40
                ${
                  state === filter.type
                    ? 'bg-blue text-gray-light'
                    : 'bg-gray-light text-blue '
                }
              `}
              key={filter.type}
            >
              {filter.name}
            </button>
          ))
        : data.map((filter, i) => (
            <button
              onClick={() => handleClick(i + 1, filter.type)}
              className={`button-small
                ${
                  state === filter.type
                    ? 'bg-blue text-gray-light'
                    : 'bg-gray-light text-blue '
                }
              `}
              key={filter.type}
            >
              {filter.name}
            </button>
          ))}
    </div>
  )
}

export default Categories
