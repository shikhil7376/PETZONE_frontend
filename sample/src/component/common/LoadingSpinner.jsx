import React from 'react'
import Lottie from 'lottie-react'
import lazyLoading from '../../assets/lazyloading.json'
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
    <div className="w-60 h-60">
      <Lottie animationData={lazyLoading} loop={true} />
    </div>
  </div>
  )
}

export default LoadingSpinner
