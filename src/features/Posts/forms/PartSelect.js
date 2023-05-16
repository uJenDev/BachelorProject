import { collection, doc, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../../../firebase'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { red } from '@mui/material/colors';
import { useLocation, useNavigate } from 'react-router-dom';

const PartSelect = ({ 
    setPart,
    part,
    project,
}) => {
    

    const [partNames, setPartNames] = useState([])
    const projectRef = doc(db, 'projects', project ? project.id : 'none')
    const inputRef = useRef(null)

    const navigate = useNavigate();
    const location = useLocation();
    const queryParmas = new URLSearchParams(location.search);

    useEffect(() => {
        setPart(null)
        const getParts = onSnapshot(
            query(
                collection(db, 'part'),
                where('projectRef', '==', projectRef)
            ),
            (snapshot) => {
                setPartNames(snapshot.docs.map(doc => ({
                    label: doc.data().name,
                    part: {
                        id: doc.id,
                        ...doc.data()
                    }
                })))
            },
            (error) => {
                console.log(error)
            }
        )
        return () => {
            getParts()
        }
    }, [project])

    useEffect(() => {
        setPart(null)
    }, [project])


  return (
    <div className='flex flex-col w-full'>
        <Autocomplete
            ref={inputRef}
            value={partNames.find(thisPart => thisPart.part.id === part?.id) || null}
            disabled={partNames.length === 0}
            noOptionsText={'No parts found'}
            options={partNames}
            onChange={(e, newValue) => {
                setPart(newValue?.part)
            }}
            className='w-full'
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={'Part'}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: partNames.length === 0 ? red[500] : undefined,
                        },
                        '&:hover fieldset': {
                            borderColor: partNames.length === 0 ? red[700] : undefined,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: partNames.length === 0 ? red[500] : undefined,
                        },
                        '&.Mui-disabled fieldset': {
                            borderColor: partNames.length === 0 ? red[500] : undefined,
                        },
                        },
                        '& .MuiInputLabel-root': {
                        color: partNames.length === 0 ? red[500] : undefined,
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                        color: partNames.length === 0 ? red[500] : undefined,
                        },
                    }}
                />
            )}
        />
        {partNames.length === 0 && (
            <div className='flex flex-col items-start'>
                <p className='text-sm text-red-500'>Selected project has no parts</p>
                <button
                    className='text-sm text-red-500 hover:text-red-700 underline'
                    onClick={() => {
                        navigate(`/parts?newPart=true`)
                    }}
                >
                    Create a new part
                </button>
            </div>
        )}
    </div>
  )
}

export default PartSelect
