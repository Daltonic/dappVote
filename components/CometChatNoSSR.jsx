import { initCometChat, checkAuthState } from '@/services/chat'
import { useEffect } from 'react'
import { globalActions } from '@/store/globalSlices'
import { useDispatch } from 'react-redux'

const CometChatNoSSR = () => {
  window.CometChat = require('@cometchat-pro/chat').CometChat
  const { CometChat } = window
  const { setCurrentUser } = globalActions
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      if (typeof window !== 'undefined' && CometChat) {
        initCometChat(CometChat).then(() => {
          checkAuthState(CometChat).then((user) => {
            dispatch(setCurrentUser(JSON.parse(JSON.stringify(user))))
          })
        })
      }
    }, 500)
  }, [setCurrentUser, CometChat])

  return null
}

export default CometChatNoSSR
