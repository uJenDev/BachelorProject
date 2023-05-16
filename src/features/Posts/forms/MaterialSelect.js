import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const MaterialSelect = ({ material, setMaterial }) => {

    const [allMaterials, setAllMaterials] = useState([])
    const [materialTitles, setMaterialTitles] = useState([])

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

    useEffect(() => {
        if (allMaterials.length === 0) return;
        setMaterialTitles(allMaterials.map(material => ({label: material.title, material: material})))
    }, [allMaterials])


  return (
    <Autocomplete
        options={materialTitles}
        value={materialTitles.find(thisMaterial => thisMaterial.material.id === material?.id) || null}
        onChange={(e, newValue) => {
            setMaterial(newValue?.material)
        }}
        className='w-full'
        renderInput={(params) => <TextField {...params} label="Material" />}
    />
  )
}

export default MaterialSelect
