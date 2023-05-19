import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SideTabMaterialButton = ({ materials, category }) => {
  

  const materialId = useParams().material;
  const navigate = useNavigate();

  return (
    <div className='flex flex-col space-y-2 px-1'>
      {materials.map((material) => (
        <button
          key={material.id}
          onClick={() => {
            navigate(`/materials/${category.id}/${material.id}`);
          }}
          className={`text-lg bg-blue-200 text-blue-500 max-w-fit px-2 mx-2 rounded-lg font-bold
              cursor-pointer hover:scale-105 hover:shadow-md ease-out duration-300 mt-2
              ${material.id === materialId && 'bg-blue-500 text-white scale-105 shadow-md translate-x-3'}
            `}
        >
          {material.title}
        </button>
      ))}
    </div>
  );
};

export default SideTabMaterialButton;
