import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../firebase';
import { capitalize, slugFromTitle } from '../utility/HelperFunctions';

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
    <div className='flex flex-row bg-gray-700 rounded-lg px-6'>
        <input
            className='bg-transparent rounded-lg focus:outline-none ease-out duration-150 h-9 w-40 text-white font-bold text-xl placeholder-white'
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
  )
}

export default NewCategoryForm
