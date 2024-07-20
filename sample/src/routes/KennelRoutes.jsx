import React from 'react'
import { Suspense,lazy } from 'react'
import LoadingSpinner from '@/component/common/LoadingSpinner'
import { Route,Routes } from 'react-router-dom'

const KennelSignup = lazy(()=>import('../Pages/Kennel/SignUp'))
const KennnelOtp = lazy(()=>import('../Pages/Kennel/Otp'))
const KennelRoutes = () => {
  return (
   <Suspense fallback={<LoadingSpinner/>}>
    <Routes>
      <Route path='/signup' element={<KennelSignup/>}/>
      <Route path='/otp' element={<KennnelOtp/>}/>
    </Routes>
   </Suspense>
  )
}

export default KennelRoutes
