import { atom } from 'recoil'
import { v4 as uuidv4 } from 'uuid'

export const sortByState = atom({
  key: `sortByState-${uuidv4()}`,
  default: 'most-upvotes',
})
