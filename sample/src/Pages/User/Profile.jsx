import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button } from "@nextui-org/react";
import { getProfile } from '@/api/user';
import { FaUpload } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { editProfile } from '@/api/user';
import { toast } from 'react-toastify';

const Profile = () => {

const [profile,setProfile] = useState({
   _id:'',
   name:'',
   email:'',
   phone:'',
   image:''
   })

   const [isEditable,setIsEditable] = useState(false)
   const [selectedFile,setSelectedFile] = useState(null)
   const [errors, setErrors] = useState({});

   const validateForm = () => {
    const newErrors = {};
    if (!profile.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!profile.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (profile.phone.length < 10 || profile.phone.length > 10) {
      newErrors.phone = 'Phone number must contain 10 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const userData = useSelector((state)=>state.user.userdata)
    
    useEffect(()=>{
      const data=  getProfile(userData._id)
      .then((response)=>{
      
        setProfile(response.data.message)
      })
    },[])

    const handleFileChange =(e)=>{
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setSelectedFile(file);
        setProfile((prev) => ({
          ...prev,
          image: URL.createObjectURL(file)
        }));
      }
    }

const handleInputChange = (e)=>{
  const { name, value } = e.target;
  setProfile((prev) => ({
    ...prev,
    [name]: value
  }));
}

    const handleEditToggle = async()=>{
      if(isEditable){
        const isValid = validateForm();
        if (isValid) {
        try {
          const formData = new FormData();
          formData.append('id', profile._id);
          formData.append('name', profile.name);
          formData.append('email', profile.email);
          formData.append('phone', profile.phone);
          if (selectedFile) {
            formData.append('userimage', selectedFile);
          }
          const response = await editProfile(formData);
          console.log(response);
          
          if (response) {
            toast.success('Profile updated successfully');
            setIsEditable(false); // Set isEditable to false after successful update
          }
        } catch (error) {
          console.error('Failed to update profile:', error);
          toast.error('Failed to update profile');
        }
      }
      }else{
        setIsEditable(true)
      }

    }
       
  return (
    <div className='h-auto relative'>
      <div className='h-[400px] bg-slate-100 flex justify-center relative'>
        <img src='' alt='Cover' className='absolute top-0 left-0 w-full h-full object-cover z-0' />
        <div className='relative z-10'>
          <div className='bg-lightwhite h-[150px] w-[150px] rounded-full text-center flex justify-center items-center overflow-hidden drop-shadow-md absolute right-1 bottom-[-73px]'>
            <img src={profile.image || ''}  className='h-full w-full object-cover' />
          </div>
        </div>
      </div>
      <div className='h-[250px] w-[350px] rounded-lg mt-[50px] flex flex-col items-center p-4 drop-shadow-md ml-[350px]'>
        <div className='mt-4 flex flex-col items-center gap-3'>
        {isEditable && <FaUpload onClick={() => document.getElementById('fileInput').click()} />}
        <input id='fileInput' type='file' onChange={handleFileChange} style={{ display: 'none' }} />
        <Input type='text' placeholder='Name' value={profile.name} name='name' onChange={handleInputChange} readOnly={!isEditable} />
        <Input type='text' placeholder='Email' value={profile.email} name='email' readOnly />
        <Input type='text' placeholder='Phone' value={profile.phone} name='phone' onChange={handleInputChange} readOnly={!isEditable} />
        {errors.phone && <p className='mt-2 text-sm text-red-600'>{errors.phone}</p>}
        {errors.name && <p className='mt-2 text-sm text-red-600'>{errors.name}</p>}
          <Button radius="full" className="bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7] text-white shadow-lg" onClick={handleEditToggle}>
          {isEditable ? 'Submit' : 'Edit'}
          </Button>
        </div>
      </div>
      <div className='h-[300px]'></div>
    </div>
  )
}

export default Profile
