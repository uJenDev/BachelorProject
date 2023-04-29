import { deleteDoc, doc, runTransaction, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../firebase';
import { capitalize, slugFromTitle } from '../utility/HelperFunctions';

const NewMaterialForm = ({
    setToggleCreateForm,
    oldMaterial,
    categoryId,
}) => {

    const [material, setMaterial] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (oldMaterial) {
            setMaterial(oldMaterial.title);
            setIsUpdating(true);
        }
    }, [oldMaterial]);

    const handleSubmit = async () => {
        if (!material) return;

        console.log('Submitting material: ', categoryId)

        const categoryRef = doc(db, 'category', categoryId);

        const documentId = slugFromTitle(material);
        

        
        if (isUpdating) {
            // run a transaction to create a new material and delete the old one
            await runTransaction(db, async (transaction) => {
                const oldMaterialRef = doc(db, 'material', oldMaterial.id);
                const materialRef = doc(db, 'material', documentId);
                    
                await transaction.delete(oldMaterialRef);
                await transaction.set(materialRef, {
                    title: capitalize(material),
                    categoryRef: categoryRef,
                    properties: oldMaterial.properties,
                    composition: oldMaterial.composition,
                });
            }).then(() => {
                console.log('Transaction successfully committed!');
            }).catch((error) => {
                console.log('Transaction failed: ', error);
            });
            
        } else {
            await setDoc(doc(db, 'material', documentId), {
                title: capitalize(material),
                categoryRef: categoryRef,
                properties: [],
                composition: [],
            });
        }
        setToggleCreateForm(false);
    }

    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, [])

  return (
    <div className='flex flex-row bg-blue-200 rounded-lg px-2 mx-2 py-1'>
        <input
            className='bg-transparent rounded-sm focus:outline-none ease-out duration-150 h-5 w-fit text-blue-500 font-bold text-lg placeholder-blue-500'
            type='text'
            placeholder='Name..'
            value={material}
            ref={inputRef}
            onChange={(e) => {setMaterial(e.target.value)}}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSubmit()
                }
            }}
            onBlur={() => {setToggleCreateForm(false)}}
        />
    </div>
  )
}

export default NewMaterialForm
