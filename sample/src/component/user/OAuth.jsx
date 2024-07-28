import React from 'react'
import { Button } from "@nextui-org/react";
import {GoogleAuthProvider, signInWithPopup,getAuth} from 'firebase/auth'
import { app } from '@/firebase/firebase';
import { useDispatch } from 'react-redux';
import { setCredential } from '@/redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const dispatch = useDispatch() 
    const navigate = useNavigate()

    const handleGoogleClick = async()=>{
        const auth = getAuth(app)
       const provider = new GoogleAuthProvider()
       provider.setCustomParameters({prompt:'select_account'})
       try {
         const resultsFromGoogle = await signInWithPopup(auth,provider)
         const res = await fetch('/api/user/google',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                name:resultsFromGoogle.user.displayName,
                email:resultsFromGoogle.user.email
            })
         })
         const data = await res.json()
          console.log(data);
         if(res.ok){
            const { token, message: user } = data.data;
            localStorage.setItem('token', token);
            dispatch(setCredential(user));
             navigate('/')
         }
       } catch (error) {
        console.log(error);
       }
    }
  return (
    <Button onClick={handleGoogleClick}>GOOGLE</Button>
  )
}

export default OAuth
