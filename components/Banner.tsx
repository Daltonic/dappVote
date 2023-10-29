import { globalActions } from '@/store/globalSlices'
import { RootState } from '@/utils/types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Banner = () => {
  const dispatch = useDispatch()
  const { setCreateModal } = globalActions
  const { wallet } = useSelector((states: RootState) => states.globalStates)

  const onPressCreate = () => {
    if (wallet === '') return toast.warning('Connect wallet first!')
    dispatch(setCreateModal('scale-100'))
  }

  return (
    <main className="mx-auto text-center space-y-8">
      <h1 className="text-[45px] font-[600px] text-center leading-none">Vote On Prompt</h1>
      <p className="text-[16px] font-[500px] text-center">
      Our project is a DApp that aims to democratize access to superintelligent systems that may emerge in the near future. On our website, users can propose new prompts or vote on existing ones by staking FLR tokens. The prompts are then submitted to an LLM via Flock SDK at regular intervals. Users can also view the history of all prompts and their responses from the connected LLM and in the future a superintelligent AI. We believe that everyone should have a say in what questions are asked to the AI, rather than letting a few powerful entities control it. This way, we can reduce the risk of misuse and abuse of the AI, and foster a more inclusive and transparent dialogue with it.
      </p>

      <button
        className="text-black h-[45px] w-[148px] rounded-full transition-all duration-300
        border border-gray-400 bg-white hover:bg-opacity-20 hover:text-white"
        onClick={onPressCreate}
      >
        Create poll
      </button>
    </main>
  )
}

export default Banner
