import { XIcon, MenuIcon } from '@heroicons/react/solid'
import useShowMobileNav from 'hooks/useShowMobileNav'
import Image from 'next/image'

const Header = () => {
  const [showMobileNav, setShowMobileNav] = useShowMobileNav()

  return (
    <div className="fixed z-20 flex h-20 w-full lg:hidden">
      <div className="fixed inset-0 h-20">
        <Image
          src="/images/background/tablet-header.png"
          alt="background image"
          layout="fill"
        />
      </div>
      <div className="container z-20 flex w-full items-center justify-between">
        <div className="flex flex-col gap-2 text-white">
          <h2 className="h2">Frontend Mentor</h2>
          <p className="body-1">Feedback Board</p>
        </div>
        <button onClick={() => setShowMobileNav((state) => !state)}>
          {showMobileNav ? (
            <XIcon className="h-10 w-10 text-white" />
          ) : (
            <MenuIcon className="h-10 w-10 text-white" />
          )}
        </button>
      </div>
    </div>
  )
}

export default Header
