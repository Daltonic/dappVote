import { GlobalState } from '@/utils/types'
import { PayloadAction } from '@reduxjs/toolkit'

export const globalActions = {
  setWallet: (state: GlobalState, action: PayloadAction<string>) => {
    state.wallet = action.payload
  },
  setCreateModal: (state: GlobalState, action: PayloadAction<string>) => {
    state.createModal = action.payload
  },
}
