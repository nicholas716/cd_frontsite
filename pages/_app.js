import React from 'react'
import { Provider } from 'react-redux'

import store from 'store.js'

import 'styles/style.scss'

import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || (page => page)

  return (
    <>
      <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default MyApp
