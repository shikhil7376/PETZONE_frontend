import React from 'react'
import { useSelector } from "react-redux";
import { Navigate,Outlet } from "react-router-dom";


const ProtectedRoute = () => {
    const userData = useSelector((state)=>state.user.userdata)

  return (
     userData?<Outlet/>:<Navigate to='/' replace/>
  )
}

export default ProtectedRoute
