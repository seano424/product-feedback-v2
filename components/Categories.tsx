import { useState } from 'react'
import useCategories from 'lib/hooks/useCategories'

const Categories = () => {
  const [isActive, setIsActive] = useState(0)
  const [categories] = useCategories()
  return (
    <div className="flex flex-wrap gap-5 rounded-[10px] bg-white p-5">
      <button
        onClick={() => setIsActive(0)}
        className={`button-small
                ${
                  isActive === 0
                    ? 'bg-blue text-gray-light'
                    : 'bg-gray-light text-blue '
                }
                `}
      >
        All
      </button>
      {categories.map((filter, i) => (
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
