export interface TruncateParams {
  text: string
  startChars: number
  endChars: number
  maxLength: number
}

export interface PollParams {
  image: string
  title: string
  description: string
  startsAt: number | string
  endsAt: number | string
}

export interface PollStruct {
  id: number
  image: string
  title: string
  description: string
  votes: number
  contestants: number
  deleted: boolean
  director: string
  startsAt: number
  endsAt: number
  timestamp: number
  avatars: string[]
  voters: string[]
}

export interface ContestantStruct {
  id: number
  image: string
  name: string
  voter: string
  votes: number
  voters: string[]
}

export interface GlobalState {
  wallet: string | null
  createModal: string | null
  updateModal: string | null
  deleteModal: string | null
  contestModal: string | null
  polls: PollStruct[]
  poll: PollStruct | null
  contestants: ContestantStruct[]
}

export interface RootState {
  globalStates: GlobalState
}
