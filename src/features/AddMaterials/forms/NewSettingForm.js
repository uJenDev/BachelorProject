import React, { useEffect, useRef, useState } from 'react'

import { db } from '../../../firebase';
import { addDoc, arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import { MdKeyboardBackspace, MdOutlineDeleteForever } from 'react-icons/md';
import { slugFromTitle } from '../../../utility/HelperFunctions';

const NewSettingForm = ({
    setToggleCreateForm,
    oldSetting,
    material,
    tool
}) => {

    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (!oldSetting) return;
        setIsUpdating(true);
        setName(oldSetting.name);
        setValue(oldSetting.value);
        setUnit(oldSetting.unit);
    }, [oldSetting])

    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [unit, setUnit] = useState('');

    const validate = () => {
        if (!name || !value) return false;
        if ( isNaN(value) ) return false;
        return true;
    }

    const handleSubmit = () => {

        if (!validate()) return;

        if (isUpdating) {
            const updateSetting = async () => {
                const settingRef = doc(db, 'setting', oldSetting.id);
                await updateDoc(settingRef, {
                    name: name,
                    slug: slugFromTitle(name),
                    value: Number(value),
                    unit: unit,
                })
            }
            updateSetting();
        } else {
            const createSetting = async () => {
                const materialRef = doc(db, 'material', material.id);
                const toolRef = doc(db, 'tool', tool.id);

                await addDoc(collection(db, 'setting'), {
                    name: name,
                    slug: slugFromTitle(name),
                    value: Number(value),
                    unit: unit,
                    materialRef: materialRef,
                    toolRef: toolRef,
                })
            }
            createSetting();
        }

        setToggleCreateForm(false);
    }

    const handleDelete = () => {
        
    }

    const nameRef = useRef();
    const valueRef = useRef();
    const unitRef = useRef();

    useEffect(() => {
        nameRef.current.focus();
    }, [])

  return (
    <div className='flex flex-row items-center space-x-2 pb-2 '>
        <div className='flex flex-row'>
            <button
                className='bg-transparent rounded-lg focus:outline-none ease-out duration-150 h-7 text-red-500 text-md placeholder-red-500 hover:scale-110'
                onClick={() => {setToggleCreateForm(false)}}
            >
                <MdKeyboardBackspace className='text-red-500 text-xl' />
            </button>
        </div>
        <div className='bg-blue-200 rounded-lg px-2 max-w-fit'>
            <div className='flex flex-row items-center space-x-2'>
                <div className='flex flex-row '>
                    <input
                        className='bg-transparent rounded-lg focus:outline-none ease-out duration-150 w-40 h-7 text-blue-500 font-bold text-lg placeholder-blue-500 placeholder-opacity-70'
                        type='text'
                        placeholder='Name'
                        ref={nameRef}
                        value={name}
                        onChange={(e) => {setName(e.target.value)}}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit()
                            }
                        }}
                    />
                </div>
                <p className='font-bold text-blue-300'>|</p>
                <div className='flex flex-row'>
                    <input
                        className='bg-transparent rounded-lg focus:outline-none ease-out duration-150 h-7 w-40 text-blue-500 text-lg placeholder-blue-500 placeholder-opacity-70'
                        type='number'
                        ref={valueRef}
                        placeholder='Value'
                        value={value}
                        onChange={(e) => {setValue(e.target.value)}}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit()
                            }
                        }}
                    />
                </div>
                <p className='font-bold text-blue-300'>|</p>
                <div className='flex flex-row'>
                    <input
                        className='bg-transparent rounded-lg focus:outline-none ease-out duration-150 h-7 w-20 max-w-fit text-blue-500 font-bold text-sm placeholder-blue-500 placeholder-opacity-70'
                        type='text'
                        ref={unitRef}
                        placeholder='Unit'
                        value={unit}
                        onChange={(e) => {setUnit(e.target.value)}}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit()
                            }
                        }}
                    />
                </div>
            </div>
        </div>
        {isUpdating &&
        (
        <div className='flex flex-row text-red-500 hover:text-white'>
            <button
                className='bg-red-200 rounded-lg focus:outline-none ease-out duration-150 h-7 text-md placeholder-red-500 hover:scale-110 hover:bg-red-500 focus:scale-110'
                onClick={() => {handleDelete()}}
            >
                <MdOutlineDeleteForever className=' text-xl' />
            </button>
        </div>
        )}
    </div>
  )
}

export default NewSettingForm