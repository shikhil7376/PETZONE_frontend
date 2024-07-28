import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from "@nextui-org/react";


const Profile = () => {
    const userData = useSelector((state)=>state.user.userdata)
     
  return (
    <div className='h-auto relative'>
      <div className='h-[400px] bg-slate-100 flex justify-center relative'>
        <img src='/pics/cover5.jpg' alt='Cover' className='absolute top-0 left-0 w-full h-full object-cover z-0' />
        <div className='relative z-10'>
          <div className='bg-lightwhite h-[150px] w-[150px] rounded-full text-center flex justify-center items-center overflow-hidden drop-shadow-md absolute right-1 bottom-[-73px]'>
            <img src='/pics/profile.jpg' alt='Profile' className='h-full w-full object-cover' />
          </div>
        </div>
      </div>
      <div className='h-[250px] w-[350px] rounded-lg mt-[50px] flex flex-col items-center p-4 drop-shadow-md ml-[350px]'>
        <div className='mt-4 flex flex-col items-center gap-3'>
          <input
            placeholder="Input 1"
            onChange={() => {}}
            value={userData.name}
            className="w-[250px] h-10 border rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            placeholder="Input 2"
            onChange={() => {}}
            value={userData.email}
            className="w-[250px] h-10 border rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            placeholder="Input 3"
            onChange={() => {}}
            value={userData.phone}
            className="w-[250px] h-10 border rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <Button radius="full" className="bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7] text-white shadow-lg">
            Edit Profile
          </Button>
        </div>
      </div>
      <div className='h-[300px]'></div>
    </div>
  )
}

export default Profile
