import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { useClickAway } from 'react-use'
import { useRef } from 'react'

interface MessageProps {
  type: 'comment' | 'reply'
  setOpen: Dispatch<SetStateAction<boolean>>
}

const MessageModal = (props: MessageProps) => {
  const { type = 'comment', setOpen } = props
  const [value, setValue] = useState('')
  const [charsLeft, setCharsLeft] = useState(value.length)
  const ref = useRef()

  useClickAway(ref, () => {
    setOpen(false)
  })

  useEffect(() => {
    let limit = 250
    setCharsLeft(limit - value.length)
  }, [value])

  return (
    <div className="fixed inset-0 z-50 flex bg-black/10 py-56 filter backdrop-blur-sm">
      <div className="container max-w-4xl">
        <div
          ref={ref}
          className="container flex w-full flex-col gap-5 rounded-xl bg-white py-10 shadow-xl"
        >
          <h2 className="h2">Add {type}</h2>
          <textarea
            onChange={(e) => setValue(e.target.value)}
            value={value}
            rows={4}
            placeholder={`Type your ${type} here`}
            className="w-full rounded-lg border-0 bg-gray-lightest focus:ring-0"
            name={type}
            id={type}
          ></textarea>
          <div className="flex items-center justify-between">
            <p className="body-2">{charsLeft} characters left</p>
            <button className="button">Post {type}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageModal
