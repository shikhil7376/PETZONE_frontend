import React, { useState } from 'react'
import { InputOTP,InputOTPGroup,InputOTPSeparator,InputOTPSlot } from '@/components/ui/input-otp';
import { Button } from "@nextui-org/react";
import { useLocation,useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { otpVerify } from '@/api/kennel';
import { toast } from 'react-toastify';


const Otp = () => {
   
    const [otp,setOtp] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const data = location.state

    const submitOtp = async(e)=>{
      try {
        e.preventDefault()
        let response = await otpVerify(
          {otp:parseInt(otp)},
          {email:data.email}
        )
        console.log(response);
        if('response',response){
          console.log('data',response.data.message);
          toast.success(response.data.message)
          navigate('/kennel/login')
        }
      } catch (error) {
        
      }
    }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8  bg-slate-200">
    <div className="max-w-md w-full space-y-8">
      <div>
        <motion.h2 className="mt-6 text-center text-3xl  text-gray-900"
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
        >OTP VERIFICATION</motion.h2>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <motion.div className="space-y-4 flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <form onSubmit={submitOtp}>
          <InputOTP maxLength={6} value={otp} onChange = {(otp)=>setOtp(otp)} >
            <InputOTPGroup>
                <InputOTPSlot index ={0}/>
                <InputOTPSlot index ={1}/>
                <InputOTPSlot index ={2}/>
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
            <InputOTPSlot index ={3}/>
            <InputOTPSlot index ={4}/>
            <InputOTPSlot index ={5}/>
            </InputOTPGroup>
          </InputOTP>

         

          <div className="mt-6">
            <Button
              type='submit'
              className="w-full bg-customPurple text-white py-2 px-4 rounded-md hover:bg-hoverPurple focus:outline-none"
            >
              Submit OTP
            </Button>
          </div>
          </form>
        </motion.div>
      </div>
    </div>
  </div>
  )
}

export default Otp
