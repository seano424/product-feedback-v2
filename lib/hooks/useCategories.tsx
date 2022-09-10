import { v4 as uuidv4 } from 'uuid'
import { atom, useRecoilState } from 'recoil'

export const categoriesState = atom({
  key: `categories-${uuidv4()}`,
  default: [],
})

const useCategories = () => useRecoilState(categoriesState)

export default useCategories
