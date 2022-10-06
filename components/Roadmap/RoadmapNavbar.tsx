import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/solid'
import BackButton from '../Utilities/BackButton'

const RoadmapNavbar = () => {
  return (
    <section className="container mx-auto flex max-w-4xl flex-col gap-5">
      <div className="flex justify-between gap-4 rounded-lg border border-gray-lightest bg-gray-dark p-5 text-gray-lightest">
        <div className="flex flex-col gap-2">
          <BackButton variant="light" />
          <h2 className="h2">Roadmap</h2>
        </div>
        <Link href="/feedback/create">
          <a className="button">
            <PlusIcon className="h-5 w-5" />
            Add Feedback
          </a>
        </Link>
      </div>
    </section>
  )
}

export default RoadmapNavbar
