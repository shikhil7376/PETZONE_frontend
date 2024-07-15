// components/OTPInput.jsx

import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import axios from 'axios';

const OTPInput = ({ email }) => {
  const [otp, setOtp] = useState(Array(6).fill(''));

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleSubmitOTP = async () => {
    const otpValue = otp.join('');
    try {
      const response = await axios.post('api/user/verifyOtp', { email, otpValue });
      // Handle response if needed
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl text-gray-900">OTP VERIFICATION</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-4 flex flex-col items-center justify-center">
            <div className="flex gap-2">
              {otp.map((value, index) => (
                <div
                  key={index}
                  className="relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md"
                >
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleChange(e.target.value, index)}
                    className="absolute inset-0 w-full h-full text-center outline-none bg-transparent"
                    maxLength={1}
                  />
                </div>
              ))}
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

export default OTPInput;
