import { v4 as uuidv4 } from 'uuid'
import { atom, useRecoilState } from 'recoil'

export const suggestionsState = atom({
  key: `suggestions-${uuidv4()}`,
  default: [],
})

const useSuggestions = () => useRecoilState(suggestionsState)

export default useSuggestions
