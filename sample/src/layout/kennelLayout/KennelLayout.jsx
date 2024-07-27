import React from 'react'
import Header from '@/component/kennel/Header'
import Sidebar from '@/component/kennel/Sidebar'
import { Outlet } from 'react-router-dom'
const KennelLayout = () => {
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

export default KennelLayout
