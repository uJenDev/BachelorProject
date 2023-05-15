import React, { useEffect, useState } from 'react'
import SideTabMaterialButton from './SideTabMaterialButton';
import { useNavigate } from 'react-router-dom';

import { db } from '../../../firebase';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';

const SideTabCategoryButton = ({
    category,
    selectedMaterial,
    setSelectedMaterial,
    selectedCategory,
}) => {

    const [loading, setLoading] = useState(false);
    const [materials, setMaterials] = useState([]);
    const categoryRef = doc(db, 'category', category.id);

    useEffect(() => {
        setLoading(true);

        const getMaterials = onSnapshot(
        query(collection(db, 'material'), where('categoryRef', '==', categoryRef)),
        (snapshot) => {
            setMaterials(snapshot.docs.map((doc) => ({
            id: doc.id,
            categoryTitle: category.title,
            ...doc.data(),
            })));
            setLoading(false);
        },
        (error) => {
            console.log(error);
            setLoading(false);
        },
        );

        return () => {
        console.log('Detaching listener');
        getMaterials();
        };
    }, []);

    useEffect(() => {
        setSelectedMaterial(null);
    }, [selectedCategory, setSelectedMaterial]);

    const navigate = useNavigate();

  return (
    <div key={category.id} className={`bg-gray-200 py-2 ease-out duration-150 ${selectedCategory?.id === category.id ? ' my-2 text-2xl' : 'text-xl hover:scale-95'}`}>
        <button 
            className='flex flex-col space-y-2 w-full'
            onClick={() => {navigate(`/materials/${category.id}`)}}
        >
            <h1 className={`flex items-center px-3 font-regular mx-3 text-black`}>{category.title}</h1>
        </button>
        {(selectedCategory?.id === category.id) 
        ? 
        (
            materials.length > 0 ?
            (
                <SideTabMaterialButton
                    category={category}
                    selectedMaterial={selectedMaterial}
                    setSelectedMaterial={setSelectedMaterial}
                    materials={materials}
                />
            )
            :
            (
                <div className='ml-5'>
                    <p className='flex px-2 text-sm bg-blue-200 text-blue-500 max-w-fit rounded-md font-bold'>No materials found</p>
                </div>
            )
        )
        :
        (
            <div className='ml-5'>
                <p className='flex px-2 text-sm bg-blue-200 text-blue-500 max-w-fit rounded-md font-bold'>{materials.length}</p>
            </div>
        )
        }
    </div>
  )
}

export default SideTabCategoryButton
