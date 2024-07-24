import React, { useState } from 'react';
import validator from 'validator';
import '../../Pages/Kennel/signin.css';
import { login } from '@/api/kennel';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors,setErrors] = useState('')

 const validateForm = ()=>{
  const newErrors ={}
  if(!email.trim() || !validator.isEmail(email)){
     newErrors.email = 'valid email is required'
  }
  if(!password.trim()){
    newErrors.password='password is required'
   }else if(password.length <6){
    newErrors.password = 'password must contain at least 6 characters'
   }
   setErrors(newErrors)
   return Object.keys(newErrors).length ===0
 }

 const submitHandler = async(e)=>{
  e.preventDefault()
  const isValid = validateForm()
  if(isValid){
     const data = {
      email:email,
      password:password
     }
     const response = await login(data);
     if(response.data){
      console.log('here....');
      localStorage.setItem('token',response.data.token)
      navigate('/kennel/dashboard')
     }
  }
 }



  return (
    <div className="card shadow-md">
      <img src="/pics/1.svg" alt="Step 1" />
      <h2>Welcome</h2>
      <h3>Let's create your username</h3>
      <form onSubmit={submitHandler}>
      <div className="w-[280px] ml-10">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}

      </div>

      <div className="mt-1 w-[280px] ml-10">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
      </div>
      
      <div className='flex justify-center'>
        <button className='p-2 mt-5 w-[150px] rounded-md'type='submit'>
          Sign In
        </button>
      </div>
      </form>
    </div>
  );
};

export default SignIn;
