import React, { useState } from 'react'
import SideTabMaterialButton from './SideTabMaterialButton';

const SideTabCategoryButton = ({
    category,
    selectedMaterial,
    setSelectedMaterial
}) => {

    const [toggleCategory, setToggleCategory] = useState(false);

  return (
    <div key={category.id}>
        <button 
            className='flex flex-col space-y-2 mt-2 border-t-2 border-white w-full'
            onClick={() => {setToggleCategory(!toggleCategory);}}
        >
            <h1 className={`flex items-center px-3 font-bold text-2xl pt-2 mx-3`}>{category.title}</h1>
        </button>
        {toggleCategory && (
            <SideTabMaterialButton
                category={category.id}
                selectedMaterial={selectedMaterial}
                setSelectedMaterial={setSelectedMaterial}
            />
        )}
    </div>
  )
}

export default SideTabCategoryButton
