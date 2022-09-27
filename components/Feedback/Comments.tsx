import Image from 'next/image'
import { Comments } from '@/lib/interfaces'

const Comments = (props: Comments) => {
  const { comments } = props
  return (
    <div className="w-full cursor-pointer rounded-xl bg-white/80 p-5 shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="h3">
          {comments.length && comments.length === 1
            ? '1 Comment'
            : comments.length + ' Comments'}
        </h3>
      </div>

      <div>
        {comments.map((comment, i) => (
          <div
            key={i}
            className="grid grid-cols-12 gap-5 border-b-2 border-gray-light py-5"
          >
            <div className="relative col-span-1 h-full w-12">
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
              {comment.replies.length > 0 && (
                <div className="absolute top-[54px] bottom-0 left-1/2 w-[2px] -translate-x-1/2 transform bg-gray-light"></div>
              )}
            </div>
            <div className="col-span-11 col-start-3 md:col-start-2">
              {/* Comment */}
              <div className="flex flex-1 flex-col gap-5 pb-5">
                <div className="flex w-full flex-row justify-between md:items-end">
                  <div className="flex flex-col gap-1">
                    <p className="h4">{comment.user.name}</p>
                    <p className="body-2 lowercase">@{comment.user.username}</p>
                  </div>
                  <button className="font-bold text-blue">Reply</button>
                </div>
                <p className="body-2">{comment.body}</p>
              </div>

              {/* Replies */}
              {comment.replies &&
                comment.replies.map((reply) => (
                  <div key={reply.id} className="grid grid-cols-12 gap-5 py-5">
                    <div className="col-span-1 h-12 w-12 md:h-full md:w-full">
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
                    <div className="col-span-11 col-start-3 md:col-start-2">
                      <div className="flex flex-1 flex-col gap-5">
                        <div className="flex w-full items-end justify-between">
                          <div className="flex flex-col gap-1">
                            <p className="h4">{reply.user.name}</p>
                            <p className="body-2 lowercase">
                              @{reply.user.username}
                            </p>
                          </div>
                          <button className="font-bold text-blue">Reply</button>
                        </div>
                        <p className="body-2">
                          <span className="font-bold text-fuschia">
                            @{comment.user.username}
                          </span>{' '}
                          {reply.body}
                        </p>
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
