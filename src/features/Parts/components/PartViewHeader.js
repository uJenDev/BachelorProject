import React from 'react'

const PartViewHeader = ({
    part
}) => {
    if (!part) return null
  return (
    <div className='flex w-full bg-gray-200 ml-4'>
      <h1 className='text-2xl font-semibold text-blue-500 bg-blue-200 rounded-lg px-2 py-1 h-fit ml-2 mt-2'>{part.name}</h1>
    </div>
  )
}

export default PartViewHeader
