import React from 'react'
import Navbar from '../NAVBAR/Navbar'
import Hero from './Hero'
import Service from './Service'
const Main = () => {
  return (
    <div className=''>
      <div  className='bg-white w-11/12 mx-auto mt-10 rounded-lg '>
        <Navbar/>
        <Hero/>
        <Service/>
      </div>
    </div>
  )
}

export default Main
