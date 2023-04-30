import React, { useEffect, useState } from 'react'
import { MdLink, MdLinkOff } from 'react-icons/md';
import PropertyList from '../components/PropertyList';
import { capitalize } from '../utility/HelperFunctions';
import MaterialSettingsView from './MaterialSettingsView';
import MaterialToolsView from './MaterialToolsView';


const MaterialView = ({ 
    material
}) => {

    useEffect(() => {
        setSelectedComp(null)
    }, [material]);

    const [hoveredComp, setHoveredComp] = useState(null);
    const [selectedComp, setSelectedComp] = useState(null);
    const [selectedTool, setSelectedTool] = useState(null);

  return (
    <div className='flex flex-col w-full'>
        <div className='flex flex-col px-2 bg-gray-700 py-2 rounded-xl max-w-fit'>
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

            <div className='flex flex-row'>
                {material.properties && (
                    <PropertyList 
                        material={material} 
                    />
                )}
                {/* <SettingsList 
                    settings={material.cnc_settings}
                /> */}
            </div>
        </div>

        <div className='flex flex-row space-x-2 w-full'>
            <MaterialSettingsView
                material={material}
                selectedTool={selectedTool}
            />
            <div className="flex pt-2">
                <div className="icon-wrapper w-9">
                    <MdLink
                        className={`text-4xl items-center text-green-500 icon ${
                            selectedTool ? "" : "icon-hidden"
                        }`}
                    />
                    <MdLinkOff
                        className={`text-4xl items-center text-red-500 icon ${
                            selectedTool ? "icon-hidden" : ""
                        }`}
                    />
                </div>
            </div>
            <MaterialToolsView
                material={material}
                selectedTool={selectedTool}
                setSelectedTool={setSelectedTool}
            />
        </div>
    </div>
  )
}

export default MaterialView
