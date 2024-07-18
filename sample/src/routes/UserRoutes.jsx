import React from 'react'
import { Suspense,lazy } from 'react'
import { Route,Routes } from 'react-router-dom'
import LoadingSpinner from '@/component/common/LoadingSpinner'

const SignUpPage = lazy(()=>import('../Pages/User/SignUpForm'))
const OTP = lazy(()=>import('../Pages/User/OtpVerificationPage'))
const LoginPage = lazy(()=>import('../Pages/User/Login'))
const UserRoutes = () => {
  return (
   <Suspense fallback={<LoadingSpinner/>}>
    <Routes>
        <Route path='register' element={<SignUpPage/>}/>
        <Route path='Otp' element={<OTP/>}/>
         <Route path='login' element={<LoginPage/>}/>
    </Routes>
   </Suspense>
  )
}

export default UserRoutes
