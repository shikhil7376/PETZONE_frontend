import React from 'react'
import { InputOTP,InputOTPGroup,InputOTPSeparator,InputOTPSlot } from '@/components/ui/input-otp';
import { Button } from "@nextui-org/react";
import { useLocation,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import errorHandle from '@/api/error';
import { toast } from 'react-toastify';
import { setCredential } from '@/redux/slices/authSlice';

const OtpVerificationPage = () => {

    const [otp,setOtp] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const location = useLocation()
    const data = location.state

    const submitOtp = async()=>{
        try{
        let response = await otpVerify(
            {otp:parseInt(otp)},
            {email:data.email}
        )
        if(response){
            toast.success(response.data.message)
            localStorage.setItem('token',response?.data.token)
            dispatch(setCredential(response?.data.data))
            navigate('/login')
        }
        }catch(error){
         errorHandle(error)
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl  text-gray-900">OTP VERIFICATION</h2>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-4 flex flex-col items-center justify-center">
          <form onSubmit={submitOtp}>
          <InputOTP maxLength={6} value={otp} onChange={(otp) => setOtp(otp)}>
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
              className="w-full bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7] text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Submit OTP
            </Button>
          </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default OtpVerificationPage
