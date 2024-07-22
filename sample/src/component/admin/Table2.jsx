import React, { useState } from 'react';
import { Table } from 'flowbite-react';
import { User } from "@nextui-org/react";
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { approveRequests,rejectRequests } from '@/api/admin';

const Table2 = ({kennelOwners,fetchKennelOwners}) => {
const [modalIsOpen,setModalIsOpen] = useState(false)
const [actionType,setAction] = useState('')
const [selectedUserId,setSelectedUserId] = useState(null)

const approveRequest = async(userId)=>{
    try{
       const response = await approveRequests({userId})
       toast.success(response?.data,{
        position:'top-center'
       })
       setModalIsOpen(false);
       fetchKennelOwners()
    }catch(error){
        toast.error("Error blocking user", {
            position: "top-center",
          });
    }
}

const rejectRequest = async (userId)=>{
   try {
    const response = await rejectRequests({userId})
    toast.success(response?.data, {
        position: "top-center",
      });
      setModalIsOpen(false);
    fetchKennelOwners()
   } catch (error) {
    toast.error("Error unblocking user", {
        position: "top-center",
      });
   }
}

const confirmAction = ()=>{
    if(actionType ==='approve'){
        approveRequest(selectedUserId)
    }else{
        rejectRequest(selectedUserId)
    }
}

const openModal = (type,userId)=>{
    setAction(type)
    setSelectedUserId(userId)
    setModalIsOpen(true)
}
  return (
    <div className="overflow-x-auto ml-[54px]">
      <Table>
        <Table.Head>
          <Table.HeadCell> Image </Table.HeadCell>
          <Table.HeadCell> Name </Table.HeadCell>
          <Table.HeadCell> Email </Table.HeadCell>
          <Table.HeadCell> Phone </Table.HeadCell>
          <Table.HeadCell > STATUS </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
        {kennelOwners.map((user, index) => (
            <Table.Row key={index}  className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <User avatarProps={{ src: user.avatar || "https://avatars.githubusercontent.com/u/30373425?v=4" }} />
              </Table.Cell>
              <Table.Cell className='font-semibold'>{user.name}</Table.Cell>
              <Table.Cell className='font-semibold'>{user.email}</Table.Cell>
              <Table.Cell className='font-semibold'>{user.phone}</Table.Cell>
              <Table.Cell>
                <button className='bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-3xl'onClick={()=>openModal('approve',user._id)} >APPROVE</button>
                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-3xl ml-2" onClick={()=>openModal('Reject',user._id)}>REJECT</button>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={()=>setModalIsOpen(false)}
                  contentLabel="Confirm Action"
                  className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto my-20"
                  overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center"
                >
                  <h2 className="text-xl font-bold mb-4">Confirm Action</h2>
                  <p className="mb-6">Are you sure you want to {actionType} this user?</p>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={()=>setModalIsOpen(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmAction}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                    >
                     {actionType==='approve'?'APPROVE':'REJECT'}
                    </button>
                  </div>
                </Modal>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default Table2;
