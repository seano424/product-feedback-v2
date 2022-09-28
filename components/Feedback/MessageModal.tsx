import { useEffect, useState, Dispatch, SetStateAction, useRef } from 'react'
import { useClickAway } from 'react-use'
import { useSession } from 'next-auth/react'
import toast, { Toaster } from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { createComment } from '@/lib/api'
import { CommentProps } from '@/lib/interfaces'

interface MessageProps {
  type: 'comment' | 'reply'
  setOpen: Dispatch<SetStateAction<boolean>>
  data: CommentProps
}

const MessageModal = (props: MessageProps) => {
  const { type = 'comment', setOpen, data } = props
  const { status } = useSession()
  const queryClient = useQueryClient()
  const ref = useRef()

  const [value, setValue] = useState('')
  const [placeholder, setPlaceholder] = useState(`Type your ${type} here`)
  const [charsLeft, setCharsLeft] = useState(value.length)

  const authenticated = status === 'authenticated'
  const reply = type === 'reply'

  useClickAway(ref, () => {
    setOpen(false)
  })

  useEffect(() => {
    let limit = 250
    setCharsLeft(limit - value.length)
  }, [value])

  const handleSubmitReply = (e) => {
    e.preventDefault()
    if (value.trim().length > 0) {
      if (authenticated) {
        const body = {
          body: value,
          suggestionId: data.suggestionId,
          userId: data.user.id,
        }
        toast.success('Your comment has been added!')
        return console.log('good', body)
      }
    }
    toast('Please enter some feedback 😅')
  }

  const handleSubmitComment = () => {
    console.log('oops')
  }

  return (
    <>
      <Toaster />
      <div className="fixed inset-0 z-50 flex bg-black/10 py-56 filter backdrop-blur-sm">
        <div className="container max-w-4xl">
          <form
            onSubmit={reply ? handleSubmitReply : handleSubmitComment}
            ref={ref}
            className="container flex w-full flex-col gap-5 rounded-xl bg-white py-10 shadow-xl"
          >
            <h2 className="h2">
              Add {type}{' '}
              {data.user.username && `to @${data.user.username.toLowerCase()}`}
            </h2>
            <textarea
              onChange={(e) => setValue(e.target.value)}
              value={value}
              rows={4}
              placeholder={placeholder}
              className="w-full rounded-lg border-0 bg-gray-lightest focus:ring-0"
              name={type}
              id={type}
            ></textarea>
            <div className="flex items-center justify-between">
              <p className="body-2">{charsLeft} characters left</p>
              <button type="submit" className="button">
                Post {type}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default MessageModal
