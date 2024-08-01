import React from 'react'
import { Image } from "@nextui-org/react";
import { useEffect,useState } from 'react';
import { getCage } from '@/api/kennel';
import {  Button } from "@nextui-org/react";
import {DateRangePicker} from "@nextui-org/date-picker";

const KennelList = () => {

 const [cages,setCages] = useState([])
 const fetchCage = async()=>{
    try {
       const response = await getCage()
        setCages(response.data.data)
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to fetch users');
    }
 }

 useEffect(()=>{
    fetchCage()
 },[])

 console.log(cages);
  
  return (
    <div className=' flex flex-col items-center  min-h-screen'>
       <div className='filter w-[70%] h-[50px] rounded-2xl '>
             <DateRangePicker 
      label="Stay duration" 
      className="w-[300px] drop-shadow-lg" 
    />
       </div>
       
      <div className=' flex justify-around  gap-4 mt-5  '>
        { cages.map((cage,index)=>(
        <div  key={index}>
        <Image
          isZoomed
          alt="NextUI Fruit Image with Zoom"
          src={cage.image[2]}
          style={{ height: '250px', width: '200px' }}
        />
        <div className='display  justify-between'>
        <h2 className=' text font-mono'>{cage.kennelname}</h2>
        <p className='text-gray-500 font-mono text-sm'>{cage.location}</p>

        </div>
        <div className='display flex justify-between items-center'>
                <p className='text-gray-500 mr-5'>${cage.pricepernight}</p>

        <Button
              radius="full"
              className="bg-gradient-to-tr from-[#B249F8] to-[#5e1bac] p-2 text-white shadow-lg"
            >
              View Details
            </Button>
        </div>
        </div>
        ))}
       
       
      </div>
    </div>
  )
}

export default KennelList;
