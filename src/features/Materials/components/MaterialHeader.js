import { capitalize } from '@mui/material';
import React, { useEffect, useState } from 'react'

const MaterialHeader = ({
    material,
}) => {
    useEffect(() => {
        setSelectedComp(null)
    }, [material]);

    const [hoveredComp, setHoveredComp] = useState(null);
    const [selectedComp, setSelectedComp] = useState(null);
    
  return (
    <div className='flex flex-col'>
        <p className='mb-1 bg-teal-200 px-2 font-bold text-sm text-teal-600 rounded-md max-w-fit'>{capitalize(material.categoryTitle)}</p>

        <p className='bg-blue-200 px-2 py-1 font-bold text-4xl text-blue-500 rounded-xl max-w-fit'>{material.title}</p>
    
        <div className='flex flex-row space-x-2 items-center pt-1'>
            {material.composition?.map((comp, index) => (
                <div 
                    key={index} 
                    className={`flex flex-row space-x-1 items-center px-1 rounded-md cursor-pointer transition duration-200 ${selectedComp === comp.tag ? 'bg-purple-500 scale-105' : 'bg-purple-200'}`}
                    onMouseEnter={() => {
                        setHoveredComp(comp.tag); 
                        setSelectedComp(null);

                    }}
                    onMouseLeave={() => {setHoveredComp(null);}}
                    onClick={() => {setSelectedComp(comp.tag);}}
                >
                    <p className={`text-sm transition duration-300 ${comp.tag === selectedComp? 'text-white font-bold' : 'text-purple-500 font-bold'} tag-text ${comp.tag === (selectedComp || hoveredComp) ? 'tag-text-active' : ''}`}>
                        {comp.name}
                    </p>
                    <p className={`text-sm transition duration-300 ${comp.tag === selectedComp ? 'text-white font-bold' : 'text-purple-500 font-bold'} tag-text ${comp.tag !== (selectedComp || hoveredComp) ? 'tag-text-active' : ''}`}>
                        {comp.tag}
                    </p>

                    <p className='font-bold text-purple-300 text-sm'>|</p>
                    <p className={`text-sm transition duration-200 ${comp.tag === selectedComp ? 'text-white' : 'text-purple-500'}`}>{comp.value}%</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default MaterialHeader
