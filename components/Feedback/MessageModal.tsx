import { useEffect, useState, Dispatch, SetStateAction, useRef } from 'react'
import { useClickAway } from 'react-use'
import toast, { Toaster } from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { createComment } from '@/lib/api'

interface MessageProps {
  type: 'comment' | 'reply'
  at?: string
  setOpen: Dispatch<SetStateAction<boolean>>
}

const MessageModal = (props: MessageProps) => {
  const { type = 'comment', setOpen, at } = props
  const [value, setValue] = useState('')
  const [placeholder, setPlaceholder] = useState(`Type your ${type} here`)
  const [charsLeft, setCharsLeft] = useState(value.length)
  const ref = useRef()

  useClickAway(ref, () => {
    setOpen(false)
  })

  useEffect(() => {
    let limit = 250
    setCharsLeft(limit - value.length)
  }, [value])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim().length > 0) {
      return console.log('good')
    }
    toast('Please enter some feedback 😅')
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
              Add {type} {at && `to @${at.toLowerCase()}`}
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
