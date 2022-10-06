import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSession, signIn } from 'next-auth/react'
import toast, { Toaster } from 'react-hot-toast'
import MessageModal from './MessageModal'
import { useMutation, useQueryClient } from 'react-query'
import { deleteReply, deleteComment } from '@/lib/api'
import { CommentProps } from '@/lib/interfaces'

interface Props {
  comments: CommentProps[]
}

export const ToastComment = () => {
  return (
    <div className="rounded-lg border border-gray-lightest bg-white shadow-2xl filter backdrop-brightness-150 hover:bg-white/90 hover:shadow-xl">
      <button
        onClick={() => signIn()}
        className="button flex bg-white px-4 py-3 text-lg font-normal text-black"
      >
        Sign in to reply 🤷‍♂️
      </button>
    </div>
  )
}

const Comments = ({ comments }: Props) => {
  const { data: session, status } = useSession()
  const authenticated = status === 'authenticated'
  const queryClient = useQueryClient()

  const [openComment, setOpenComment] = useState(false)
  const [openReply, setOpenReply] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    toast.dismiss()
  }, [])

  const handleComment = () => {
    !authenticated && toast.custom(<ToastComment />)
    authenticated && setOpenComment(true)
  }

  const deleteMutation = useMutation(deleteReply, {
    onSuccess: () => {
      queryClient.invalidateQueries(['suggestion', comments[0].suggestionId])
    },
  })

  const deleteCommentMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['suggestion', comments[0].suggestionId])
    },
  })

  const handleReply = (data, type) => {
    !authenticated && toast.custom(<ToastComment />)
    if (authenticated) {
      if (type === 'comment') {
        const commentData = {
          suggestionId: data.suggestionId,
          commentId: data.id,
          ...data,
        }
        setIsEditing(false)
        setOpenReply(true)
        setData(commentData)
      }
      setIsEditing(false)
      setOpenReply(true)
    }
  }

  const handleDelete = (reply) => {
    if (authenticated) {
      toast.error('deleting reply')
      return deleteMutation.mutate({
        replyId: reply.id,
      })
    }
  }

  const handleDeleteComment = (comment) => {
    if (authenticated) {
      toast.error('deleting reply')
      return deleteCommentMutation.mutate({
        commentId: comment.id,
      })
    }
  }

  const handleUpdateReply = (reply) => {
    if (authenticated) {
      setIsEditing(true)
      setData(reply)
      setOpenReply(true)
    }
  }

  const handleUpdateComment = (comment) => {
    if (authenticated) {
      setIsEditing(true)
      setData(comment)
      setOpenComment(true)
    }
  }

  return (
    <div>
      {openComment && (
        <MessageModal
          type="comment"
          setOpen={setOpenComment}
          data={data}
          isEditing={isEditing}
        />
      )}
      {openReply && (
        <MessageModal
          type="reply"
          setOpen={setOpenReply}
          data={data}
          isEditing={isEditing}
        />
      )}
      <Toaster />
      <div className="w-full rounded-xl bg-white/80 p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="h3">
            {comments.length && comments.length === 1
              ? '1 Comment'
              : comments.length + ' Comments'}
          </h3>
        </div>

        {comments.map((comment, i) => (
          <div
            key={i}
            className="grid grid-cols-12 gap-5 border-b-2 border-gray-light py-5"
          >
            <div className="relative col-span-1 h-full w-10 sm:w-20">
              <Image
                className="rounded-full"
                src={
                  comment.user.image ??
                  'https://unsplash.com/photos/mEZ3PoFGs_k'
                }
                alt="Avatar"
                height={50}
                width={50}
              />
              {comment.replies && (
                <div className="absolute top-[54px] bottom-0 left-1/2 w-[2px] -translate-x-1/2 transform bg-gray-light"></div>
              )}
            </div>
            <div className="col-span-11 col-start-4 md:col-start-2">
              <div className="flex flex-1 flex-col gap-5 pb-5">
                <div className="flex w-full flex-row justify-between md:items-end">
                  <div className="flex flex-col gap-1">
                    <p className="h4">{comment.user.name}</p>
                    <p className="body-2 lowercase">
                      @
                      {comment.user.username ??
                        comment.user.email.toLocaleLowerCase()}
                    </p>
                  </div>

                  <div className="hidden items-center gap-2 sm:flex">
                    {session && session.user.email === comment.user.email && (
                      <button
                        onClick={() => handleDeleteComment(comment)}
                        className="font-bold text-red"
                      >
                        Delete
                      </button>
                    )}
                    {session && session.user.email === comment.user.email && (
                      <button
                        onClick={() => handleUpdateComment(comment)}
                        className="font-bold text-fuschia"
                      >
                        Edit
                      </button>
                    )}
                    {session && session.user.email !== comment.user.email && (
                      <button
                        onClick={() => handleReply(comment, 'comment')}
                        className="font-bold text-blue"
                      >
                        Reply
                      </button>
                    )}
                  </div>
                </div>
                <p className="body-2">{comment.body}</p>

                <div className="flex items-center gap-2 font-bold text-blue sm:hidden">
                  {session && session.user.email === comment.user.email && (
                    <button
                      onClick={() => handleDeleteComment(comment)}
                      className="font-bold text-red"
                    >
                      Delete
                    </button>
                  )}
                  {session && session.user.email === comment.user.email && (
                    <button
                      onClick={() => handleUpdateComment(comment)}
                      className="font-bold text-fuschia"
                    >
                      Edit
                    </button>
                  )}
                  {session && session.user.email !== comment.user.email && (
                    <button
                      onClick={() => handleReply(comment, 'comment')}
                      className="font-bold text-blue"
                    >
                      Reply
                    </button>
                  )}
                </div>
              </div>

              {comment.replies &&
                comment.replies.map((reply) => (
                  <div key={reply.id} className="grid grid-cols-12 gap-5 py-5">
                    <div className="-ml-6 w-8 sm:ml-0 sm:w-16">
                      <Image
                        className="rounded-full"
                        src={
                          reply.user.image ??
                          'https://unsplash.com/photos/mEZ3PoFGs_k'
                        }
                        alt="Avatar"
                        height={50}
                        width={50}
                      />
                    </div>
                    <div className="col-span-11 md:col-start-2">
                      <div className="flex flex-1 flex-col gap-5">
                        <div className="flex w-full items-end justify-between">
                          <div className="flex flex-col gap-1">
                            <p className="h4">{reply.user.name}</p>
                            <p className="body-2 lowercase">
                              @
                              {reply.user.username ??
                                reply.user.email.toLocaleLowerCase()}
                            </p>
                          </div>
                          <div className="hidden items-center gap-2 sm:flex">
                            {session &&
                              session.user.email === reply.user.email && (
                                <button
                                  onClick={() => handleDelete(reply)}
                                  className="font-bold text-red"
                                >
                                  Delete
                                </button>
                              )}
                            {session &&
                              session.user.email === reply.user.email && (
                                <button
                                  onClick={() => handleUpdateReply(reply)}
                                  className="font-bold text-fuschia"
                                >
                                  Edit
                                </button>
                              )}
                            {session &&
                              session.user.email !== reply.user.email && (
                                <button
                                  onClick={() => handleReply(reply, 'reply')}
                                  className="font-bold text-blue"
                                >
                                  Reply
                                </button>
                              )}
                          </div>
                        </div>
                        <p className="body-2">
                          <span className="font-bold text-fuschia">
                            @
                            {comment.user.username ??
                              comment.user.email.toLocaleLowerCase()}
                          </span>{' '}
                          {reply.body}
                        </p>
                        <button
                          onClick={() => handleReply(reply, 'reply')}
                          className="flex font-bold text-blue sm:hidden"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comments
