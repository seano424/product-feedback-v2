import { v4 as uuidv4 } from 'uuid'
import { atom, useRecoilState } from 'recoil'

export const statusesState = atom({
  key: `statuses-${uuidv4()}`,
  default: [],
})

const useStatuses = () => useRecoilState(statusesState)

export default useStatuses
