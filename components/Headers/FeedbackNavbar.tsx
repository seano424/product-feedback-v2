import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { ArrowLeft } from '@/icons'
interface Props {
  user?: {
    createdAt: string
    email: string
    emailVerified: any
    id: string
    image: string
    name: string
    password: any
    updatedAt: string
    username: string
  }
}

const FeedbackNavbar = ({ user }: Props) => {
  const { data: session, status } = useSession()
  const authenticated = status === 'authenticated'

  return (
    <nav className="flex justify-between">
      <Link href="/">
        <a className="flex items-center gap-3 text-[14px] font-bold leading-[20px] text-blue-navy">
          <ArrowLeft />
          Go Back
        </a>
      </Link>
      {authenticated && user && user.email === session.user.email && (
        <button className="button bg-blue py-3">Edit Feedback</button>
      )}
      {!authenticated && (
        <button
          onClick={() => signIn()}
          className="button flex bg-white py-2 text-lg text-black"
        >
          Signin
        </button>
      )}
    </nav>
  )
}

export default FeedbackNavbar
