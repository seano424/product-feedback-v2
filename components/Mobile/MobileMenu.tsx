import { AnimatePresence, m } from 'framer-motion'
import useShowMobileNav from 'lib/hooks/useShowMobileNav'
import Categories from '../Categories'
import Statuses from '../Statuses'
import { useClickAway } from 'react-use'
import { useRef } from 'react'

export default function Menu() {
  const [showMobileNav, setShowMobileNav] = useShowMobileNav()
  const ref = useRef(null)
  useClickAway(ref, () => {
    console.log('clicked outside!')
    setShowMobileNav(false)
  })

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
          ref={ref}
          key="mobileMenu"
          variants={mobileMenuVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          className="fixed right-0 top-20 z-50 flex min-h-screen  w-2/3 flex-col gap-8 bg-gray-light p-5 pt-10 lg:hidden"
        >
          <Categories />
          <Statuses />
        </m.div>
      )}
    </AnimatePresence>
  )
}
