import React from 'react'

const PropertyList = ({
    properties,
    selectedData,
    setSelectedData
}) => {

  return (
    <div className='pt-5'>
        <p className='text-2xl border-b-2 border-gray-400 text-gray-400'>Properties</p>
        <div className='space-y-2 pt-1'>
            {properties.map((property, index) => (
                <button 
                    key={property.name}
                    onClick={() => setSelectedData(property)}
                    className={`flex flex-row space-x-2 bg-orange-200 max-w-fit px-2 py-1 rounded-lg items-center ease-out duration-150  ${selectedData?.name === property.name ? 'translate-x-2 bg-orange-500' : 'hover:bg-orange-100'}`}
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
            ))}
        </div>
      </div>
  )
}

export default PropertyList
