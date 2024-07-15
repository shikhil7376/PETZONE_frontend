import { useState, useEffect } from 'react';
import { InputOTP,InputOTPGroup,InputOTPSeparator,InputOTPSlot } from '@/components/ui/input-otp';
import { Button } from "@nextui-org/react";
import axios from 'axios';

const OTPVerificationPage = () => {
  const [otp, setOTP] = useState(['', '', '', '', '', '']); // Initial state for OTP slots
  const [timer, setTimer] = useState(60); // Timer starts from 60 seconds
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const email = new URLSearchParams(location.search).get('email')
 
  useEffect(() => {
    if (timer > 0 && isTimerRunning) {
      const countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0) {
      setIsTimerRunning(false); // Timer expires
    }
  }, [timer, isTimerRunning]);

  const handleResendOTP = () => {
    // Logic to resend OTP
    setTimer(60); // Reset timer
    setIsTimerRunning(true); // Restart timer
  };

  const handleSubmitOTP = async() => {
   const otpValue=  otp.join('')
   
   try {
     const response = await axios.post('api/user/verifyOtp',{email,otpValue})
   } catch (error) {
    console.log(error);
   }
  };

  const handleInputChange = async(index, value) => {
    console.log('herer');
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl  text-gray-900">OTP VERIFICATION</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                {Array.from({ length: 3 }).map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    value={otp[index]}
                    onChange={(e) => handleInputChange(index,e.target.value)}
                    className="w-12 h-12 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-center text-2xl"
                  />
                ))}
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                {Array.from({ length: 3 }).map((_, index) => (
                  <InputOTPSlot
                    key={index + 3}
                    index={index + 3}
                    value={otp[index + 3]}
                    onChange={(e) => handleInputChange(index + 3, e.target.value)}
                    className="w-12 h-12 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-center text-2xl"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>

            <div className="flex items-center justify-center">
              {isTimerRunning ? (
                <p className="text-gray-500 text-sm">Resend OTP in {timer} seconds</p>
              ) : (
                <Button
                  onClick={handleResendOTP}
                  className="text-dark-500 hover:text-dark-700 font-medium focus:outline-none"
                >
                  Resend OTP
                </Button>
              )}
            </div>

            <div className="mt-6">
              <Button
                onClick={handleSubmitOTP}
                className="w-full bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7] text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Submit OTP
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;

