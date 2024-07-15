import React from 'react'
import { useState } from 'react';
import { Button } from "@nextui-org/react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignUpForm = () => {
   const navigate = useNavigate()
   const [formData,setFormData] = useState({
      name:'',
      email:'',
      password:'',
      phone:''
   })

   const handleChange = (e)=>{
     setFormData({
      ...formData,
      [e.target.name]:e.target.value
     })
   }

   const handleSubmit = async(e)=>{
     e.preventDefault()
      try {
        const response = await axios.post('api/user/sign_up',formData)
        if(response.data.status){
           navigate(`/verifyOtp?email=${encodeURIComponent(formData.email)}`)
        }
      } catch (error) {
        console.log(error);
      }
   }
  return (
    
      <div className="min-h-screen flex items-center justify-center ">
      <div>
        
      </div>
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl text-gray-600  mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm  mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm  mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
              Mobile no
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your mobile-no"
            />
          </div>
          <div className="flex items-center justify-center">
          <Button radius="full" className="bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7] text-white shadow-lg" type='submit' >
            SignUp
          </Button>
         
          </div>
        </form>
      </div>
    </div>
   
  )
}

export default SignUpForm
