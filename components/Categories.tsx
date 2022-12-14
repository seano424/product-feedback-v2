import { useRecoilState } from 'recoil'
import { categoriesState } from '@/lib/atoms/categoriesState'
import { useGetCategories } from '@/lib/hooks/useGetCategories'

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
  const { data, isLoading } = useGetCategories()
  const [categories, setCategories] = useRecoilState(categoriesState)

  const handleClick = (type) => {
    setCategories(type)
  }

  return (
    <div className="flex h-full flex-wrap gap-5 rounded-[10px] bg-white p-5">
      <button
        onClick={() => handleClick('all')}
        className={`button-small
          ${
            categories === 'all'
              ? 'bg-blue text-gray-light'
              : 'bg-gray-light text-blue '
          }
          ${isLoading && 'opacity-40'}
        `}
      >
        All
      </button>
      {isLoading
        ? cats.map((filter) => (
            <button
              disabled
              className={`button-small animate-pulse opacity-40
                ${
                  categories === filter.type
                    ? 'bg-blue text-gray-light'
                    : 'bg-gray-light text-blue '
                }
              `}
              key={filter.type}
            >
              {filter.name}
            </button>
          ))
        : data.map((filter) => (
            <button
              onClick={() => handleClick(filter.type)}
              className={`button-small
                ${
                  categories === filter.type
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
