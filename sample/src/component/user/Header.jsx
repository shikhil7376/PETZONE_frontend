import React from 'react'
import { Button } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearUserdata } from '@/redux/slices/authSlice';
import { toast } from 'react-toastify';

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userdata = useSelector((state)=>state.user.userdata)

  const handleSignup = ()=>{
    navigate('/login ')
  }

  const handleSignOut =()=>{
    localStorage.removeItem('token')
     dispatch(clearUserdata())
     toast.success('logout successfully')
     navigate('/')
  }

  return (
    <div className=''>
         <nav className='navbar flex justify-between items-center '>
        <div className='logo w-1/6 flex items-center justify-center'>
          <img src='pics/logo.jpg' className='w-10 h-10' alt='Logo' />
        </div>
        <div className='section w-2/3'>
          <ul className='flex justify-evenly '>
            <li className='font-roboto hover:text-purple-600 hover:underline cursor-pointer transition duration-300' >Home</li>
            <li className=' hover:text-purple-600 hover:underline cursor-pointer transition duration-300'>Services</li>
            <li className=' hover:text-purple-600 hover:underline cursor-pointer transition duration-300'>About</li>
            <li className=' hover:text-purple-600 hover:underline cursor-pointer transition duration-300'>Contact</li>
          </ul>
        </div>
        <div className='signup w-1/6 flex items-center justify-center mt-1'>
        {
          userdata?(
            (
              <Button radius="full" className="bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7] text-white shadow-lg" onClick={handleSignOut}>
                SignOut
              </Button>
            )
          ):(
            <Button radius="full" className="bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7] text-white shadow-lg" onClick={handleSignup}>
            SignIn
          </Button>
          )
        }
          
        </div>
      </nav>
      <div
  className="navbar-line"
  style={{
    width: 'calc(100% - 25rem)',
    height: '1px',
    backgroundColor: '#5d5f5f',
    margin: '0 auto'
  }}
></div>
    </div>
  )
}

export default Header
