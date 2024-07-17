import React from 'react'
import { Suspense,lazy } from 'react'
import { Route,Routes } from 'react-router-dom'
import LoadingSpinner from '@/component/common/LoadingSpinner'
import Error404 from '@/Pages/Error404'

const SignUpPage = lazy(()=>import('../Pages/User/SignUpForm'))
const OTP = lazy(()=>import('../Pages/User/OtpVerificationPage'))
const UserRoutes = () => {
  return (
   <Suspense fallback={<LoadingSpinner/>}>
    <Routes>
        <Route path='register' element={<SignUpPage/>}/>
        <Route path='OTP' element={<OTP/>}/>
        <Route path='send' element={<Error404/>}/>
    </Routes>
   </Suspense>
  )
}

export default UserRoutes
