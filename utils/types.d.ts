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
  wallet: string
  createModal: string
  updateModal: string
  deleteModal: string
  contestModal: string
  chatModal: string
  polls: PollStruct[]
  poll: PollStruct | null
  group: PollStruct | null
  contestants: ContestantStruct[]
  currentUser: PollStruct | null
}

export interface RootState {
  globalStates: GlobalState
}
