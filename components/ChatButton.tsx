import React from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { FiLogIn } from 'react-icons/fi'
import { HiLogin, HiUserGroup, HiChat } from 'react-icons/hi'
import { SiGnuprivacyguard } from 'react-icons/si'
import { Menu } from '@headlessui/react'
import { toast } from 'react-toastify'
import {
  createNewGroup,
  joinGroup,
  logOutWithCometChat,
  loginWithCometChat,
  signUpWithCometChat,
} from '../services/chat'
import { useDispatch, useSelector } from 'react-redux'
import { globalActions } from '@/store/globalSlices'
import { PollStruct, RootState } from '@/utils/types'

const ChatButton: React.FC<{ poll: PollStruct; group: any }> = ({ poll, group }) => {
  const dispatch = useDispatch()
  const { setCurrentUser, setChatModal, setGroup } = globalActions
  const { wallet, currentUser } = useSelector((states: RootState) => states.globalStates)

  const handleSignUp = async () => {
    if (wallet === '') return toast.warning('Connect wallet first!')
    await toast.promise(
      new Promise((resolve, reject) => {
        signUpWithCometChat(wallet)
          .then((user) => resolve(user))
          .catch((error) => {
            alert(JSON.stringify(error))
            reject(error)
          })
      }),
      {
        pending: 'Signning up...',
        success: 'Signed up successfully, please login 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  const handleLogin = async () => {
    if (wallet === '') return toast.warning('Connect wallet first!')
    await toast.promise(
      new Promise((resolve, reject) => {
        loginWithCometChat(wallet)
          .then((user) => {
            dispatch(setCurrentUser(JSON.parse(JSON.stringify(user))))
            resolve(user)
          })
          .catch((error) => {
            alert(JSON.stringify(error))
            reject(error)
          })
      }),
      {
        pending: 'Logging...',
        success: 'Logged in successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  const handleLogout = async () => {
    if (wallet === '') return toast.warning('Connect wallet first!')
    await toast.promise(
      new Promise((resolve, reject) => {
        logOutWithCometChat()
          .then(() => {
            dispatch(setCurrentUser(null))
            resolve(null)
          })
          .catch((error) => {
            alert(JSON.stringify(error))
            reject(error)
          })
      }),
      {
        pending: 'Leaving...',
        success: 'Logged out successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  const handleCreateGroup = async () => {
    if (wallet === '') return toast.warning('Connect wallet first!')
    await toast.promise(
      new Promise((resolve, reject) => {
        createNewGroup(`guid_${poll.id}`, poll.title)
          .then((group) => {
            dispatch(setGroup(JSON.parse(JSON.stringify(group))))
            resolve(group)
          })
          .catch((error) => {
            alert(JSON.stringify(error))
            reject(error)
          })
      }),
      {
        pending: 'Creating group...',
        success: 'Group created successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  const handleJoinGroup = async () => {
    if (wallet === '') return toast.warning('Connect wallet first!')
    await toast.promise(
      new Promise((resolve, reject) => {
        joinGroup(`guid_${poll.id}`)
          .then((group) => {
            dispatch(setGroup(JSON.parse(JSON.stringify(group))))
            resolve(group)
          })
          .catch((error) => {
            alert(JSON.stringify(error))
            reject(error)
          })
      }),
      {
        pending: 'Joining group...',
        success: 'Group joined successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  return (
    <Menu as="div" className="inline-block text-left mx-auto fixed right-5 bottom-[80px]">
      <Menu.Button
        className="bg-[#1B5CFE] hover:bg-blue-700 text-white font-bold
        rounded-full transition-all duration-300 p-3 focus:outline-none
          focus-visible:ring-2 focus-visible:ring-white
          focus-visible:ring-opacity-75 shadow-md shadow-black"
        as="button"
      >
        <RiArrowDropDownLine size={20} />
      </Menu.Button>
      <Menu.Items
        className="absolute right-0 bottom-14 mt-2 w-56 origin-top-right
          divide-y divide-gray-100 rounded-md bg-white shadow-lg shadow-black
          ing-1 ring-black ring-opacity-5 focus:outline-none"
      >
        {!currentUser ? (
          <>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`flex justify-start items-center space-x-1 ${
                    active ? 'bg-gray-200 text-black' : 'text-red-500'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={handleSignUp}
                >
                  <SiGnuprivacyguard size={17} />
                  <span>SignUp</span>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`flex justify-start items-center space-x-1 ${
                    active ? 'bg-gray-200 text-black' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={handleLogin}
                >
                  <FiLogIn size={17} />
                  <span>Login</span>
                </button>
              )}
            </Menu.Item>
          </>
        ) : (
          <>
            {!group && wallet === poll.director && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`flex justify-start items-center space-x-1 ${
                      active ? 'bg-gray-200 text-black' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => handleCreateGroup()}
                  >
                    <HiUserGroup size={17} />
                    <span>Create Group</span>
                  </button>
                )}
              </Menu.Item>
            )}

            {group && !group.hasJoined && wallet !== poll.director && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`flex justify-start items-center space-x-1 ${
                      active ? 'bg-gray-200 text-black' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => handleJoinGroup()}
                  >
                    <FaUserPlus size={17} />
                    <span>Join Group</span>
                  </button>
                )}
              </Menu.Item>
            )}
            {group?.hasJoined && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`flex justify-start items-center space-x-1 ${
                      active ? 'bg-gray-200 text-black' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => dispatch(setChatModal('scale-100'))}
                  >
                    <HiChat size={17} />
                    <span>Chats</span>
                  </button>
                )}
              </Menu.Item>
            )}
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`flex justify-start items-center space-x-1 ${
                    active ? 'bg-gray-200 text-black' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={handleLogout}
                >
                  <HiLogin size={17} />
                  <span>Logout</span>
                </button>
              )}
            </Menu.Item>
          </>
        )}
      </Menu.Items>
    </Menu>
  )
}

export default ChatButton
