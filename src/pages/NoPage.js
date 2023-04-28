import React from 'react'
import { isMobile } from 'react-device-detect'

const NoPage = () => {
  return (
    <div className='flex justify-center items-center mt-80'>
        <p className={`bg-red-200 text-red-500 font-bold ${isMobile ? 'py-2 px-5 text-2xl rounded-lg' : 'py-10 px-20 text-5xl rounded-2xl'}`}>404 not found</p>
    </div>
  )
}

export default NoPage
