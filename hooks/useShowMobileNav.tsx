import { v4 as uuidv4 } from 'uuid'
import { atom, useRecoilState } from 'recoil'

const showMobileNav = atom({
  key: `showMobileNav-${uuidv4()}`,
  default: false,
})

const useShowMobileNav = () => useRecoilState(showMobileNav)

export default useShowMobileNav
