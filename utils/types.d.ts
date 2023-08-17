export interface GlobalState {
  wallet: string | null
  createModal: string | null
}

export interface RootState {
  globalStates: GlobalState
}
