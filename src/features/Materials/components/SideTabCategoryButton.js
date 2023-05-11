import React, { useEffect } from 'react'
import SideTabMaterialButton from './SideTabMaterialButton';
import { useNavigate } from 'react-router-dom';

const SideTabCategoryButton = ({
    category,
    selectedMaterial,
    setSelectedMaterial,
    selectedCategory,
    isLast
}) => {

    useEffect(() => {
        setSelectedMaterial(null);
    }, [selectedCategory, setSelectedMaterial]);

    const navigate = useNavigate();

  return (
    <div key={category.id} className={`bg-gray-200 py-2 ${isLast ? 'rounded-br-xl' : ''} ease-out duration-150 ${selectedCategory?.id === category.id ? ' my-2 text-2xl' : 'text-xl hover:scale-95'}`}>
        <button 
            className='flex flex-col space-y-2 w-full'
            onClick={() => {navigate(`/materials/${category.id}`)}}
        >
            <h1 className={`flex items-center px-3 font-regular mx-3 text-black`}>{category.title}</h1>
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
