import React, { useEffect, useState } from 'react';
import { Button, Image } from '@nextui-org/react';
import AddModal from '@/component/kennel/AddModal';
import CageDataModal from '@/component/kennel/CageDataModal';
import { ownersCages } from '@/api/kennel';
import { useSelector } from 'react-redux';

const Addkennel = () => {
  const kennelOwnerData = useSelector((state) => state.kennel.kennelOwnerData);
  const [cages, setCages] = useState([]);
  const [loading,setLoading] = useState(false)
  const [searchTerm,setSearchTerm] = useState('')
  const [page,setPage] = useState(1)
  const limit = 4
  const [total,setTotal] = useState(0)

  const fetchCages = async () => {
    try {
      const response = await ownersCages(kennelOwnerData._id,page,limit,searchTerm);
      setCages(response.data.data);
      setTotal(response.data.total)
    } catch (error) {
      console.error('Failed to fetch cages:', error);
      toast.error('Failed to fetch cages');
    }
  };

  useEffect(() => {
    fetchCages();
  }, [page, searchTerm]);

const handleSearch = (e)=>{
  setSearchTerm(e.target.value)
  setPage(1)
}

const handlePreviousPage = () => {
  if (page > 1) {
    setPage(page - 1);
  }
};

const handleNextPage = () => {
  if (page * limit < total) {
    setPage(page + 1);
  }
};

  return (
    <div className='p-5'>
      <div className='display flex gap-2'>
      <div className='pb-3'>
        <AddModal />
      </div>
      <div>
      <input
          placeholder="Search" 
          onChange={handleSearch}
          value={searchTerm}
          className="w-[250px] h-10 border-1 rounded-full p-3 focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </div>
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
      <div className='flex justify-center pt-10'>
      <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className={`w-10 h-10 flex items-center justify-center rounded-full border p-2 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          &#9664;
        </button>
        <button
          onClick={handleNextPage}
          disabled={page * limit >= total}
          className={`w-10 h-10 flex items-center justify-center rounded-full border p-2 ${page * limit >= total ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          &#9654;
        </button>
      </div>
    </div>
  );
};

export default Addkennel;
