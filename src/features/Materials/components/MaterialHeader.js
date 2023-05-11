import { capitalize } from '@mui/material';
import React from 'react'
import { MdInfo } from 'react-icons/md';
import CompositionList from './CompositionList';

const MaterialHeader = ({
    material,
}) => {
    
  return (
    <div className='flex flex-col'>
        <p className='mb-1 bg-teal-200 px-2 font-bold text-sm text-teal-600 rounded-md max-w-fit'>{capitalize(material.categoryTitle)}</p>

        <p className='bg-blue-200 px-2 py-1 font-bold text-4xl text-blue-500 rounded-xl max-w-fit'>{material.title}</p>
        <button 
            onClick={() => {console.log('clicked')}}
            className='
                flex items-center space-x-1 text-purple-500 bg-purple-200 max-w-fit pr-2 pl-1 rounded-md mt-1
                duration-300 ease-out hover:text-white hover:bg-purple-500 hover:scale-105
            '
        >
            <MdInfo className='text-sm' />
            <p className='font-semibold text-sm'>Details</p>
        </button>
    </div>
  )
}

export default MaterialHeader
