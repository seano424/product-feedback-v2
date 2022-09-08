import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import useShowMobileNav from 'hooks/useShowMobileNav'
import Link from 'next/link'

const filters = [
  {
    text: 'All',
    filter: 'all',
  },
  {
    text: 'UI',
    filter: 'ui',
  },
  {
    text: 'UX',
    filter: 'ux',
  },
  {
    text: 'Enhancement',
    filter: 'enhancement',
  },
  {
    text: 'Bug',
    filter: 'bug',
  },
  {
    text: 'Feature',
    filter: 'feature',
  },
]

const roadmap = [
  {
    name: 'Planned',
    amount: 2,
    type: 'planned',
  },
  {
    name: 'In-Progress',
    amount: 3,
    type: 'in-progress',
  },
  {
    name: 'Live',
    amount: 1,
    type: 'live',
  },
]

export default function Menu() {
  const [showMobileNav] = useShowMobileNav()
  const [isActive, setIsActive] = useState(0)

  const mobileMenuVariants = {
    hidden: { x: 600 },
    show: {
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
    exit: {
      x: 600,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <AnimatePresence exitBeforeEnter>
      {showMobileNav && (
        <m.div
          key="mobileMenu"
          variants={mobileMenuVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          className="fixed right-0 top-20 z-20 flex min-h-screen  w-2/3 flex-col gap-8 bg-gray-light p-5 pt-10 lg:hidden"
        >
          {/* Filters */}
          <div className="flex flex-wrap gap-5 rounded-[10px] bg-white p-5">
            {filters.map((filter, i) => (
              <button
                onClick={() => setIsActive(i)}
                className={`rounded-[10px] py-2 px-5 text-[13px] font-semibold leading-[19px]
                ${
                  i === isActive
                    ? 'bg-blue text-gray-light'
                    : 'bg-gray-light text-blue '
                }
                `}
                key={filter.filter}
              >
                {filter.text}
              </button>
            ))}
          </div>

          {/* Roadmap */}
          <div className="flex flex-col gap-10 rounded-[10px] bg-white p-5">
            <div className="flex justify-between">
              <h2 className="h2">Roadmap</h2>
              <Link href="/">
                <a className="body-1 text-blue underline underline-offset-1">
                  View
                </a>
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {roadmap.map((item, i) => (
                <div key={item.type} className="flex justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-2 w-2 rounded-full ${i === 0 && 'bg-orange'}
                      ${i === 1 && 'bg-purple-500'} ${
                        i === 2 && 'bg-teal-400'
                      }`}
                    ></div>
                    <p>{item.name}</p>
                  </div>
                  <p className="body-1">{item.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
