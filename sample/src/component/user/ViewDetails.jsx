import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { viewDetails } from '@/api/kennel';
import { toast } from 'react-toastify';
import {  Button } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';

const ViewDetails = () => {
    const { cageid, fromdate, todate } = useParams();
    const [details, setDetails] = useState({});
    const navigate = useNavigate()
    
    const fetchViewDetails = async () => {
        try {
            const response = await viewDetails(cageid);
            console.log(response.data.message);
            setDetails(response.data.message);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            toast.error('Failed to fetch users');
        }
    };

    const handleButtonClick = () => {
        if (!fromdate || !todate || fromdate === 'undefined' || todate === 'undefined') {
            navigate('/get-kennels'); 
        } else {
           navigate(`/booking/${cageid}/${fromdate}/${todate}`)
        }
    };

    useEffect(() => {
        fetchViewDetails();
    }, [cageid]);

    return (
        <div className='h-screen flex flex-col'>
            <div className='flex flex-1'>
                <div className='image1 w-[400px] h-[410px] bg-slate-400 ml-4 rounded-3xl overflow-hidden'>
                    {details.Image && details.Image[0] && (
                        <img src={details.Image[0]} alt="Kennel Image 1" className='w-full h-full object-cover' />
                    )}
                </div>
                <div className='multipleimage ml-2 flex flex-col justify-between'>
                    <div className='image2 w-[300px] h-[200px] bg-green-300 rounded-3xl overflow-hidden'>
                        {details.Image && details.Image[1] && (
                            <img src={details.Image[1]} alt="Kennel Image 2" className='w-full h-full object-cover' />
                        )}
                    </div>
                    <div className='image3 w-[300px] h-[200px] bg-green-300 mt-2 rounded-3xl overflow-hidden'>
                        {details.Image && details.Image[2] && (
                            <img src={details.Image[2]} alt="Kennel Image 3" className='w-full h-full object-cover' />
                        )}
                    </div>
                </div>
            </div>
           <div className='mt-2 ml-5'>
            <p className=''>maxcount:{details.maxcount}</p>
            <p className=''>Type:{details.type}</p>
            <p className=''>phone:{details.phone}</p>
           </div>
           <div className='display flex '>
            <div className='description mt-5 ml-5 w-[50%] flex-1'>
                <h2 className='text-2xl font-semibold'>Description</h2>
                <p className='text-gray-500'>{details.description}</p>
            </div>
            <div className='booking w-[50%] h-[200px]  display flex justify-center items-center'>
                <div className='w-[50%] h-[170px]  rounded-3xl border-1 drop-shadow-md p-4 '>
                <h2 className='text-2xl font-semibold text-center '>Price:${details.pricepernight}/per night</h2>
                <div className='display flex flex-col justify-center items-center'>
                <p>Check in: {fromdate && fromdate !== 'undefined' ? fromdate : ''}</p>
                <p>Check out: {todate && todate !== 'undefined' ? todate : ''}</p>
                </div>
                <div className='display flex justify-center items-center mt-5'>
                <Button
              radius="full"
              className="bg-gradient-to-tr from-[#B249F8] to-[#5e1bac] p-2 text-white shadow-lg "
              onClick={handleButtonClick}
            >
                          {(!fromdate || !todate || fromdate === 'undefined' || todate === 'undefined') ? 'Choose Dates' : 'BOOK NOW'}


            </Button>
            </div>
                </div>
            </div>
            </div>
        </div>
        
    );
};

export default ViewDetails;
