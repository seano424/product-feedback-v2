import clsx from 'clsx'
import Link from 'next/link'
import { Plus, Bulb } from '@/icons'
import { useRecoilState } from 'recoil'
import { useClickAway } from 'react-use'
import { AnimatePresence } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useState, useRef, Dispatch, SetStateAction } from 'react'
import { useGetSuggestions } from '@/lib/hooks/useGetSuggestions'
import { sortByState } from '@/lib/atoms/sortByState'

const options = [
  {
    text: 'Most Upvotes',
    type: 'most-upvotes',
  },
  {
    text: 'Least Upvotes',
    type: 'least-upvotes',
  },
  {
    text: 'Most Comments',
    type: 'most-comments',
  },
  {
    text: 'Least Comments',
    type: 'least-comments',
  },
]

const sortObj = {
  'least-upvotes': 'Least Upvotes',
  'least-comments': 'Least Comments',
  'most-comments': 'Most Comments',
  'most-upvotes': 'Most Upvotes',
}

interface Props {
  setShowModal: Dispatch<SetStateAction<boolean>>
}

const ToolBar = (props: Props) => {
  const { setShowModal } = props
  const ref = useRef()
  const { data: session } = useSession()
  const { data: suggestions } = useGetSuggestions()
  const [sortState, setSortState] = useRecoilState(sortByState)
  const [isOpen, setFilterOpen] = useState(false)
  const [clickedAway, setClickedAway] = useState(false)
  const user = session?.user

  useClickAway(ref, () => {
    setFilterOpen(false)
    setClickedAway(true)

    setTimeout(() => {
      setClickedAway(false)
    }, 200)
  })

  const handleSetSortBy = async (type) => {
    await setSortState(type)
    setFilterOpen((state) => !state)
  }

  const handleOpen = async () => {
    !isOpen && !clickedAway && setFilterOpen((state) => !state)
  }

  return (
    <div className="fixed top-20 z-10 flex w-full bg-gray-light text-white lg:top-0 lg:pt-72 xl:top-0 xl:pt-10 xl:pl-96 xl:pr-20">
      <div className="w-full rounded-lg lg:container xl:px-0">
        <div className="flex w-full items-center justify-between bg-blue-navy p-4 lg:rounded-xl">
          <div className="flex items-center gap-10">
            <div className="hidden items-center gap-5 lg:flex">
              <Bulb />
              <p className="h3 flex">
                {suggestions &&
                  (suggestions.length !== 1
                    ? suggestions.length + ' Suggestions'
                    : suggestions.length + ' Suggestion')}
              </p>
            </div>
            <div className="h3 relative">
              <button onClick={handleOpen} className="flex items-center gap-2">
                <span className="hidden sm:flex">Sort by:</span>

                {sortObj[sortState]}

                <ChevronDownIcon
                  className={`${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  } h-5 w-5 transform transition-all duration-300`}
                />
              </button>
              <AnimatePresence exitBeforeEnter>
                {isOpen && (
                  <div
                    ref={ref}
                    className="absolute top-20 flex w-80 flex-col gap-4 rounded-lg bg-white text-black shadow-lg"
                  >
                    {options.map((choice) => (
                      <button
                        key={choice.type}
                        className={clsx(
                          'button-sort',
                          sortState === choice.type && 'text-fuschia'
                        )}
                        onClick={() => handleSetSortBy(choice.type)}
                      >
                        {choice.text}
                      </button>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex gap-10">
            <div className="hidden sm:flex">
              {user && (
                <button onClick={() => signOut()} className="button-session">
                  Signout
                </button>
              )}
              {!user && (
                <button
                  onClick={() => setShowModal(true)}
                  className="button-session"
                >
                  Signin
                </button>
              )}
            </div>
            {user ? (
              <Link href="/feedback/create">
                <a className="button flex">
                  <Plus className="text-white" />
                  Add Feedback
                </a>
              </Link>
            ) : (
              <button
                onClick={() => setShowModal(true)}
                className="button-session sm:hidden"
              >
                Signin
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToolBar
