import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from "@nextui-org/react";


const Profile = () => {
    const userData = useSelector((state)=>state.user.userdata)
    console.log(userData);
  return (
    <div className='h-auto relative'>
      <div className='h-[400px] bg-slate-100 flex justify-center'>
        <div className='relative'>
          <div className='bg-lightwhite h-[150px] w-[150px] rounded-full text-center flex justify-center items-center overflow-hidden drop-shadow-md absolute bottom-[-75px]'>
            <img src='/pics/profile.jpg' alt='Profile' className='h-full w-full object-cover' />
          </div>
        </div>
      </div>
      <div className='border-1 h-[250px] w-[350px] rounded-lg mt-[10px] flex flex-col items-center p-4 drop-shadow-md ml-2'>
      <div className='mt-4 flex flex-col items-center gap-3'>
                    <input
                        placeholder="Input 1"
                        onChange=''
                        value={userData.name}
                        className="w-[250px] h-10 border rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <input
                        placeholder="Input 2"
                        onChange=''
                        value={userData.email}
                        className="w-[250px] h-10 border rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <input
                        placeholder="Input 3"
                        onChange=''
                        value={userData.phone}                        className="w-[250px] h-10 border rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <Button radius="full" className="bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7] text-white shadow-lg" >
            Edit Profile
          </Button>
                </div>
      </div>
      <div className='h-[300px]'></div>
    </div>
  )
}

export default Profile
