import React from "react";
import { useState } from "react";
import { forgotPassword } from "@/api/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,

} from "@nextui-org/react";
import errorHandle from "@/api/error";
const Fmodal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [email,setEmail] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async(e)=>{
     e.preventDefault()
     try {
        const response = await forgotPassword(email)
        if(response){
            toast.success(response.data.message)
            navigate('/resetpassword')
        }
     } catch (error) {
        errorHandle(error)
     }
  }


  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        className="bg-white font-medium text-indigo-600 hover:text-indigo-500"
      >
        Forgot Password?
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit}>
                <ModalHeader className="flex flex-col gap-1">
                  Forgot Password
                </ModalHeader>
                <ModalBody>
                  <input
                    type="email"
                    placeholder="enter email"
                    className="rounded-md"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit">Submit</Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Fmodal;
