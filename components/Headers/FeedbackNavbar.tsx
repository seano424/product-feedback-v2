import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { ArrowLeft } from '@/icons'
import { UserProps } from '@/lib/interfaces'

const FeedbackNavbar = ({ user }: UserProps) => {
  const { data: session, status } = useSession()
  console.log(session)
  const authenticated = status === 'authenticated'
  return (
    <nav className="flex justify-between">
      <Link href="/">
        <a className="flex items-center gap-3 text-[14px] font-bold leading-[20px] text-blue-navy">
          <ArrowLeft />
          Go Back
        </a>
      </Link>
      {authenticated && (
        <button className="button bg-blue py-3">Edit Feedback</button>
      )}
    </nav>
  )
}

export default FeedbackNavbar
