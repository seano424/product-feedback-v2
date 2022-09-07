import { AnimatePresence, m } from 'framer-motion'
import useShowMobileNav from 'hooks/useShowMobileNav'

const links = []

export default function Menu() {
  const [showMobileNav, setShowMobileNav] = useShowMobileNav()

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: -200 },
    show: { opacity: 1, x: 0 },
    exit: {
      opacity: 0,
      x: -600,
      transition: {
        duration: 0.6,
        ease: [0.83, 0, 0.17, 1],
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
          className="px-base py-base bg-light/90 dark:bg-dark/90 fixed  top-20 z-20 flex min-h-screen w-10/12 flex-col gap-8 shadow-2xl filter backdrop-blur-sm md:w-2/3 lg:hidden"
        >
          {links.map((link) => (
            <button key={link.title}>{link.title}</button>
          ))}
        </m.div>
      )}
    </AnimatePresence>
  )
}
