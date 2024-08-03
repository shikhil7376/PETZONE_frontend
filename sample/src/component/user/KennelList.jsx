import React from 'react'
import { Image } from "@nextui-org/react";
import { useEffect,useState } from 'react';
import { booking, getCage } from '@/api/kennel';
import {  Button } from "@nextui-org/react";
import {DateRangePicker} from "@nextui-org/date-picker";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const KennelList = () => {

  const navigate = useNavigate()
 const [cages,setCages] = useState([])
 const [fromdate,setfromdate] = useState()
 const [todate,settodate] = useState()
 const [duplicatecages,setduplicatecages] = useState([])

 const fetchCage = async()=>{
    try {
       const response = await getCage()
        setCages(response.data.data)
        setduplicatecages(response.data.data)
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to fetch users');
    }
 }



 useEffect(()=>{
    fetchCage()
 },[])

 const filterByDate = (dates) => {
  if (dates && dates.start && dates.end) {
    const startDate = moment({
      year: dates.start.year,
      month: dates.start.month - 1, 
      day: dates.start.day,
    }).format('DD-MM-YYYY');

    setfromdate(startDate);
    
    const endDate = moment({
      year: dates.end.year,
      month: dates.end.month - 1,
      day: dates.end.day,
    }).format('DD-MM-YYYY');

    settodate(endDate);

    let tempcages = [];
    for (const cage of duplicatecages) {
      let availability = true;
      if (cage.currentBookings.length > 0) {
        for (const booking of cage.currentBookings) {
          const bookingStart = moment(booking.fromdate, 'DD-MM-YYYY');
          const bookingEnd = moment(booking.todate, 'DD-MM-YYYY');
          const selectedStart = moment(startDate, 'DD-MM-YYYY');
          const selectedEnd = moment(endDate, 'DD-MM-YYYY');

          if (
            selectedStart.isBetween(bookingStart, bookingEnd, undefined, '[)') || 
            selectedEnd.isBetween(bookingStart, bookingEnd, undefined, '[)') || 
            bookingStart.isBetween(selectedStart, selectedEnd, undefined, '[)') || 
            bookingEnd.isBetween(selectedStart, selectedEnd, undefined, '[)')
          ) {
            availability = false;
            break;
          }
        }
      }
      if (availability) {
        tempcages.push(cage);
      }
    }
    setCages(tempcages);
  }
};

  
  return (
    <div className=' flex flex-col items-center  min-h-screen'>
       <div className='filter w-[70%] h-[50px] rounded-2xl '>
             <DateRangePicker onChange={filterByDate}
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
        <h2 className=' text '>{cage.kennelname}</h2>
        <p className='text-gray-500  text-sm'>{cage.location}</p>

        </div>
        <div className='display flex justify-between items-center'>
                <p className='text-gray-500 mr-5'>${cage.pricepernight}</p>

        <Button
              radius="full"
              className="bg-gradient-to-tr from-[#B249F8] to-[#5e1bac] p-2 text-white shadow-lg"
              onClick={()=>navigate(`/view-details/${cage._id}/${fromdate}/${todate}`)}
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
