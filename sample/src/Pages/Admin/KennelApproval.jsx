import React from 'react'
import Table2 from '@/component/admin/Table2'
import { useState,useEffect } from 'react'
import {toast} from 'react-toastify'
import { getRequests } from '@/api/admin'

const KennelApproval = () => {
    const [kennelOwners,setKennelOwners] = useState([])
    const [loading,setLoading] = useState(false)

    const fetchKennelOwners = async()=>{
        setLoading(true)
        try {
          const response = await getRequests()
           setKennelOwners(response?.data.data)
        } catch (error) {
            console.error('failed to fetch users:',error)
            toast.error('failed to fetch users')
        }
        setLoading(false)
    }
    useEffect(()=>{
        fetchKennelOwners()
      },[])
  return (
    <div>
    
    {loading ? <p>Loading...</p> : <Table2 kennelOwners={kennelOwners} fetchKennelOwners={fetchKennelOwners} />}

</div>
  )
}

export default KennelApproval
