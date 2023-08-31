import { initCometChat, checkAuthState } from '@/services/chat'
import { useEffect } from 'react'
import { globalActions } from '@/store/globalSlices'
import { useDispatch } from 'react-redux'

const CometChatNoSSR = () => {
  const { setCurrentUser } = globalActions
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        initCometChat().then(() => {
          checkAuthState().then((user) => {
            dispatch(setCurrentUser(JSON.parse(JSON.stringify(user))))
          })
        })
      }
    }, 500)
  }, [setCurrentUser])

  return null
}

export default CometChatNoSSR
