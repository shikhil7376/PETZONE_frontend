import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getProfile, editProfile } from '@/api/kennel';
import { Button, Avatar } from '@nextui-org/react';
import { Input } from '@/components/ui/input';
import { FaUpload } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    _id: '',
    name: '',
    email: '',
    phone: '',
    image: ''
  });

  const [isEditable, setIsEditable] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
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

  const kennelOwnerData = useSelector((state) => state.kennel.kennelOwnerData);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile(kennelOwnerData._id);
        setProfile(response.data.message);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, [kennelOwnerData._id]);

  const handleEditToggle = async () => {
    if (isEditable) {
      const isValid = validateForm();
      if (isValid) {
        try {
          const formData = new FormData();
          formData.append('id', profile._id);
          formData.append('name', profile.name);
          formData.append('email', profile.email);
          formData.append('phone', profile.phone);
          if (selectedFile) {
            formData.append('ownerimage', selectedFile);
          }

          const response = await editProfile(formData);
          if (response) {
            toast.success('Profile updated successfully');
            setIsEditable(false); // Set isEditable to false after successful update
          }
        } catch (error) {
          console.error('Failed to update profile:', error);
          toast.error('Failed to update profile');
        }
      }
    } else {
      setIsEditable(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setProfile((prev) => ({
        ...prev,
        image: URL.createObjectURL(file)
      }));
    }
  };

  return (
    <div className='w-full flex justify-center items-center bg-white'>
      <div className='border-1 h-[450px] w-[350px] rounded-lg mt-[30px] bg-white flex flex-col items-center p-4 drop-shadow-xl'>
        <div className='p-5'>
          <Avatar src={profile.image || ''} className='w-20 h-20 text-large' />
          {isEditable && <FaUpload onClick={() => document.getElementById('fileInput').click()} />}
          <input id='fileInput' type='file' onChange={handleFileChange} style={{ display: 'none' }} />
        </div>

        <div className='mt-4 flex flex-col items-center gap-3'>
          <Input type='text' placeholder='Name' value={profile.name} name='name' onChange={handleInputChange} readOnly={!isEditable} />
          <Input type='text' placeholder='Email' value={profile.email} name='email' readOnly />
          <Input type='text' placeholder='Phone' value={profile.phone} name='phone' onChange={handleInputChange} readOnly={!isEditable} />
          {errors.phone && <p className='mt-2 text-sm text-red-600'>{errors.phone}</p>}
          {errors.name && <p className='mt-2 text-sm text-red-600'>{errors.name}</p>}

        </div>
        <div className='p-3'>
          <Button onClick={handleEditToggle}>{isEditable ? 'Submit' : 'Edit'}</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
