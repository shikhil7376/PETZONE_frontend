import React, { useEffect, useState } from 'react';
import { Button, Image } from '@nextui-org/react';
import AddModal from '@/component/kennel/AddModal';
import CageDataModal from '@/component/kennel/CageDataModal';
import { ownersCages } from '@/api/kennel';
import { useSelector } from 'react-redux';

const Addkennel = () => {
  const kennelOwnerData = useSelector((state) => state.kennel.kennelOwnerData);
  const [cages, setCages] = useState([]);

  const fetchCages = async () => {
    try {
      const response = await ownersCages(kennelOwnerData._id);
      setCages(response.data.data);
    } catch (error) {
      console.error('Failed to fetch cages:', error);
      toast.error('Failed to fetch cages');
    }
  };

  useEffect(() => {
    fetchCages();
  }, []);

  return (
    <div className='p-5'>
      <div className='pb-3'>
        <AddModal />
      </div>
      <div className='grid grid-cols-4 gap-4'>
        {cages.map((cage, index) => (
          <div key={index} className='card h-[270px] w-[200px] bg-white flex flex-col justify-between items-center rounded-2xl border-1 drop-shadow-xl'>
            <div className='w-[160px] h-[160px] overflow-hidden mt-2'>
              <Image
                width={160}
                height={160}
                src={cage.image[0] || "pics/fffff-min.jpg"}
                alt="Cage"
                objectFit='cover'
                className='mt-2'  // Margin for image top gap
              />
            </div>
            <p className='font-semibold mt-2'>{cage.kennelname || 'ADOPTION'}</p>
            <p>{cage.location}</p>
            <div className="mt-auto mb-4 p-2">
              <CageDataModal cageid = {cage._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Addkennel;
