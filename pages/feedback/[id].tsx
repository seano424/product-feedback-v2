import Link from 'next/link'
import { ArrowLeft } from '@/icons/index'
import Suggestion from '@/components/Suggestions/Suggestion'

const Feedback = () => {
  return (
    <section className="min-h-screen bg-gray-light py-10">
      <div className="container flex justify-between">
        <Link href="/">
          <a className="flex items-center gap-3 text-[14px] font-bold leading-[20px] text-blue-navy">
            <ArrowLeft />
            Go Back
          </a>
        </Link>
        <button className="button bg-blue py-3">Edit Feedback</button>
      </div>

      {/* <Suggestion suggestion={}/> */}
    </section>
  )
}

export default Feedback
