import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'

const KennelProtected = () => {
    const kennelOwnerData = useSelector((state) => state.kennel.kennelOwnerData);
   
    return (
        kennelOwnerData ?<Outlet/>:<Navigate to='/login' replace/>
  )
}

export default KennelProtected
