import React from 'react'
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

const ServiceCard = ({title,imageUrl}) => {
  return (
    <div className='mt-5'>
         <Card className="py-4 border rounded-xl ">
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl h-56"
          src={imageUrl}
          width={275}
         
        />
      </CardBody>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <p className="text-tiny uppercase ">{title}</p> 
      </CardHeader>
    </Card>
    </div>
  )
}

export default ServiceCard
