import { AnimatePresence, m } from 'framer-motion'
import useShowMobileNav from 'lib/hooks/useShowMobileNav'
import Categories from '../Categories'
import RoadMapCard from '../Roadmap/RoadMapCard'
import { useRef } from 'react'
import { useSession, signOut } from 'next-auth/react'

export default function Menu() {
  const [showMobileNav] = useShowMobileNav()
  const ref = useRef(null)
  const { data: session } = useSession()

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
          <RoadMapCard />
          {session.user && (
            <div>
              <button onClick={() => signOut()} className="button-session">
                Signout
              </button>
            </div>
          )}
        </m.div>
      )}
    </AnimatePresence>
  )
}
