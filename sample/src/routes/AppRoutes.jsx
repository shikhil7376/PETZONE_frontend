import React from 'react'
import { Route,Routes } from "react-router-dom";
import UserRoutes from "./UserRoutes";
import KennelRoutes from "./KennelRoutes";
import AdminRouter from "./AdminRouter";

const AppRoutes = () => {
  return (
     <Routes>
        <Route path='/*' element={<UserRoutes/>}/>
        <Route path='/admin/*' element={<AdminRouter/>}/>
        <Route path='/kennel/*' element={<KennelRoutes/>}/>
     </Routes>
  )
}

export default AppRoutes
