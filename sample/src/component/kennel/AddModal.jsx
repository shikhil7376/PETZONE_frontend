import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { addCages } from "@/api/kennel";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";

export default function AddModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [kennelname, setKenneName] = useState("");
  const [location, setLocation] = useState("");
  const [description,setDescription] = useState('')
  const [maxCount,setMaxCount] = useState('')
  const [phone,setPhone] = useState('')
  const [PricePerNight,setPricePerNight] = useState('')
  const [images, setImages] = useState([]);
  const [type,setType] = useState()

  const kennelOwnerData = useSelector((state) => state.kennel.kennelOwnerData);


const handleFileChange =(e)=>{
   if(e.target.files){
    const filesArray = Array.from(e.target.files).slice(0,3)
    setImages(filesArray)
   }
}



const handleSubmit = async(e) => {
  e.preventDefault();
const formData = new FormData()
formData.append('kennelname', kennelname);
  formData.append("location", location);
  formData.append("description", description);
  formData.append("phone", phone);
  formData.append("type", type);
  formData.append("maxCount", maxCount);
  formData.append("PricePerNight", PricePerNight);
  formData.append('ownerId',kennelOwnerData._id)
  images.forEach(file=>formData.append('cageimages',file))
  
  

  try {
    const response = await addCages(formData);
    console.log(response.data);
  } catch (error) {
    console.error("Error adding cages:", error);
  }

  // const data = Object.fromEntries(formData)
  //     console.log(data);
  //     console.log(data.cageimages);
  //      const response = await addCages(data)   
       
    
      
  };
    
 
   
  return (
    <>
      <Button onPress={onOpen} className="font-semibold">Add Kennel</Button>
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
              <ModalHeader className="flex flex-col gap-1">Add Kennel</ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2">
                    <Input
                      type="text"
                      placeholder="Kennel Name"
                      value={kennelname}
                      onChange={(e) => setKenneName(e.target.value)}
                      required
                    />
                    <Input
                      type="text"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                       <Input
                      type="text"
                      placeholder="Description"
                      value={description}
                      onChange={(e)=>setDescription(e.target.value)}
                      required
                    />
                         <Input
                      type="text"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e)=>setPhone(e.target.value)}
                      required
                    />
                   <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      required
                      className="p-2 border rounded"
                    >
                      <option value="" disabled>Select Type</option>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                    <Input
                      type="number"
                      placeholder="MaxCount"
                      value={maxCount}
                      onChange={(e)=>setMaxCount(e.target.value)}
                      required
                    />
                   <Input
                      type="number"
                      placeholder="PricePerNight"
                      value={PricePerNight}
                      onChange={(e)=>setPricePerNight(e.target.value)}
                      required
                    />
                    <label htmlFor="images">Select   
                  Images (up to 3):</label>
                <input type="file" multiple onChange={handleFileChange} accept="image/*"/>
                <div clas sName="grid grid-cols-3 gap-4">
                {images.map((file,index)=>(
            <div key={index} className="w-32 h-32 border-4 border-blue-500 rounded-lg overflow-hidden">
     <img src={URL.createObjectURL(file)} alt={`profile-pic-${index}`} className="w-full h-full object-cover" />

              </div>
                ))}
                </div>
                  </div>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" type="submit">
                      Submit
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
