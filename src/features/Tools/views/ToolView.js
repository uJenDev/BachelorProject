import React from 'react'
import { MdInfo } from 'react-icons/md';
import { useParams } from 'react-router-dom'

const ToolView = () => {
  
  const toolId = useParams().tool

  if (!toolId) return (
    <div className='flex w-full justify-center items-center'>
      <div className='flex flex-col text-blue-500 bg-blue-200 rounded-lg opacity-70 animate-pulse py-2 px-4'>
        <div className='flex items-center space-x-2 mb-2'>
          <MdInfo className='text-xl' />
          <p className='text-2xl '>
            No tool selected
          </p>
        </div>
        <p className='text-lg'>
          Please select a tool from the list on the left
        </p>
      </div>
    </div>
);
  return (
    <div>
      {toolId}
    </div>
  )
}

export default ToolView
