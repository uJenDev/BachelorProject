import React, { useState } from 'react'
import NewPropertyForm from '../forms/NewPropertyForm';

import { MdAddCircle } from 'react-icons/md';

const PropertyList = ({
    material,
}) => {

    const selectedData = null;

    const [toggleCreateForm, setToggleCreateForm] = useState(false);
    const [updatingProperty, setUpdatingProperty] = useState(null);

  return (
    <div className='pt-5 w-full'>
        <p className='text-2xl border-b-2 border-white text-white'>Properties</p>
        <div className=' pt-1'>
            {material.properties.map((property, index) => {

            if (!property.name || !property.value) return null;
            return (
                updatingProperty?.name === property.name ? (
                    <NewPropertyForm
                        key={property.name}
                        material={material}
                        property={property}
                        oldProperty={property}
                        setToggleCreateForm={setUpdatingProperty}
                    />
                ) : (
                    <button 
                        key={property.name}
                        onClick={() => {setUpdatingProperty(property);}}
                        className={`flex flex-row space-x-2 mb-2 bg-orange-200 max-w-fit px-2 py-1 rounded-lg items-center ease-out duration-150  ${selectedData?.name === property.name ? 'translate-x-2 bg-orange-500' : 'hover:bg-orange-100'}`}
                    >
                        <p className={`text-xl font-bold ease-out duration-150 ${selectedData?.name === property.name ? 'text-white' : 'text-orange-500'}`}>{property.name}</p>
                        <p className='font-bold text-orange-300'>|</p>
                        <p className={`text-lg ease-in duration-100 ${selectedData?.name === property.name ? 'text-white' : 'text-orange-500'}`}>{property.value}</p>
                        {property?.unit && (
                            <>
                                <p className='font-bold text-orange-300'>|</p>
                                <p className={`text-sm font-bold ${selectedData?.name === property.name ? 'text-white' : 'text-orange-500'}`}>{property.unit}</p>
                            </>
                        )}
                    </button>
                ))
            })}
            {!toggleCreateForm && (
                <button 
                    onClick={() => {setToggleCreateForm(true)}}
                    className={`flex flex-row space-x-2 bg-blue-200 max-w-fit px-2 py-1 rounded-lg items-center text-blue-500 ease-out duration-150 hover:scale-105 hover:text-white hover:bg-blue-500`}
                >
                    <p className={`text-xl font-bold ease-out duration-150`}>Add new</p>
                    <p className='font-bold text-blue-300'>|</p>
                    <MdAddCircle className='text-xl' />
                </button>
            )}
        </div>
        {toggleCreateForm && (
            <NewPropertyForm 
                setToggleCreateForm={setToggleCreateForm}
                material={material}
            />
        )}
    </div>
  )
}

export default PropertyList
