import Identicon from 'react-identicons'
import { globalActions } from '@/store/globalSlices'
import { RootState } from '@/utils/types'
import React, { FormEvent, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { truncate } from '@/services/blockchain'

const ChatModal: React.FC = () => {
  const dispatch = useDispatch()
  const { setChatModal } = globalActions
  const { wallet, chatModal } = useSelector((states: RootState) => states.globalStates)
  const [message, setMessage] = useState<string>('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!message) return

    // createPoll(poll)
    //   .then((tx) => {
    //     closeModal()
    //     console.log(tx)
    //     resolve(tx)
    //   })
    //   .catch((error) => reject(error))
  }

  const closeModal = () => {
    dispatch(setChatModal('scale-0'))
    setMessage('')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
    bg-black bg-opacity-50 transform z-50 transition-transform duration-300 ${chatModal}`}
    >
      <div className="bg-[#0c0c10] text-[#BBBBBB] shadow-lg shadow-[#1B5CFE] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold">Chat</p>
            <button onClick={closeModal} className="border-0 bg-transparent focus:outline-none">
              <FaTimes />
            </button>
          </div>

          <div
            id="messages-container"
            className="flex flex-col justify-center items-start rounded-xl my-5 pt-5 max-h-[20rem] overflow-y-auto"
          >
            <div className='py-10' />
            {Array(7).fill(2).map((msg: any, i: number) => (
              <Message
                text="Hello Friend"
                owner="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
                time={Date.now()}
                you={wallet === '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'}
                key={i}
              />
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-start rounded-xl mt-5 mb-5"
          >
            <div className="py-4 w-full border border-[#212D4A] rounded-full flex items-center px-4 mb-3 mt-2">
              <input
                placeholder="Send message..."
                className="bg-transparent outline-none w-full placeholder-[#929292] text-sm"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const Message = ({ text, time, owner, you }) => {
  return (
    <div className="flex justify-start space-x-4 px-6 mb-4 w-full">
      <div className="flex justify-start items-center w-full">
        <Identicon
          className="w-12 h-12 rounded-full object-cover mr-4 shadow-md bg-gray-400"
          string={owner}
          size={30}
        />

        <div className="w-full">
          <h3 className="text-md font-bold">
            {you ? '@You' : truncate({ text: owner, startChars: 4, endChars: 4, maxLength: 11 })}
          </h3>
          <p className="text-gray-500 text-xs font-semibold space-x-2 w-4/5">
            {text} <span className="font-light text-xs">{new Date(time).toLocaleString()}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChatModal
