import React, { useState,useEffect } from 'react'
import Table1 from '@/component/admin/Table1'
import { getUsers } from '@/api/admin'

const [users,setUsers] = useState([])
const [loading,setLoading] = useState(false)

const Users = async() => {
      setLoading(true)
      try {
        const response = await getUsers()
      } catch (error) {
        
      }
  return (
    <div>
      <Table1/>
    </div>
  )
}

export default Users
