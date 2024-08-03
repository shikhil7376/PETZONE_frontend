import React from 'react'
import Header from '@/component/user/Header'
import Footer from '@/component/user/Footer'
import { Outlet } from 'react-router-dom'
const UserLayout = () => {
  return (
   
    <div className='bg-custom-gradient h-screen fixed top-0 left-0 my-0 w-full'>
    <div className='bg-white w-11/12 mx-auto mt-10 rounded-3xl overflow-y-auto h-screen no-scrollbar'>
      <Header/>
      <Outlet/>
    </div>
    <Footer/>
  </div>
 

  )
}

export default UserLayout
