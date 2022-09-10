import { useState } from 'react'
import { useGetCategories } from 'lib/hooks/useGetCategories'

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

  return (
    <div className="flex h-full flex-wrap gap-5 rounded-[10px] bg-white p-5">
      <button
        onClick={() => setIsActive(0)}
        className={`button-small
          ${
            isActive === 0
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
              onClick={() => setIsActive(i + 1)}
              className={`button-small animate-pulse opacity-40
                ${
                  i + 1 === isActive
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
              onClick={() => setIsActive(i + 1)}
              className={`button-small
                ${
                  i + 1 === isActive
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
