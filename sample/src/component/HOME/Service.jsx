import React from 'react'
import ServiceCard from '../CARDS/ServiceCard'
const Service = () => {
  return (
    <div className='flex justify-around'>
      <div className='boarding'> 
      <ServiceCard 
      title = "Dog Boarding"
      imageUrl="pics/boarding.jpg" 

      />
      </div>
      <div className='service flex justify-center items-center'>
        <h1 className='text-4xl  text-center'>Services We<br></br><span className='text-gradient1'>Offer ?</span></h1>
      </div>
      <div className='adoption'>
      <ServiceCard 
       title="Dog Adoption" 
       imageUrl="pics/adoption.jpg"/>
      </div>
    </div>
  )
}

export default Service
