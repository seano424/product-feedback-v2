import useShowMobileNav from 'lib/hooks/useShowMobileNav'

const Overlay = () => {
  const [isMenuOpen] = useShowMobileNav()

  return (
    <div
      className={`${
        isMenuOpen
          ? 'fixed inset-0 top-20 z-20 bg-black/70 opacity-100'
          : 'opacity-0'
      } transition-all duration-500 ease-in-out lg:hidden`}
    ></div>
  )
}

export default Overlay
