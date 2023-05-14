import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { MdWarning } from 'react-icons/md';
import { db } from '../../../firebase';
import { capitalize, slugFromTitle } from '../../../utility/HelperFunctions';

const NewCategoryForm = ({
    setToggleCreateForm,
}) => {

    const [category, setCategory] = useState('');

    const handleSubmit = async () => {
        if (!category) return;

        const documentId = slugFromTitle(category);

        await setDoc(doc(db, 'category', documentId), {
            title: capitalize(category),
        });
        setToggleCreateForm(false);
    }

    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, [])

  return (
    <div>
        <div className='flex flex-row bg-transparent rounded-lg px-6'>
            <input
                className='bg-transparent rounded-lg focus:outline-none ease-out duration-150 h-9 w-40 text-black font-regular text-xl placeholder-black placeholder-opacity-50'
                type='text'
                placeholder='New category'
                value={category}
                ref={inputRef}
                onChange={(e) => {setCategory(e.target.value)}}
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

export default NewCategoryForm
