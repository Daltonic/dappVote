import { AppProps } from 'next/app'
import '@/styles/global.css'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from 'react'
import { checkWallet } from '@/services/blockchain'
import CometChatNoSSR from '@/components/CometChatNoSSR'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState<boolean>(false)
  
  useEffect(() => {
    checkWallet()
    setShowChild(true)
  }, [])

  if (!showChild || typeof window === 'undefined') {
    return null
  } else {
    return (
      <Provider store={store}>
        <CometChatNoSSR />
        <Component {...pageProps} />

        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Provider>
    )
  }
}
