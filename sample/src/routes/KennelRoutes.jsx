import React from 'react'
import { Suspense,lazy } from 'react'
import LoadingSpinner from '@/component/common/LoadingSpinner'
import { Route,Routes } from 'react-router-dom'
import KennelLayout from '@/layout/kennelLayout/KennelLayout'
import KennelProtected from '@/protected/KennelProtected'

const KennelDashboard = lazy(()=>import('../Pages/Kennel/Dashboard'))
const KennelSignup = lazy(()=>import('../Pages/Kennel/SignUp'))
const KennnelOtp = lazy(()=>import('../Pages/Kennel/Otp'))
const KennelLogin = lazy(()=>import('../Pages/Kennel/SignIn'))
const KennelProfile = lazy(()=>import('../Pages/Kennel/ProfilePage'))
const KennelRoutes = () => {
  return (
   <Suspense fallback={<LoadingSpinner/>}>
    <Routes>
      <Route element={<KennelLayout/>}>
      <Route element={<KennelProtected/>}>
      <Route path='/dashboard' element={<KennelDashboard/>}/>
      <Route path='/profile' element={<KennelProfile/>}/>
      </Route>
      </Route>
      <Route path='/signup' element={<KennelSignup/>}/>
      <Route path='/otp' element={<KennnelOtp/>}/>
      <Route path='/login' element={<KennelLogin/>}/>
    </Routes>
   </Suspense>
  )
}

export default KennelRoutes
