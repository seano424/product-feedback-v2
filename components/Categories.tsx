import { useState } from 'react'
import useCategories from 'hooks/useCategories'

const Categories = () => {
  const [isActive, setIsActive] = useState(0)
  const [categories] = useCategories()
  return (
    <div className="flex flex-wrap gap-5 rounded-[10px] bg-white p-5">
      <button
        onClick={() => setIsActive(0)}
        className={`rounded-[10px] py-2 px-5 text-[13px] font-semibold leading-[19px]
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
          className={`rounded-[10px] py-2 px-5 text-[13px] font-semibold leading-[19px]
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
