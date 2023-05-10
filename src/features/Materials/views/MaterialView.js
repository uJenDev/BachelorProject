import React, { useState } from 'react'
import PropertyList from '../components/PropertyList';
import MaterialHeader from '../components/MaterialHeader';


const MaterialView = ({ 
    material
}) => {

  return (
    <div className='flex flex-col w-full'>
        <div className='flex flex-col px-2 bg-gray-700 py-2 rounded-xl max-w-fit'>
            <MaterialHeader 
                material={material}
            />

            <div className='flex flex-row'>
                {material.properties && (
                    <PropertyList 
                        material={material} 
                    />
                )}
            </div>
        </div>
        
    </div>
  )
}

export default MaterialView


{/* <div className='flex flex-row space-x-2 w-full'>
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
        </div> */}