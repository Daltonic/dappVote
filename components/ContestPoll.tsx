import { globalActions } from '@/store/globalSlices'
import { RootState } from '@/utils/types'
import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

const ContestPoll = () => {
  const dispatch = useDispatch()
  const { setContestModal } = globalActions
  const { contestModal } = useSelector((states: RootState) => states.globalStates)

  const closeModal = () => {
    dispatch(setContestModal('scale-0'))
    console.log('Hello')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
    bg-black bg-opacity-50 transform z-50 transition-transform duration-300 ${contestModal}`}
    >
      <div className="bg-[#0c0c10] text-[#BBBBBB] shadow-lg shadow-[#1B5CFE] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold">Become a Contestant</p>
            <button onClick={closeModal} className="border-0 bg-transparent focus:outline-none">
              <FaTimes />
            </button>
          </div>

          <form className="flex flex-col justify-center items-start rounded-xl mt-5 mb-5">
            <div className="py-4 w-full border border-[#212D4A] rounded-full flex items-center px-4 mb-3 mt-2">
              <input
                placeholder="Contestant Name"
                className="bg-transparent outline-none w-full placeholder-[#929292] text-sm"
                name="name"
                required
              />
            </div>

            <div className="py-4 w-full border border-[#212D4A] rounded-full flex items-center px-4 mb-3 mt-2">
              <input
                placeholder="Avater URL"
                type="url"
                className="bg-transparent outline-none w-full placeholder-[#929292] text-sm"
                name="banner"
                required
              />
            </div>

            <button
              className="h-[48px] w-full block mt-2 px-3 rounded-full text-sm font-bold
                transition-all duration-300 bg-[#1B5CFE] hover:bg-blue-500"
            >
              Contest Now
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContestPoll
