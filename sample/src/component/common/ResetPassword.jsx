import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Button } from "@nextui-org/react";
import { Input } from "@/components/ui/input"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { resetpassword } from '@/api/user';


const ResetPassword = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [error,setErrors] = useState({})
     
   const data = {
        email:email,
        password:password
   }

    const navigate = useNavigate()

    const validateForm = () =>{
        const newError ={}
        if(!email.trim() || !validator.isEmail(email)){
            newError.email = 'validate email is required'
        }
        if(!password.trim()){
            newError.password = 'password is required'
        }else if(password.length <6){
            newError.password = 'Password must contains 6 characters'
        }
        if(password!==confirmPassword){
            newError.confirmPassword = 'Password do not match'
        }
        setErrors(newError)
        return Object.keys(newError).length ===0
    }

    const submitHandler = async(e)=>{
        e.preventDefault()
        const isValid = validateForm()
        if(isValid){
            try {
                const response = await resetpassword(data)
            } catch (error) {
                
            }
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-custom-gradient">
      <div className="max-w-md w-full space-y-8">
        <div>
          <motion.h2
            className="mt-6 text-center text-3xl text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            RESET PASSWORD
          </motion.h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <motion.div
            className="space-y-4 flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <form onSubmit={submitHandler}>
                <div className='display flex flex-col gap-2'>
              <Input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              {error.email && (<p className="mt-2 text-sm text-red-600">{error.email}</p>)}
              <Input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
              {error.password && (
                  <p className="mt-2 text-sm text-red-600">{error.password}</p>
                )}
              <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
              {error.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">{error.confirmPassword}</p>
                )}
              </div>

              <div className="mt-6">
                <Button
                  type='submit'
                  className="w-full bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7] text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  SUBMIT
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
