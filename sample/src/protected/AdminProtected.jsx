import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'
const AdminProtected = () => {
    const AdminData = useSelector((state)=>state.admin.admindata)
  return (
    AdminData?<Outlet/>:<Navigate to='login' replace/>

  )
}

export default AdminProtected
