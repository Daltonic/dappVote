import { initCometChat, checkAuthState } from '@/services/chat'
import React, { useEffect } from 'react'
import { globalActions } from '@/store/globalSlices'
import { useDispatch } from 'react-redux'

const CometChatNoSSR: React.FC = () => {
  const { setCurrentUser } = globalActions
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchCometChat = async () => {
      initCometChat().then(() => {
        checkAuthState().then((user) => {
          dispatch(setCurrentUser(JSON.parse(JSON.stringify(user))))
        })
      })
    }

    fetchCometChat()
  }, [dispatch, setCurrentUser])

  return null
}

export default CometChatNoSSR
