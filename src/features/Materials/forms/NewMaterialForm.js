import { deleteDoc, doc, runTransaction, setDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { MdWarning } from 'react-icons/md';
import { db } from '../../../firebase';
import { capitalize, slugFromTitle } from '../../../utility/HelperFunctions';

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
    <div className='flex flex-col'>
        <div className='flex flex-row bg-blue-200 rounded-lg px-2 mx-2 py-1'>
            <input
                className={`bg-transparent rounded-sm focus:outline-none w-fit text-blue-500 font-bold placeholder-blue-500 ${isUpdating ? 'text-4xl h-10' : 'text-lg h-5 ease-out duration-150 '} placeholder-opacity-50`}
                type='text'
                placeholder='Material name'
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
        <div className='mt-1 flex flex-row items-center justify-center text-sm text-red-500 space-x-1'>
            <MdWarning />
            <p className=''>This cannot be changed</p>
        </div>
    </div>
  )
}

export default NewMaterialForm
