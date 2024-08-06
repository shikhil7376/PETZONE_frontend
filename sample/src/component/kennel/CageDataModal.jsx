import React, { useEffect, useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { Input } from "@/components/ui/input"
import { viewDetails } from '@/api/kennel';
import { MdOutlineDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { editCages } from '@/api/kennel';

const CageDataModal = ({cageid}) => {
  const kennelOwnerData = useSelector((state) => state.kennel.kennelOwnerData);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [img,setImg] = useState([])
    const [isEditable, setIsEditable] = useState(false);
    const [cagedata,setCageData] = useState({
      kennelname:'',
      location:'',
      description:'',
      pricepernight:'',
      type:'',
      maxcount:'',
      phone:'',
      Image:[]
    })
     
    
    const formData = new FormData()
  formData.append('id',cagedata._id)  
  formData.append('kennelname', cagedata.kennelname);
  formData.append("location", cagedata.location);
  formData.append("description",cagedata.description);
  formData.append("phone",cagedata.phone);
  formData.append("type", cagedata.type);
  formData.append("maxCount",Number(cagedata.maxcount)); 
  formData.append("PricePerNight",Number(cagedata.pricepernight));
  formData.append('ownerId',kennelOwnerData._id)
  cagedata.Image.forEach(file=>formData.append('editimages',file))


  
    
   const handleEditToggle =async()=>{
    if(isEditable){
        try {
          for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
          }
          const response = await editCages(formData)
        } catch (error) {
          
        }
    }
    setIsEditable(!isEditable)
   }
   
    
   const fetchData = async()=>{
    try {
      const response = await viewDetails(cageid)
      setCageData(response.data.message)
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to fetch users');
    }
   }
    
   useEffect(()=>{
     fetchData()
   },[])

   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCageData(prev => ({
        ...prev,
        [name]: name === 'pricepernight' || name === 'maxcount' ? Number(value) : value

    }));
};


   const handleImageDelete =(image)=>{
     setCageData(prev=>({
      ...prev,
      Image:prev.Image.filter(img=>img!==image)
     }))
      
   }

//    const handleFileChange =(e)=>{
//     if(e.target.files){
//      const filesArray = Array.from(e.target.files).slice(0,3)
//      const fileUrls = filesArray.map(file => URL.createObjectURL(file));
//      setImg(prev => [...prev, ...fileUrls]);
//      setCageData(prev => ({
//          ...prev,
//          Image: [...prev.Image, ...fileUrls]
//      }));
    
//     }
//  }

const handleFileChange = (e) => {
  if (e.target.files) {
    const filesArray = Array.from(e.target.files).slice(0, 3);
    setCageData((prev) => ({
      ...prev,
      Image: [...prev.Image, ...filesArray]
    }));
  }
};



  return (
    <>
      <Button onPress={onOpen}>More Details</Button>
      <Modal 
        backdrop="opaque" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
      >
        <ModalContent>
          {(onClose) => (
        
            <>
            <form>
              <ModalHeader className="flex flex-col gap-1">Cage Details</ModalHeader>
              <ModalBody>
              <Input type="text" placeholder="Kennel Name" name='kennelname' value={cagedata.kennelname} readOnly={!isEditable} onChange={handleInputChange} />
              <Input type="text" placeholder="Location" name='location' value={cagedata.location} readOnly={!isEditable} onChange={handleInputChange} />
              <Input type="text" placeholder="Description" name='description' value={cagedata.description} readOnly={!isEditable} onChange={handleInputChange} />
              <Input type="Number" placeholder="priceperNight" name='pricepernight' value={cagedata.pricepernight} readOnly={!isEditable} onChange={handleInputChange} />
              <Input type="text" placeholder="Type" value={cagedata.type} name='type' readOnly={!isEditable} onChange={handleInputChange}/>
              <Input type="Number" placeholder="Max Count" value={cagedata.maxcount} name='maxcount' readOnly={!isEditable} onChange={handleInputChange} />
              <Input type="text" placeholder="Phone" value={cagedata.phone} name='phone' readOnly={!isEditable} onChange={handleInputChange}/>
              <div className='display flex'>
                    {cagedata.Image.map((image, index) => (
                     <div className="image-wrapper" key={index}>
                  <img src={image}  style={{ height: 100, width: 100 }} alt={`cage-img-${index}`} />
                  {isEditable && <MdOutlineDelete onClick={() => handleImageDelete(image)} />}
                      </div>
                            ))}
                         </div>
                         {isEditable && cagedata.Image.length < 3 && (
                                    <div className="image-upload">
                                        <input type="file" accept="image/*" multiple onChange={handleFileChange} />
                                    </div>
                                )}
               </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary"  onPress ={handleEditToggle}>
                {isEditable ? "Submit" : "Edit"}

                </Button>
              </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default CageDataModal
