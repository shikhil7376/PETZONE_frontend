import React from 'react'
import { Suspense,lazy } from 'react'
import { Route,Routes } from 'react-router-dom'
import UserLayout from '@/layout/userLayout/UserLayout'
import LoadingSpinner from '@/component/common/LoadingSpinner'
import Signup from '@/Pages/Kennel/SignUp'
import Otp from '@/Pages/Kennel/Otp'


const SignUpPage = lazy(()=>import('../Pages/User/SignUpForm'))
const OTP = lazy(()=>import('../Pages/User/OtpVerificationPage'))
const LoginPage = lazy(()=>import('../Pages/User/Login'))
const Home = lazy(()=>import('../component/user/Home'))
const UserRoutes = () => {
  return (
   <Suspense fallback={<LoadingSpinner/>}>
    <Routes>
      <Route element={<UserLayout/>}>
        <Route index element={<Home/>}/>
      </Route>
        <Route path='register' element={<SignUpPage/>}/>
        <Route path='Otp' element={<OTP/>}/>
         <Route path='login' element={<LoginPage/>}/>
         <Route path='/signup' element={<Signup/>}/>
         <Route path='/kennelotp' element={<Otp/>}/>
    </Routes>
   </Suspense>
  )
}

export default UserRoutes
