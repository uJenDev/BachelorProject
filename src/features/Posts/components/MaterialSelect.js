import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const MaterialSelect = ({ setMaterial }) => {

    const [allMaterials, setAllMaterials] = useState([])

    useEffect(() => {
        const getMaterials = onSnapshot(
            collection(db, 'material'),
            (snapshot) => {
                setAllMaterials(snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })))
            },
            (error) => {
                console.log(error)
            }
        )
        return () => {
            getMaterials()
        }
    }, [])

    const [materialTitles, setMaterialTitles] = useState([])
    useEffect(() => {
        if (!allMaterials[0]) return;
        setMaterialTitles(allMaterials.map(material => ({label: material.title})))
    }, [allMaterials])


  return (
    materialTitles.length > 0 && (
        <Autocomplete
            disablePortal
            options={materialTitles}
            onChange={(event, newValue) => {
                setMaterial(newValue?.label)
            }}
            className='w-full pt-10'
            renderInput={(params) => <TextField {...params} label="Material" />}
        />
    )
  )
}

export default MaterialSelect
