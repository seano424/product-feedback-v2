import Link from 'next/link'
import { ArrowLeft } from '@/icons'
const FeedbackNavbar = () => {
  return (
    <nav className="flex justify-between">
      <Link href="/">
        <a className="flex items-center gap-3 text-[14px] font-bold leading-[20px] text-blue-navy">
          <ArrowLeft />
          Go Back
        </a>
      </Link>
      <button className="button bg-blue py-3">Edit Feedback</button>
    </nav>
  )
}

export default FeedbackNavbar
