import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { signIn, useSession } from 'next-auth/react'
import { SuggestionProps } from '@/lib/interfaces'
import { deleteSuggestion } from '@/lib/api'
import { ArrowLeft } from '@/icons'
import toast, { Toaster } from 'react-hot-toast'

interface Props extends SuggestionProps {
  toggle?: Dispatch<SetStateAction<boolean>>
}

interface ToastProps {
  suggestionId: number
}

export const ToastDelete = (props: ToastProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const deleteMutation = useMutation(deleteSuggestion, {
    onSuccess: () => {
      queryClient.invalidateQueries(['suggestions'])
      router.push('/')
      toast.remove()
    },
  })

  const handleConfirmation = () => {
    deleteMutation.mutate({ suggestionId: props.suggestionId })
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gray-lightest bg-white py-4 px-20 shadow-2xl filter backdrop-brightness-150 hover:bg-white/90 hover:shadow-xl">
      <p className="h1 text-center">Are you sure?</p>
      <div className="flex flex-col gap-4">
        <button onClick={handleConfirmation} className="button w-full bg-red">
          Yes
        </button>
        <button onClick={() => toast.remove()} className="button w-full">
          No
        </button>
      </div>
    </div>
  )
}

const FeedbackNavbar = ({ suggestion, toggle }: Props) => {
  const { data: session, status } = useSession()

  const authenticated = status === 'authenticated'

  const handleDelete = () => {
    toast.custom(<ToastDelete suggestionId={suggestion.id} />)
  }

  return (
    <nav className="flex flex-col justify-between gap-5 sm:flex-row">
      <Toaster />
      <Link href="/">
        <a className="flex items-center gap-3 text-[14px] font-bold leading-[20px] text-blue-navy">
          <ArrowLeft />
          Go Back
        </a>
      </Link>
      {authenticated &&
        suggestion &&
        suggestion.user.email === session.user.email && (
          <div className="flex justify-start gap-4 lg:justify-end">
            <button onClick={handleDelete} className="button bg-red py-3">
              Delete Feedback
            </button>

            <button
              onClick={() => toggle((state) => !state)}
              className="button bg-blue py-3"
            >
              Edit Feedback
            </button>
          </div>
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
