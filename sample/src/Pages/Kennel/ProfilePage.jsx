import React from 'react'
import { useSelector } from 'react-redux'

const ProfilePage = () => {
    const kennelOwnerData = useSelector((state) => state.kennel.kennelOwnerData);

    return (
        <div className='w-full flex justify-center items-center'>
            <div className='border-1 h-[450px] w-[450px] rounded-lg mt-[30px] flex flex-col items-center p-4 drop-shadow-md'>
                <div className='bg-lightwhite h-[150px] w-[150px] rounded-full text-center flex justify-center items-center overflow-hidden drop-shadow-md'>
                    <img src='/pics/profile.jpg' alt='Profile' className='h-full w-full object-cover' />
                </div>
                <div className='mt-4 flex flex-col items-center gap-3'>
                    <input
                        placeholder="Input 1"
                        onChange=''
                        value={kennelOwnerData.name}
                        className="w-[250px] h-10 border rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <input
                        placeholder="Input 2"
                        onChange=''
                        value={kennelOwnerData.email}
                        className="w-[250px] h-10 border rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <input
                        placeholder="Input 3"
                        onChange=''
                        value={kennelOwnerData.phone}
                        className="w-[250px] h-10 border rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
