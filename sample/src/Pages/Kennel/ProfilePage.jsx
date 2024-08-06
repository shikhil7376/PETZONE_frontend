import React from 'react'
import { useSelector } from 'react-redux'
import { useState,useEffect } from 'react'
import { getProfile } from '@/api/kennel'
import {Button} from '@nextui-org/react' 
import {Avatar} from "@nextui-org/react";
import { Input } from '@/components/ui/input';
import { FaUpload } from "react-icons/fa";
import { editProfile } from '@/api/kennel'

const ProfilePage = () => {
    const [profile,setProfile] = useState({
        _id:'',
        name:'',
        email:'',
        phone:'',
        image:''
        })
        
        const [isEditable, setIsEditable] = useState(false);
        const [selectedFile, setSelectedFile] = useState(null);
    console.log(selectedFile);
    
    const kennelOwnerData = useSelector((state) => state.kennel.kennelOwnerData);
    useEffect(()=>{
        const data=  getProfile(kennelOwnerData._id)
        .then((response)=>{
          setProfile(response.data.message)
        })
      },[])

      const handleEditToggle = async ()=>{
        if(isEditable){
            try {
                const formData = new FormData()
                formData.append('id',profile._id)
                formData.append('name',profile.name)
                formData.append('email',profile.email)
                formData.append('phone',profile.phone)
                if (selectedFile) {
                    formData.append('ownerimage', selectedFile);
                  }  
              const response = await editProfile(formData)
            } catch (error) {
                
            }
        }else{
            setIsEditable(true)
        }
      }

      const handleInputChange = (e)=>{
        const {name,value} = e.target
        setProfile((prev)=>({
           ...prev,
           [name]:value
        }))
      }

      const handleFileChange =(e)=>{
         if(e.target.files && e.target.files[0]){
            const file = e.target.files[0]
            setSelectedFile(file);
            setProfile((prev)=>({
                ...prev,
                image: URL.createObjectURL(file)
            }))
         }
      }

    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='border-1 h-[450px] w-[350px] rounded-lg mt-[30px] bg-white flex flex-col items-center p-4 drop-shadow-xl'>
                <div className='p-5'>
                <Avatar src={profile.image || ''} className="w-20 h-20 text-large" />
                {isEditable && <FaUpload  onClick={()=>document.getElementById('fileInput').click()}/>}
                  <input id="fileInput" type="file" onChange={handleFileChange} style={{ display: 'none' }} />

                </div>
               
                <div className='mt-4 flex flex-col items-center gap-3'>
                  <Input type='text' placeholder='name' value={profile.name} name="name" onChange={handleInputChange} readOnly={!isEditable}/>
                  <Input type='text' placeholder='name' value={profile.email} name="email" onChange={handleInputChange} readOnly={!isEditable}/>
                  <Input type='text' placeholder='name' value={profile.phone} name="phone" onChange={handleInputChange} readOnly={!isEditable}/>
                </div>
                <div className='p-3'>
                <Button onClick={handleEditToggle}>{isEditable ? 'Submit' : 'Edit'}</Button>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
