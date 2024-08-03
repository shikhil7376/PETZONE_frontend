import React from 'react'
import { Suspense,lazy } from 'react'
import { Route,Routes } from 'react-router-dom'
import UserLayout from '@/layout/userLayout/UserLayout'
import LoadingSpinner from '@/component/common/LoadingSpinner'
import Signup from '@/Pages/Kennel/SignUp'
import Otp from '@/Pages/Kennel/Otp'
import ProtectedRoute from '@/protected/ProtectedRoute'


const SignUpPage = lazy(()=>import('../Pages/User/SignUpForm'))
const OTP = lazy(()=>import('../Pages/User/OtpVerificationPage'))
const LoginPage = lazy(()=>import('../Pages/User/Login'))
const Home = lazy(()=>import('../component/user/Home'))
const Fotp = lazy(()=>import('../Pages/User/ForgotOtp'))
const Profile = lazy(()=>import('../Pages/User/Profile'))
const ResetPassword = lazy(()=>import('../component/common/ResetPassword'))
const ListKennels = lazy(()=>import('../component/user/KennelList'))
const ViewDetails = lazy(()=>import('../component/user/ViewDetails'))
const Booking = lazy(()=>import('../component/user/Booking'))
const UserRoutes = () => {
  return (
   <Suspense fallback={<LoadingSpinner/>}>
    <Routes>
      <Route element={<UserLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='/get-kennels' element={<ListKennels/>}/>
        <Route path='/view-details/:cageid/:fromdate/:todate' element={<ViewDetails/>}/>
        <Route path='/booking/:cageid/:fromdate/:todate' element={<Booking/>}/>
        <Route element={<ProtectedRoute/>}>
        <Route path='/profile' element={<Profile/>}/>
        </Route>
      </Route>
        <Route path='register' element={<SignUpPage/>}/>
        <Route path='Otp' element={<OTP/>}/>
         <Route path='login' element={<LoginPage/>}/>
         <Route path='/signup' element={<Signup/>}/>
         <Route path='/kennelotp' element={<Otp/>}/>
         <Route path='/fotp' element={<Fotp/>}/>
         <Route path='/reset-password' element={<ResetPassword/>}/>
    </Routes>
   </Suspense>
  )
}

export default UserRoutes
