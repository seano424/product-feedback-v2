import MobileHeader from './MobileHeader'
import MobileMenu from './MobileMenu'
import MobileOverlay from './MobileOverlay'
import { useClickAway } from 'react-use'
import { useRef } from 'react'
import useShowMobileNav from 'lib/hooks/useShowMobileNav'

const MobileWrapper = () => {
  const ref = useRef(null)
  const [_, setShowMobileNav] = useShowMobileNav()

  useClickAway(ref, () => {
    setShowMobileNav(false)
  })
  return (
    <>
      <div ref={ref}>
        <MobileHeader />
        <MobileMenu />
      </div>
      <MobileOverlay />
    </>
  )
}

export default MobileWrapper
