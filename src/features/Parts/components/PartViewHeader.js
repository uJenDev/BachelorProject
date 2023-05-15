import React from 'react'
import { StlViewer } from "react-stl-viewer";

const PartViewHeader = ({
    part,
    files
}) => {
    if (!part) return null
  return (
    <div className='flex flex-col w-full ml-2'>
      <h1 className='text-2xl font-semibold text-blue-500 bg-blue-200 w-fit rounded-lg px-2 py-1 h-fit mt-2 mb-1'>{part.name}</h1>

    </div>
  )
}

export default PartViewHeader
