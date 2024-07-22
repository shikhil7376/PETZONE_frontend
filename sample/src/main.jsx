import React from 'react'
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import { ToastContainer } from 'react-toastify'
import store from './redux/store.js'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Modal from 'react-modal';

Modal.setAppElement('#root');

const GOOGLE_ID ="158532328570-fmr40r5pk4u400vmn2u8f23d2e2o0m29.apps.googleusercontent.com"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={GOOGLE_ID}>
  <React.StrictMode>
   <NextUIProvider>
      <App/>
    </NextUIProvider>
    <ToastContainer/>
  </React.StrictMode>
  </GoogleOAuthProvider>
  </Provider>
)
