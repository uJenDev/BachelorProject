import React, { useEffect, useState } from 'react';

import { db } from '../firebase';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';

const SideTabMaterialButton = ({
    category,
    selectedMaterial,
    setSelectedMaterial,
}) => {

    const [loading, setLoading] = useState(false)
    const [materials, setMaterials] = useState([]);
    const categoryRef = doc(db, 'category', category); 

    useEffect(() => {
        setLoading(true)

        const getMaterials = onSnapshot(
            query( 
                collection(db, 'material'), 
                where('categoryRef', '==', categoryRef)
            ), 
            (snapshot) => {
                setMaterials(snapshot.docs.map(doc => ({
                    id: doc.id,
                    category: category,
                    ...doc.data()
                })))
            setLoading(false)
        },
        (error) => {
            console.log(error)
            setLoading(false)
        })

        return () => {
            console.log('Detaching listener')
            getMaterials()
        }
    }, [])

    const [localSelectedMaterial, setLocalSelectedMaterial] = useState(null);

    useEffect(() => {
        if (!localSelectedMaterial) return;
        setSelectedMaterial(materials.find(material => material.id === localSelectedMaterial?.id));
    }, [localSelectedMaterial, materials]);

    useEffect(() => {
        // if selectedMaterial not in materials, set localSelectedMaterial to null
        if (!materials.find(material => material.id === selectedMaterial?.id)) {
            setLocalSelectedMaterial(null);
        }
    }, [selectedMaterial]);

  return (
    <div className='flex flex-col space-y-2 px-3'>
      {materials.map((material) => (
            <button
                key={material.id}
                onClick={() => {setLocalSelectedMaterial(material);}}
                className={`text-lg bg-blue-200 text-blue-500 max-w-fit px-2 mx-2 rounded-lg 
                    cursor-pointer hover:scale-105 hover:shadow-md ease-out duration-300 mt-2
                    ${selectedMaterial?.id === material.id && 'bg-blue-500 text-white scale-105 shadow-md translate-x-3'}`}
            >
                {material.title}
            </button>
        ))}
    </div>
  )
}

export default SideTabMaterialButton
