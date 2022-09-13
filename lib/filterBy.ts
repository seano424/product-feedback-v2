import { atom } from 'recoil'
import { v4 as uuidv4 } from 'uuid'

export const filterByState = atom({
  key: `filterByState-${uuidv4()}`,
  default: 'all',
})
