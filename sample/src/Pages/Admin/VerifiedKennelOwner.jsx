import React, { useState,useEffect } from 'react'
import { getVerifiedkennelOwner } from '@/api/admin'
import { toast } from 'react-toastify'
import Table3 from '@/component/admin/Table3'

const VerifiedKennelOwner = () => {
    const[users,setUsers] = useState([])
    const[loading,setLoading] = useState(false)

    const fetchUsers = async ()=>{
        setLoading(true)
        try {
            const response = await getVerifiedkennelOwner()
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
              {loading ? <p>Loading...</p> : <Table3 users={users} fetchUsers={fetchUsers} />}

    </div>
  )
}

export default VerifiedKennelOwner
