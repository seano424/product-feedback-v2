import { XIcon, MenuIcon } from '@heroicons/react/solid'
import useShowMobileNav from 'hooks/useShowMobileNav'

const Header = () => {
  const [showMobileNav, setShowMobileNav] = useShowMobileNav()

  return (
    <div className="fixed flex h-20 w-full items-center justify-between bg-white">
      <div className="flex flex-col gap-2">
        <h2 className="h2">Frontend Mentor</h2>
        <h3 className="h3">Feedback Board</h3>
      </div>
      <button onClick={() => setShowMobileNav((state) => !state)}>
        {showMobileNav ? (
          <MenuIcon className="h-10 w-10" />
        ) : (
          <XIcon className="h-10 w-10" />
        )}
      </button>
    </div>
  )
}

export default Header
