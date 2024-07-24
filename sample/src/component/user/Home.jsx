import React from 'react'
import {Button} from "@nextui-org/react";
import { motion } from 'framer-motion';
const Home = () => {
  return (
    <div>
       <div className='main mt-5 flex'>
      <div className='w-1/2 flex flex-col justify-center items-center '>
      <motion.h1 
           initial={{x:-100,opacity:0}}
           animate={{x:0,opacity:1}}
           transition={{delay:0.2, x:{type:"spring",stiffness:60},opacity:{duration:1},ease:"easeIn",duration:1}}
      className='text-4xl font mb-4 text-center '>
          Welcome to<br />
          <span className='text-gradient '>Pet Zone</span>
        </motion.h1>
        <motion.p 
        initial={{x:-100,opacity:0}}
        animate={{x:0,opacity:1}}
        transition={{delay:0.2, x:{type:"spring",stiffness:60},opacity:{duration:0.6},ease:"easeIn",duration:1}}
        className='text-gray-600 text-center'>"Your Trusted Partner For Pet Boarding And Adoption"</motion.p>
        <Button radius="full" className="bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7] text-white shadow-lg mt-3">
      Get Started
    </Button>
      </div>
      <div className='w-1/2 mr-3 '>
        <motion.img 
        initial={{x:100,opacity:0}}
        animate={{x:0,opacity:1}}
        transition={{delay:0.2, x:{type:"spring",stiffness:60},opacity:{duration:1},ease:"easeIn",duration:1}}
        src='pics/fffff-min.jpg ' className='rounded-3xl '/>
      </div>
  
    </div>  
    
    </div>
  )
}

export default Home