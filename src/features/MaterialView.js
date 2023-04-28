import React, { useEffect, useState } from 'react'
import PropertyList from '../components/PropertyList';
import SettingsList from '../components/SettingsList';


const MaterialView = ({ material }) => {

    useEffect(() => {
        setSelectedData(null)
        setSelectedComp(null)
    }, [material]);

    const [hoveredComp, setHoveredComp] = useState(null);
    const [selectedComp, setSelectedComp] = useState(null);

    const [selectedData, setSelectedData] = useState(null);

  return (
    <div className='flex flex-col px-2'>
        <div className='flex flex-col'>
            <p className='mb-1 bg-green-200 px-2 font-bold text-sm text-green-500 rounded-md max-w-fit'>{material.category}</p>
            <p className='bg-blue-200 px-2 py-1 font-bold text-4xl text-blue-500 rounded-xl max-w-fit'>{material.name}</p>
            <div className='flex flex-row space-x-2 items-center pt-1'>
                {material.data.composition?.map((comp, index) => (
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
                        <p className={`text-sm transition duration-200 ${comp.tag === selectedComp ? 'text-white' : 'text-purple-500'}`}>{comp.value}{comp.unit}</p>
                    </div>
                ))}
            </div>
            <div>
                <p className='text-sm text-gray-400 max-w-2xl'>{material.data.info?.description}</p>
            </div>
        </div>

        <div className='flex flex-row'>
            <PropertyList 
                properties={material.data.properties} 
                selectedData={selectedData}
                setSelectedData={setSelectedData}
            />
            <SettingsList 
                settings={material.data.cnc_settings}
                selectedData={selectedData}
                setSelectedData={setSelectedData}
            />
        </div>

        {selectedData && 
        (
            <div className='flex flex-col pt-5 max-w-3xl pb-20'>
                <div className='border-t-2 border-gray-400 pb-2'/>
                <div className='space-y-1'>
                    <p className='text-sm text-green-500 bg-green-200 w-fit px-1 rounded-md font-bold'>{selectedData.name}</p>
                    <div className='flex flex-row space-x-1 bg-blue-200 w-fit px-2 py-1 rounded-lg items-center'>
                        <p className='text-2xl text-blue-500 font-bold'>{selectedData.value}</p>
                        {selectedData.unit && (
                            <>
                                <p className='font-bold text-blue-300 text-lg'>|</p>
                                <p className='text-lg text-blue-500'>{selectedData.unit}</p>
                            </>
                        )}
                    </div>
                </div>
                <p className='text-lg text-gray-400'></p>
            </div>
        )}
    </div>
  )
}

export default MaterialView
