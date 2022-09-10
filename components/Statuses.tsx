import Link from 'next/link'
import useStatuses from 'lib/hooks/useStatuses'

const Statuses = () => {
  const [statuses] = useStatuses()

  return (
    <div className="flex flex-col gap-10 rounded-[10px] bg-white p-5 lg:gap-4">
      <div className="flex justify-between">
        <h2 className="h2">Roadmap</h2>
        <Link href="/">
          <a className="body-1 text-blue underline underline-offset-1">View</a>
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {statuses.map((item, i) => (
          <div key={item.type} className="flex justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`h-2 w-2 rounded-full ${i === 0 && 'bg-orange'}
                      ${i === 1 && 'bg-purple-500'} ${
                  i === 2 && 'bg-teal-400'
                }`}
              ></div>
              <p>{item.name}</p>
            </div>
            <p className="body-1">{item.suggestions.length}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Statuses
