import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { Input } from '@/components/ui/input';
import { viewDetails } from '@/api/kennel';
import { MdOutlineDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { editCages } from '@/api/kennel';
import ReactLoading from 'react-loading';

// Helper function to convert URL to File object
const urlToFile = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const fileName = url.split('/').pop();
  return new File([blob], fileName, { type: blob.type });
};

const CageDataModal = ({ cageid }) => {
  const kennelOwnerData = useSelector((state) => state.kennel.kennelOwnerData);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cagedata, setCageData] = useState({
    kennelname: '',
    location: '',
    description: '',
    pricepernight: '',
    type: '',
    maxcount: '',
    phone: '',
    Image: []
  });

  const handleEditToggle = async () => {
    if (isEditable) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('id', cagedata._id);
        formData.append('kennelname', cagedata.kennelname);
        formData.append('location', cagedata.location);
        formData.append('description', cagedata.description);
        formData.append('phone', cagedata.phone);
        formData.append('type', cagedata.type);
        formData.append('maxCount', Number(cagedata.maxcount));
        formData.append('PricePerNight', Number(cagedata.pricepernight));
        formData.append('ownerId', kennelOwnerData._id);

        // Append all images to formData
        for (const img of cagedata.Image) {
          if (img instanceof File) {
            formData.append('editimages', img);
          } else {
            const file = await urlToFile(img);
            formData.append('editimages', file);
          }
        }

        const response = await editCages(formData);
        if (response) {
          toast.success('Cage data updated successfully');
          onOpenChange(); // Close the modal on successful update
          fetchData()
        }
      } catch (error) {
        console.error('Failed to update cage data:', error);
        toast.error('Failed to update cage data');
      } finally {
        setLoading(false); // Always reset loading state
      }
    } else {
      setIsEditable(true);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await viewDetails(cageid);
      setCageData(response.data.message);
    } catch (error) {
      console.error('Failed to fetch cage details:', error);
      toast.error('Failed to fetch cage details');
    } finally {
      setLoading(false); // Always reset loading state
    }
  };

  useEffect(() => {
    fetchData();
  }, [cageid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCageData((prev) => ({
      ...prev,
      [name]: name === 'pricepernight' || name === 'maxcount' ? Number(value) : value
    }));
  };

  const handleImageDelete = (image) => {
    setCageData((prev) => ({
      ...prev,
      Image: prev.Image.filter((img) => img !== image)
    }));
  };

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
      {loading ? (
        <div className="flex justify-center items-center">
          <ReactLoading type="spin" color="#000" height={50} width={50} />
        </div>
      ) : (
        <>
          <Button onPress={onOpen}>More Details</Button>
          <Modal
            backdrop="opaque"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            classNames={{
              backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20'
            }}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <form>
                    <ModalHeader className="flex flex-col gap-1">Cage Details</ModalHeader>
                    <ModalBody>
                      <Input type="text" placeholder="Kennel Name" name="kennelname" value={cagedata.kennelname} readOnly={!isEditable} onChange={handleInputChange} />
                      <Input type="text" placeholder="Location" name="location" value={cagedata.location} readOnly={!isEditable} onChange={handleInputChange} />
                      <Input type="text" placeholder="Description" name="description" value={cagedata.description} readOnly={!isEditable} onChange={handleInputChange} />
                      <Input type="number" placeholder="priceperNight" name="pricepernight" value={cagedata.pricepernight} readOnly={!isEditable} onChange={handleInputChange} />
                      <Input type="text" placeholder="Type" value={cagedata.type} name="type" readOnly={!isEditable} onChange={handleInputChange} />
                      <Input type="number" placeholder="Max Count" value={cagedata.maxcount} name="maxcount" readOnly={!isEditable} onChange={handleInputChange} />
                      <Input type="text" placeholder="Phone" value={cagedata.phone} name="phone" readOnly={!isEditable} onChange={handleInputChange} />
                      <div className="display flex">
                        {cagedata.Image.map((image, index) => (
                          <div className="image-wrapper" key={index}>
                            <img src={image instanceof File ? URL.createObjectURL(image) : image} style={{ height: 100, width: 100 }} alt={`cage-img-${index}`} />
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
                      <Button auto flat onPress={onClose}>
                        Close
                      </Button>
                      <Button auto onPress={handleEditToggle}>
                        {isEditable ? 'Submit' : 'Edit'}
                      </Button>
                    </ModalFooter>
                  </form>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default CageDataModal;
