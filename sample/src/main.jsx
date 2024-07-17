import React from 'react'
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import { ToastContainer } from 'react-toastify'
import store from './redux/store.js'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
   <NextUIProvider>
      <App/>
      <ToastContainer/>
    </NextUIProvider>
  </React.StrictMode>
  </Provider>
)
