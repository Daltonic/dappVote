import Identicon from 'react-identicons'
import { globalActions } from '@/store/globalSlices'
import { RootState } from '@/utils/types'
import React, { FormEvent, useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { truncate } from '@/services/blockchain'
import { getMessages, listenForMessage, sendMessage } from '@/services/chat'
import { toast } from 'react-toastify'

const ChatModal: React.FC<{ group: any }> = ({ group }) => {
  const dispatch = useDispatch()
  const { setChatModal } = globalActions
  const { wallet, chatModal } = useSelector((states: RootState) => states.globalStates)
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<any[]>([])
  const [shouldAutoScroll, setShouldAutoScroll] = useState<boolean>(true)

  useEffect(() => {
    const handleListing = () => {
      listenForMessage(group?.guid).then((msg) => {
        setMessages((prevMsgs) => [...prevMsgs, msg])
        setShouldAutoScroll(true)
      })
    }

    const handleMessageRetrieval = () => {
      getMessages(group?.guid).then((msgs) => {
        setMessages(msgs as any[])
        setShouldAutoScroll(true)
      })
    }

    setTimeout(async () => {
      if (typeof window !== 'undefined') {
        handleMessageRetrieval()
        handleListing()
      }
    }, 500)
  }, [group?.guid])

  useEffect(() => {
    if (shouldAutoScroll) {
      scrollToEnd()
    }
  }, [messages, shouldAutoScroll])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!message) return
    if (wallet === '') return toast.warning('Connect wallet first!')

    await sendMessage(group?.guid, message)
      .then((msg) => {
        setMessages((prevMsgs) => [...prevMsgs, msg])
        setShouldAutoScroll(true)
        scrollToEnd()
        setMessage('')
      })
      .catch((error) => console.log(error))
  }

  const scrollToEnd = () => {
    const elmnt: HTMLElement | null = document.getElementById('messages-container')
    if (elmnt) elmnt.scrollTop = elmnt.scrollHeight
  }

  const closeModal = () => {
    dispatch(setChatModal('scale-0'))
    setMessage('')
    scrollToEnd()
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
            <div className="py-4" />
            {messages.map((msg: any, i: number) => (
              <Message
                text={msg.text}
                owner={msg.sender.uid}
                time={Number(msg.sendAt + '000')}
                you={wallet === msg.sender.uid}
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
          <p className="text-gray-500 text-xs font-semibold space-x-2 w-4/5">{text}</p>
        </div>
      </div>
    </div>
  )
}

export default ChatModal
