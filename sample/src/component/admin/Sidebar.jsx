
"use client";
import React from 'react'
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiUser, HiLibrary  } from "react-icons/hi";

const AdminSidebar = () => {
  return (
    <div className='mt-5 h-screen'>
    <Sidebar aria-label="Default sidebar example">
   <Sidebar.Items className="mt-8 font-serif ">
     <Sidebar.ItemGroup>
       <Sidebar.Item href="#" icon={HiChartPie}>
         Dashboard
       </Sidebar.Item>
       <Sidebar.Item href="#" icon={HiUser}>
         Users
       </Sidebar.Item>
       <Sidebar.Item href="#" icon={ HiLibrary } labelColor="dark">
         Kennel Approval
       </Sidebar.Item>
       <Sidebar.Item href="#" icon={HiArrowSmRight}>
         Kennel Owner
       </Sidebar.Item>
     </Sidebar.ItemGroup>
   </Sidebar.Items>
 </Sidebar>
 </div>
  )
}

export default AdminSidebar
