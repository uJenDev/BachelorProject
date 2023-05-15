import React, { useEffect, useState } from 'react';
import {
    Autocomplete,
    InputAdornment,
    TextField,
} from '@mui/material';
import { db } from '../../../firebase';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import NewMaterialPropertiesList from '../views/NewMaterialPropertiesList';


const fetchPropertyStandards = async () => {
    const defaultProperties = await getDoc(doc(db, 'standards', 'materials'))
    return defaultProperties.data().properties.default
}

const NewMaterialForm = ({ 
    handleClose, 
    user, 
    category
}) => {

    const [title, setTitle] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [pricePerKg, setPricePerKg] = useState('');
    const [propertyList, setPropertyList] = useState([]);


    const [defualtPropertyListLength, setDefualtPropertyListLength] = useState(0)
    useEffect(() => {
        fetchPropertyStandards().then((data) => {
            setPropertyList(data)
            setDefualtPropertyListLength(data.length)
        })
    }, [])

  const titleToSlug = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-');
  };

  const handleAdd = async () => {
    if (!canPost) return;
    
    const docId = titleToSlug(title);
    const categoryRef = doc(db, 'category', selectedCategory.id);
    const materialData = {
        title: title,
        createdAt: serverTimestamp(),
        createdBy: {
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
        },
        composition: [],
        properties: propertyList,
        pricePerKg: pricePerKg,
        categoryRef: categoryRef,
    };

    await setDoc(doc(db, 'material', docId), materialData);
    handleClose();
  };

    const [canPost, setCanPost] = useState(false);
    useEffect(() => {
        if (title && selectedCategory && pricePerKg) {
            setCanPost(true)
        } else {
            setCanPost(false)
        }
    }, [title, selectedCategory, pricePerKg])


  return (
    <div>
        <button className='absolute top-0 left-2 text-2xl' onClick={handleClose}>&times;</button>
        <Autocomplete
            options={category}
            size='small'
            getOptionLabel={(option) => option.title}
            sx={{ width: 200 }}
            onChange={(e, value) => setSelectedCategory(value)}
            renderInput={(params) => <TextField {...params} label="What category?" variant='standard' />}
        />
        <input
            type='text'
            placeholder='Name of Material'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full rounded-lg outline-none border-none focus:border-blue-500 placeholder:font-bold font-bold text-2xl placeholder:text-2xl'
        />
        <div className='flex flex-col mt-5'>
            <div className='flex items-center space-x-5'>
                <TextField
                    type="number"
                    variant="standard"
                    onFocus={(e) => e.target.select()}
                    InputProps={{
                        inputProps: { min: 0 },
                        endAdornment: <InputAdornment position="end">kr</InputAdornment>,
                    }}
                    label="Price per Kg"
                    className='max-w-fit'
                    value={pricePerKg}
                    onChange={(e) => setPricePerKg(e.target.value)}
                />
            </div>
            <NewMaterialPropertiesList
                propertyList={propertyList}
                setPropertyList={setPropertyList}
                defualtPropertyListLength={defualtPropertyListLength}
            />
        </div>
        <div className='flex justify-end'>
            <button
                onClick={handleAdd}
                disabled={!canPost}
                className={`
                    text-lg text-blue-500 bg-blue-200 px-2 rounded-lg
                    duration-300 ease-out
                    ${!canPost ? 'opacity-50' : 'hover:text-white hover:bg-blue-500 hover:scale-105'}
                `}
            >
                Add
            </button>
        </div>
    </div>
  );
};

export default NewMaterialForm;
