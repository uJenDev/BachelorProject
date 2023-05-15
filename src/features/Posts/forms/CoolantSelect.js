import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const CoolantSelect = ({ coolant, setCoolant }) => {

    const [allCoolants, setAllCoolants] = useState([])
    const [coolantNames, setCoolantNames] = useState([])

    useEffect(() => {
        const getCoolants = onSnapshot(
            collection(db, 'coolant'),
            (snapshot) => {
                setAllCoolants(snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })))
            },
            (error) => {
                console.log(error)
            }
        )
        return () => {
            getCoolants()
        }
    }, [])

    useEffect(() => {
        if (allCoolants.length === 0) return;
        setCoolantNames(allCoolants.map(coolant => ({label: coolant.name, coolant: coolant})))
    }, [allCoolants])


  return (
    <Autocomplete
        options={coolantNames}
        value={coolantNames.find(thisCoolant => thisCoolant.coolant.id === coolant?.id) || null}
        onChange={(e, newValue) => {
            setCoolant(newValue?.coolant)
        }}
        className='w-full'
        renderInput={(params) => <TextField {...params} label="Coolant Type" />}
    />
  )
}

export default CoolantSelect
