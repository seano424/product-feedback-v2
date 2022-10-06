import BackButton from '@/components/Utilities/BackButton'
import { PlusIcon } from '@heroicons/react/solid'

const Roadmap = () => {
  return (
    <main className="min-h-screen bg-gray-light py-10">
      <section className="container mx-auto flex max-w-4xl flex-col gap-5">
        <div className="flex justify-between gap-4 rounded-lg border border-gray-lightest bg-gray-dark py-4 px-20 text-gray-lightest">
          <div className="flex flex-col gap-2">
            <BackButton variant="light" />
            <h2 className="h2">Roadmap</h2>
          </div>
          <button className="button">
            <PlusIcon className="h-5 w-5" />
            Add Feedback
          </button>
        </div>
      </section>
    </main>
  )
}

export default Roadmap
