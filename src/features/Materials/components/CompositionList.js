import React, { useEffect, useState } from 'react'

const CompositionList = ({ material }) => {

    useEffect(() => {
        setSelectedComp(null)
    }, [material]);

    const [hoveredComp, setHoveredComp] = useState(null);
    const [selectedComp, setSelectedComp] = useState(null);
    
  return (
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
  )
}

export default CompositionList
