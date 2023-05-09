import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const OptionSelect = ({ 
    setOption,
    option,
    optionLabel
}) => {

    const [allOptions, setAllOptions] = useState([])

    useEffect(() => {
        const getOptions = onSnapshot(
            collection(db, option),
            (snapshot) => {
                setAllOptions(snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })))
            },
            (error) => {
                console.log(error)
            }
        )
        return () => {
            getOptions()
        }
    }, [])

    const [optionNames, setOptionName] = useState([])
    useEffect(() => {
        if (!allOptions[0]) return;
        setOptionName(allOptions.map(option => ({label: option.name})))
    }, [allOptions])


  return (
    optionNames[0] && (
        <Autocomplete
            disablePortal
            options={optionNames}
            onChange={(event, newValue) => {
                setOption(newValue?.label)
            }}
            className='w-full pt-10'
            renderInput={(params) => <TextField {...params} label={optionLabel} />}
        />
    )
  )
}

export default OptionSelect
