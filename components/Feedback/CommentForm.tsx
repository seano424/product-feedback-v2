import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { createComment } from '@/lib/api'

interface Props {
  suggestionId: number
}

const CommentForm = (props: Props) => {
  const [value, setValue] = useState('')
  const [charsLeft, setCharsLeft] = useState(value.length)
  const queryClient = useQueryClient()

  useEffect(() => {
    let limit = 250
    setCharsLeft(limit - value.length)
  }, [value])

  const createCommentMutation = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['suggestion', props.suggestionId])
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = {
      body: value,
      suggestionId: props.suggestionId,
    }
    createCommentMutation.mutate(body)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-5 rounded-xl bg-white/80 p-5 shadow-xl"
    >
      <h3 className="h3">Add Comment</h3>
      <textarea
        onChange={(e) => setValue(e.target.value)}
        value={value}
        rows={4}
        placeholder="Type your comment here"
        className="input"
        name="comment"
        id="comment"
      ></textarea>
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="body-2">{charsLeft} characters left</p>
        <button type="submit" className="button">
          Post Comment
        </button>
      </div>
    </form>
  )
}

export default CommentForm
