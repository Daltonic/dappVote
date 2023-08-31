import { contestPoll } from '@/services/blockchain'
import { globalActions } from '@/store/globalSlices'
import { PollStruct, RootState } from '@/utils/types'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const ContestPoll: React.FC<{ poll: PollStruct }> = ({ poll }) => {
  const dispatch = useDispatch()
  const { setContestModal } = globalActions
  const { wallet, contestModal } = useSelector((states: RootState) => states.globalStates)

  const [contestant, setContestant] = useState({
    name: '',
    image: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContestant((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!contestant.name || !contestant.image) return
    if (wallet === '') return toast.warning('Connect wallet first!')

    await toast.promise(
      new Promise<void>((resolve, reject) => {
        contestPoll(poll.id, contestant.name, contestant.image)
          .then((tx) => {
            closeModal()
            console.log(tx)
            resolve(tx)
          })
          .catch((error) => reject(error))
      }),
      {
        pending: 'Approve transaction...',
        success: 'Poll contested successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  const closeModal = () => {
    dispatch(setContestModal('scale-0'))
    setContestant({
      name: '',
      image: '',
    })
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

          <form
            onClick={handleSubmit}
            className="flex flex-col justify-center items-start rounded-xl mt-5 mb-5"
          >
            <div className="py-4 w-full border border-[#212D4A] rounded-full flex items-center px-4 mb-3 mt-2">
              <input
                placeholder="Contestant Name"
                className="bg-transparent outline-none w-full placeholder-[#929292] text-sm"
                name="name"
                value={contestant.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="py-4 w-full border border-[#212D4A] rounded-full flex items-center px-4 mb-3 mt-2">
              <input
                placeholder="Avater URL"
                type="url"
                className="bg-transparent outline-none w-full placeholder-[#929292] text-sm"
                name="image"
                accept="image/*"
                value={contestant.image}
                onChange={handleChange}
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
