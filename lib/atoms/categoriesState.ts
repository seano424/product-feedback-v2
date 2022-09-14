import { atom } from 'recoil'
import { v4 as uuidv4 } from 'uuid'

export const categoriesState = atom({
  key: `categoriesState-${uuidv4()}`,
  default: 'all',
})
