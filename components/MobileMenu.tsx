import { AnimatePresence, m } from 'framer-motion'
import useShowMobileNav from 'hooks/useShowMobileNav'

const links = []

export default function Menu() {
  const [showMobileNav] = useShowMobileNav()

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
          className="px-base py-base fixed right-0 top-20 z-20 min-h-screen  w-2/3 bg-gray-light lg:hidden"
        >
          {links.map((link) => (
            <button key={link.title}>{link.title}</button>
          ))}
        </m.div>
      )}
    </AnimatePresence>
  )
}
