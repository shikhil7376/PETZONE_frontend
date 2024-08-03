import React from 'react';
import { useParams } from 'react-router-dom';
import { viewDetails } from '@/api/kennel';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button} from "@nextui-org/react";
import { useSelector } from 'react-redux';
import { booking } from '@/api/kennel';
import moment from 'moment';

const Booking = () => {
  const { cageid, fromdate, todate } = useParams();
  const [details, setDetails] = useState({});
  const navigate = useNavigate();
  const userData = useSelector((state)=>state.user.userdata)
   
  const calculateTotalDays = () => {
    if (!fromdate || !todate || !moment(fromdate, 'DD-MM-YYYY').isValid() || !moment(todate, 'DD-MM-YYYY').isValid()) {
      console.error('Invalid or missing from/to dates. Setting total days to 0.');
      return 0;
    }

    const fromDateMoment = moment(fromdate, 'DD-MM-YYYY');
    const toDateMoment = moment(todate, 'DD-MM-YYYY');
    const daysDiff = toDateMoment.diff(fromDateMoment, 'days', true); 
    return Math.max(daysDiff + 1, 0); 
  };

  const [totalDays, setTotalDays] = useState(calculateTotalDays());
  const totalAmount = totalDays*details.pricepernight
  useEffect(() => {
    fetchViewDetails();
  }, []);

  const fetchViewDetails = async () => {
    try {
      const response = await viewDetails(cageid);
      setDetails(response.data.message);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  async function bookCage() {
      const bookingDetails ={
        details,
        userid:userData._id,
        fromdate,
        todate,
        totalAmount,
        totalDays
      }
      try {
         const response = await booking(bookingDetails)
      } catch (error) {
        
      }
  }

  return (
    <div>
      <div className='main display flex ml-5 border-1 mr-5 rounded-3xl justify-between'>
        <div className='w-[50%]'>
          <div className='ml-10'>
            <h2 className='font-semibold text-md'>{details.kennelname},{details.location}</h2>
          </div>
          <div className='image3 w-[300px] h-[200px] bg-green-300 mt-2 rounded-3xl overflow-hidden ml-5 mb-4'>
            {details.Image && details.Image[0] && (
              <img src={details.Image[0]} alt="Kennel Image 1" className='w-full h-full object-cover ' />
            )}
          </div>
        </div>
        <div className='booking-details mr-10'>
          <h1 className='text-xl font-semibold'>BOOKING DETAILS</h1>
          <h2 className='font'>From Date:{fromdate}</h2>
          <h2 className='font'>To Date:{todate}</h2>
          <h2 className='font'>Max Count:{details.maxcount}</h2>
          <h2 className='font'>Total Days: {totalDays}</h2>
          <h2 className='font'>Price per night:{details.pricepernight}</h2>
          <h2 className='font'>Total Amount:{totalAmount}</h2>
          <div className='mt-4 ml-4'>
            <Button
              radius="full"
              className="bg-gradient-to-tr from-[#B249F8] to-[#5e1bac] p-2 text-white shadow-lg" onClick={bookCage}
            >
              PAY NOW
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
