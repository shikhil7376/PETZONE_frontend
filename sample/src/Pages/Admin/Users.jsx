import React, { useState,useEffect } from 'react'
import Table1 from '@/component/admin/Table1'
import { getUsers } from '@/api/admin'
import {toast} from 'react-toastify'

const Users = () => {
    const [users,setUsers] = useState([])
    const [loading,setLoading] = useState(false)

    const fetchUsers = async()=>{
        setLoading(true)
        try {
          const response = await getUsers()
           setUsers(response?.data.data)
        } catch (error) {
            console.error('failed to fetch users:',error)
            toast.error('failed to fetch users')
        }
        setLoading(false)
    }
  useEffect(()=>{
    fetchUsers()
  },[])

  return (
    <div>
    
        {loading ? <p>Loading...</p> : <Table1 users={users} fetchUsers={fetchUsers} />}
  
    </div>
  )
}

export default Users
