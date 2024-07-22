import React from "react";
import { useState,useEffect } from "react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { setCredential } from "@/redux/slices/authSlice";
import { setAdminCredential } from "@/redux/slices/adminSlice";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import validator from "validator";
import { login } from "@/api/user";
import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

//   let {userInfo} = useSelector((state)=>state.auth)
//   let {adminInfo} = useSelector((state)=>state.adminAuth)

//   useEffect(()=>{
//     if(userInfo){
//         navigate('/home')
//     }
//    if(adminInfo){
//     navigate('/admin/dashboard')
//    }
//   },[userInfo,adminInfo])

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors,setErrors] = useState('')

const validateForm = ()=>{
    const newErrors = {}
    if(!email.trim() || !validator.isEmail(email)){
        newErrors.email = 'Valid email is required'
    }
    if(!password.trim()){
        newErrors.password = 'password is required'
    }else if(password.length <6){
        newErrors.password = 'Password must contain at least 6 characters'
    }
    setErrors(newErrors)
     return Object.keys(newErrors).length ===0
}


 const submitHandler = async(e)=>{
    e.preventDefault();
    const isValid = validateForm()
    if(isValid){
        const data = {
            email:email,
            password:password,
        } 
        const response = await login(data)
        if(response.data.isAdmin){
            localStorage.setItem('token',response.data.token)
            dispatch(setAdminCredential(response.data.message))
            navigate('/admin/dashboard')
        }else{
            localStorage.setItem('token',response.data.token)
            dispatch(setCredential(response.data.message))
            navigate('/')
        }
    }
 }

 const Glogin = useGoogleLogin({
  onSuccess: async (response) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`
      );

      console.log(res, '1');

      const data = {
        email: res.data.email,
        password: 'qwerty123',
      };

      const response2 = await login(data);
      console.log(response2, '2');
      if (response2) {
        if (response2.data.isAdmin) {
          localStorage.setItem('token', response2.data.token);
          dispatch(setAdminCredentials(response2.data.message));
          navigate('/admin');
        } else {
          localStorage.setItem('token', response2.data.token);
          dispatch(setCredentials(response2.data.message));
          navigate('/home');
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
});



  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-gradient">
      <div></div>
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">
        <motion.h1
          className="text-3xl font-semibold mb-8 md:ml-24 stext-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hi, Welcome! 👋
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm  mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
              />
            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </div>
            <div className="flex items-center justify-center">
              <Button
                radius="full"
                className="bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7] text-white shadow-lg"
                type="submit"
              >
                SignIn
              </Button>
            </div>
          </form>
        </motion.div>


        {/* <div className="flex items-center justify-center mt-4">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />
        </div> */}


        <motion.div onClick={() => Glogin()} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className=" mt-4">
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="mr-2">Sign in with Google</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              width="0.98em"
              height="1em"
              viewBox="0 0 256 262"
            >
              <path
                fill="#4285f4"
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              />
              <path
                fill="#34a853"
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              />
              <path
                fill="#fbbc05"
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
              />
              <path
                fill="#eb4335"
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              />
            </svg>
          </button>
        </motion.div>
        <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Create one
                    </Link>
                  </p>
                </div>
      </div>
    </div>
  );
};

export default Login;
