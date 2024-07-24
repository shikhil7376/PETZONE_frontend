import React from 'react'
import Header from '@/component/admin/Header'
import Sidebar from '@/component/admin/Sidebar'
import { Outlet } from 'react-router-dom'
const AdminLayout = () => {
  return (
    <div>
      <Header/>
         <div className='flex'>
         <div className='w-[16%]'>
         <Sidebar/>
         </div>
         <div className='w-[84%] mt-[72px]  '>
          <Outlet/>
         </div>
         </div>
    </div>
  )
}

export default AdminLayout
