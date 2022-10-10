import { useEffect, useState, Dispatch, SetStateAction, useRef } from 'react'
import { useClickAway } from 'react-use'
import { useSession } from 'next-auth/react'
import toast, { Toaster } from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateComment, createReply, updateReply } from '@/lib/api'
import { CommentProps } from '@/lib/interfaces'

interface ModalCommentProps extends CommentProps {
  commentId: number
}

interface MessageProps {
  type: 'comment' | 'reply'
  isEditing: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  data: ModalCommentProps
}

const MessageModal = (props: MessageProps) => {
  const { type = 'comment', setOpen, data, isEditing } = props
  const { data: session, status } = useSession()
  const [value, setValue] = useState('')
  const [charsLeft, setCharsLeft] = useState(value.length)

  const queryClient = useQueryClient()
  const ref = useRef()
  const authenticated = status === 'authenticated'
  const reply = type === 'reply'

  useClickAway(ref, () => {
    setOpen(false)
  })

  useEffect(() => {
    isEditing && setValue(data.body)
  }, [data.body, isEditing])

  useEffect(() => {
    let limit = 250
    setCharsLeft(limit - value.length)
  }, [value])

  const createReplyMutation = useMutation(createReply, {
    onSuccess: () => {
      setOpen(false)
      queryClient.invalidateQueries(['suggestion'])
      queryClient.invalidateQueries(['suggestions'])
    },
  })

  const createCommentMutation = useMutation(updateComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['suggestion', data.suggestionId])
      setOpen(false)
    },
  })

  const updateReplyMutation = useMutation(updateReply, {
    onSuccess: () => {
      setOpen(false)
      queryClient.invalidateQueries(['suggestion'])
      queryClient.invalidateQueries(['suggestions'])
      toast.success('updated reply')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim().length > 0) {
      if (authenticated) {
        if (reply && !isEditing) {
          const body = {
            body: value,
            suggestionId: data.suggestionId,
            userEmail: session.user.email,
            commentId: data.commentId,
          }
          toast.success('Your reply has been added!')
          return createReplyMutation.mutate(body)
        }
        if (reply && isEditing) {
          return updateReplyMutation.mutate({
            commentId: data.commentId,
            body: value,
            suggestionId: data.suggestionId,
            replyId: +data.id,
          })
        }
        if (!reply) {
          console.log('okay from modal: ', data)
          const body = {
            body: value,
            suggestionId: data.suggestionId,
            commentId: data.id,
          }
          createCommentMutation.mutate(body)
        }
      }
      toast('Please enter some feedback 😅')
    }
  }

  return (
    <>
      <Toaster />
      <div className="fixed inset-0 z-50 flex bg-black/10 py-56 filter backdrop-blur-sm">
        <div className="container max-w-4xl">
          <form
            onSubmit={handleSubmit}
            ref={ref}
            className="container flex w-full flex-col gap-5 rounded-xl bg-white py-10 shadow-xl"
          >
            <h2 className="h2">
              {isEditing ? 'Update' : 'Add'} {type}{' '}
              {data.user.username && `to @${data.user.username.toLowerCase()}`}
            </h2>
            <textarea
              onChange={(e) => setValue(e.target.value)}
              value={value}
              rows={4}
              placeholder={`Type your ${type} here`}
              className="input"
              name={type}
              id={type}
            ></textarea>
            <div className="flex items-center justify-between">
              <p className="body-2">{charsLeft} characters left</p>
              <button type="submit" className="button">
                {isEditing ? 'Edit' : 'Post'} {type}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default MessageModal
