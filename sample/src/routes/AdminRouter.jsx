import React from 'react'
import { Suspense,lazy } from 'react'
import LoadingSpinner from '@/component/common/LoadingSpinner'
import { Routes,Route } from 'react-router-dom'

const AdminLayout = lazy(()=>import('../layout/adminLayout/AdminLayout'))
const AdminDashboard = lazy(()=>import('../Pages/Admin/Dashboard'))
const Users = lazy(()=>import('../Pages/Admin/Users'))
const KennelApproval = lazy(()=>import('../Pages/Admin/KennelApproval'))
const VerifiedKennelOwner  = lazy(()=>import('../Pages/Admin/VerifiedKennelOwner'))
const AdminRouter = () => {
  return (
   <Suspense fallback={<LoadingSpinner/>}>
      <Routes>
        <Route element={<AdminLayout/>}>
        <Route path='/dashboard' element={<AdminDashboard/>}/>
         <Route path='/users' element={<Users/>}/>
         <Route path='/kennelapproval' element={<KennelApproval/>}/>
         <Route path='/verifiedKennelOwner' element={<VerifiedKennelOwner/>}/>
        </Route>
      </Routes>
   </Suspense>
  )
}

export default AdminRouter
