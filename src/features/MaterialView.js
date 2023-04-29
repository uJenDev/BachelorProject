import React, { useEffect, useState } from 'react'
import { MdOutlineFirstPage, MdDeleteForever } from 'react-icons/md';
import PropertyList from '../components/PropertyList';
import NewMaterialForm from '../forms/NewMaterialForm';
// import SettingsList from '../components/SettingsList';
import { capitalize, slugFromTitle } from '../utility/HelperFunctions';


const MaterialView = ({ 
    material
}) => {

    useEffect(() => {
        setSelectedComp(null)
    }, [material]);

    const [hoveredComp, setHoveredComp] = useState(null);
    const [selectedComp, setSelectedComp] = useState(null);

    const [editingTitle, setEditingTitle] = useState(false);
    const [prepareDelete, setPrepareDelete] = useState(false);

  return (
    <div className='flex flex-col px-2'>
        <div className='flex flex-col'>
            <p className='mb-1 bg-green-200 px-2 font-bold text-sm text-green-500 rounded-md max-w-fit'>{capitalize(material.categoryTitle)}</p>
            {editingTitle ? (
                <div className='flex flex-row items-center'>
                    {!prepareDelete ? (
                        <>
                            <NewMaterialForm
                                oldMaterial={material}
                                categoryId={slugFromTitle(material.categoryTitle)}
                                setToggleCreateForm={setEditingTitle}
                            />
                            <button
                                onClick={() => {setPrepareDelete(true);}}
                                className='bg-red-200 px-2 py-1 font-bold text-xl text-red-500 rounded-lg max-w-fit'
                            >
                                <MdDeleteForever />
                            </button>
                        </>
                        )
                    :
                        (
                        <>
                            <button
                                onClick={() => {setPrepareDelete(false);}}
                                className='bg-red-200 px-2 py-1 font-bold text-xl text-red-500 rounded-lg max-w-fit'
                            >
                                <MdOutlineFirstPage />
                            </button>
                        </>
                        )}
                </div>
            ) : (
                <button 
                    onClick={() => {setEditingTitle(true);}}
                    className='bg-blue-200 px-2 py-1 font-bold text-4xl text-blue-500 rounded-xl max-w-fit'
                >
                    <p className=''>{material.title}</p>
                </button>
            )}
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
  )
}

export default MaterialView
