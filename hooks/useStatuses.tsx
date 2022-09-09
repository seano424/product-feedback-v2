import { v4 as uuidv4 } from 'uuid'
import { atom, useRecoilState } from 'recoil'

export interface Status {
  type: string
  name: string
  suggestions: any[]
}

export const statusesState = atom({
  key: `statuses-${uuidv4()}`,
  default: [] as Status[],
})

const useStatuses = () => useRecoilState(statusesState)

export default useStatuses
