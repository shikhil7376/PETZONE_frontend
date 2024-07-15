import { Route,Routes } from 'react-router-dom'
import Main from './component/HOME/Main'
import SignUpForm from './component/SIGNUP/SignUpForm'
import OTPVerificationPage from './component/OTP/OTPVerificationPage'
import './App.css'

function App() {


  return (
    <>
     <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/signup'element={<SignUpForm/>}/>
      <Route path='/verifyOtp' element={<OTPVerificationPage/>}/>
     </Routes>
    </>
  )
}

export default App
