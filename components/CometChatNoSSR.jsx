import { initCometChat, checkAuthState } from '@/services/chat'
import { useEffect } from 'react'
import { globalActions } from '@/store/globalSlices'
import { useDispatch } from 'react-redux'

const CometChatNoSSR = () => {
  window.CometChat = require('@cometchat-pro/chat').CometChat
  const { setCurrentUser } = globalActions
  const dispatch = useDispatch()

  console.log(process.env.NEXT_APP_RPC_URL);

  useEffect(() => {
    initCometChat(CometChat).then(() => {
      checkAuthState(CometChat).then((user) => {
        dispatch(setCurrentUser(JSON.parse(JSON.stringify(user))))
      })
    })
  }, [dispatch, setCurrentUser])
  return null
}

export default CometChatNoSSR
