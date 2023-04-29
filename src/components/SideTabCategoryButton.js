import React, { useEffect, useState } from 'react'
import SideTabMaterialButton from './SideTabMaterialButton';

const SideTabCategoryButton = ({
    category,
    selectedMaterial,
    setSelectedMaterial,
    selectedCategory,
    setSelectedCategory,
    isLast
}) => {

    useEffect(() => {
        setSelectedMaterial(null);
    }, [selectedCategory]);

  return (
    <div key={category.id} className={`bg-gray-700 py-2 my-1 ${isLast ? 'rounded-b-xl' : ''} ease-out duration-150 ${selectedCategory?.id === category.id ? 'rounded-xl text-2xl' : 'text-xl hover:scale-95'}`}>
        <button 
            className='flex flex-col space-y-2 w-full'
            onClick={() => {setSelectedCategory(category);}}
        >
            <h1 className={`flex items-center px-3 font-bold mx-3 text-white`}>{category.title}</h1>
        </button>
        {(selectedCategory?.id === category.id) && (
            <SideTabMaterialButton
                category={category}
                selectedMaterial={selectedMaterial}
                setSelectedMaterial={setSelectedMaterial}
            />
        )}
    </div>
  )
}

export default SideTabCategoryButton
